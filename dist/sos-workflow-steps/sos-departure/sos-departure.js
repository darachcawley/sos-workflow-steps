/**
 * Created by darachcawley on 12/12/2016.
 * This is the first step of the workflow.
 */
'use strict';

var ngModule = angular.module('sos.sos-departure', ['wfm.core.mediator', require('sos-workorder'), require('fh-wfm-user')]);

require('./template');
var gpsLocator = require('../../util/gpslocation');

ngModule.directive('sosDeparture', function($templateCache) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-departure-view.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosDepartureForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-departure-form.tpl.html')
        , scope: {
            action: "@action"
        }
        , link: function(scope, element, attributes){
            var self = this;
            console.log('sos Link function ', attributes.action);
        }
        , controller: function($q, $scope, $state, $timeout, $mdDialog, $mdToast, workorderSync) {
            console.log('sos controller function');
            var self = this;
            $scope.action = 'DEPARTED';
            $scope.isLocationAvailable = true;

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
            });

            $scope.options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            self.workorder = $scope.$parent.workorder;

            // Set on Step Starting
            self.model = {
                completedAction: $scope.action,
                acceptedTime: new Date(),
                departedTime: '',
                departedToSiteLocation: '',
                eta: 115
            };

            self.processStep = function(cb){
                self.model.departedTime = new Date();

                console.log(JSON.stringify($scope.options));
                // alert(JSON.stringify($scope.options));
                // if geo location is supported
                gpsLocator.processGPSLocation($scope.options).then(function(foundLocation){
                    if(foundLocation && foundLocation !== null) {
                        self.model.departedToSiteLocation = foundLocation.location;
                    }
                    cb();
                }).catch(function(foundLocation){
                    cb();
                })
            };

            // Set on Step Completing
            self.completeStep = function(ev){
                self.workorder.status = 'In Progress';
                self.workorder.completedAction = $scope.action;
                self.workorder.acceptedTime = self.model.acceptedTime;
                self.workorder.departedTime = self.model.departedTime;
                self.workorder.eta = self.model.eta;
                self.workorder.departedToSiteLocation = self.model.departedToSiteLocation;

                // Publish model, update workorder
                self.workorderManager.update(self.workorder).then(function() {
                    mediator.publish('wfm:workflow:step:done', self.model);
                });
                ev.preventDefault();
                ev.stopPropagation();
            };

            self.onAction = function(ev) {
                $scope.isLocationAvailable = false;
                console.log('onAction', $scope.action);

                self.processStep(function(){
                    self.completeStep(ev);
                });

                // Action can be triggered only once
                $scope.isActionButtonDisabled = true;
                $scope.isContinueButtonDisabled = false;
            };
        }
        , controllerAs: 'ctrl'
    };
});


module.exports = 'sos.sos-departure';
