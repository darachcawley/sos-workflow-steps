/**
 * Created by darachcawley on 12/12/2016.
 */
'use strict';

var ngModule = angular.module('sos.sos-agreement', ['wfm.core.mediator', require('sos-workorder'), require('fh-wfm-user')]);

require('./template');
var gpsLocator = require('../../util/gpslocation');

ngModule.directive('sosAgreement', function($templateCache) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-agreement-view.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosAgreementForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-agreement-form.tpl.html')
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
            $scope.action = 'ENROUTEWORKSHOP';
            $scope.isLocationAvailable = true;

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
            });

            $scope.options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            $scope.workshops = [{
                id: 1,
                name: 'Autobody Works'
            }, {
                id: 2,
                name: 'We Fix Anything'
            }];
            $scope.chosenWorkshop = $scope.workshops[0];

            self.workorder = $scope.$parent.workorder;

            self.model = {
                completedAction: $scope.action,
                departedToWorkshopTime: '',
                isCustomerOnsite: false,
                customerSignature: '',
                departedToWorkshopLocation: '',
                chosenWorkshop: $scope.chosenWorkshop.name
            };

            self.processStep = function(cb){
                self.model.departedToWorkshopTime = new Date();

                console.log(JSON.stringify($scope.options));
                // if geo location is supported
                gpsLocator.processGPSLocation($scope.options).then(function(foundLocation){
                    if(foundLocation && foundLocation !== null) {
                        self.model.departedToWorkshopLocation = foundLocation.location;
                    }
                    cb();
                }).catch(function(foundLocation){
                    cb();
                })
            };

            self.completeStep = function(ev){
                self.workorder.completedAction = $scope.action;
                self.workorder.departedToWorkshopTime = self.model.departedToWorkshopTime;
                self.workorder.isCustomerOnsite = self.model.isCustomerOnsite;
                self.workorder.departedToWorkshopLocation = self.model.departedToWorkshopLocation;
                self.workorder.chosenWorkshop = self.model.chosenWorkshop;

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
        }
        , controllerAs: 'ctrl'
    };
})
;


module.exports = 'sos.sos-agreement';
