/**
 * Created by darachcawley on 12/12/2016.
 * This is the first step of the workflow.
 */
'use strict';

var ngModule = angular.module('sos.sos-enroute-workshop', ['wfm.core.mediator', require('sos-workorder'), require('fh-wfm-user')]);

require('./template');
var gpsLocator = require('../../util/gpslocation');

ngModule.directive('sosEnrouteWorkshop', function($templateCache) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-enroute-workshop-view.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosEnrouteWorkshopForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-enroute-workshop-form.tpl.html')
        , scope: {
            action: "@action"
        }
        , link: function(scope, element, attributes){
            var self = this;
            console.log('sos Link function ', attributes.action);
        }
        , controller: function($q, $scope, $state, $timeout, $mdDialog, $mdToast, workorderSync, userClient, $filter) {
            console.log('sos controller function');
            var self = this;
            $scope.action = 'ARRIVEDATWORKSHOP';
            $scope.isLocationAvailable = true;

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
            });

            $scope.options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            // Map details
            self.workorder = $scope.$parent.workorder;
            self.workorders = [];
            self.workorder.location = [52.310131339684446, -7.119140622500026];
            self.workorders.push(self.workorder);
            self.center = [self.workorder.location[0], self.workorder.location[1]];

            self.model = {
                completedAction: $scope.action,
                arrivedAtWorkshopTime: '',
                arrivedAtWorkshopLocation: ''
            };

            self.processStep = function(cb){
                self.model.arrivedAtWorkshopTime = new Date();

                console.log(JSON.stringify($scope.options));
                // alert(JSON.stringify($scope.options));
                // if geo location is supported
                gpsLocator.processGPSLocation($scope.options).then(function(foundLocation){
                    if(foundLocation && foundLocation !== null) {
                        self.model.arrivedAtWorkshopLocation = foundLocation.location;
                    }
                    cb();
                }).catch(function(foundLocation){
                    cb();
                })
            };

            self.completeStep = function(ev){
                self.workorder.completedAction = $scope.action;
                self.workorder.arrivedAtWorkshopTime = self.model.arrivedAtWorkshopTime;
                self.workorder.arrivedAtWorkshopLocation = self.model.arrivedAtWorkshopLocation;

                // Publish model, update workorder
                self.workorderManager.update(self.workorder).then(function() {
                    mediator.publish('wfm:workflow:step:done', self.model);
                    $scope.isLocationAvailable = true;
                });
                ev.preventDefault();
                ev.stopPropagation();
            };

            self.goBack = function(ev){
                // Publish model, update workorder
                self.workorderManager.update(self.workorder).then(function() {
                    mediator.publish('wfm:workflow:step:back', self.model);
                });
                ev.preventDefault();
                ev.stopPropagation();
            };

            self.onAction = function(ev) {
                console.log('onAction', $scope.action);
                $scope.isLocationAvailable = false;

                self.processStep(function(){
                    self.completeStep(ev);
                });

                // Action can be triggered only once
                $scope.isActionButtonDisabled = true;
                $scope.isContinueButtonDisabled = false;
            };

            self.showGoogleNav = function(ev){
                var deferred = $q.defer();

                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('Navigation to Site')
                    .textContent('Placeholder to launch Google Navigation in app')
                    .ariaLabel('GoogleNav')
                    .targetEvent(ev)
                    .ok('Done')
                    .cancel('Cancel');

                $mdDialog.show(confirm)
                    .then(function() {
                        deferred.resolve('YES');
                    }, function() {
                        deferred.reject('NO');
                    });

                return deferred.promise;
            };
        }
        , controllerAs: 'ctrl'
    };
})
;


module.exports = 'sos.sos-enroute-workshop';
