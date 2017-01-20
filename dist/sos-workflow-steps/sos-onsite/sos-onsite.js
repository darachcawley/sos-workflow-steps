/**
 * Created by darachcawley on 12/12/2016.
 * This is the second step of the workflow.
 */
'use strict';

var ngModule = angular.module('sos.sos-onsite', ['wfm.core.mediator', require('sos-workorder'), require('fh-wfm-user')]);

require('./template');

ngModule.directive('sosOnsite', function($templateCache, mediator, userClient) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-onsite-view.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;

            userClient.getProfile().then (function (profileData){
                $scope.profileData = profileData;
            });
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosOnsiteForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-onsite-form.tpl.html')
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
            $scope.action = 'FIXDETERMINED';

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
            });

            $scope.options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            $scope.step1Codes = [{
                id: 1,
                name: 'Fuel'
            }, {
                id: 2,
                name: 'Breaks'
            },{
                id: 3,
                name: 'Exhaust'
            },{
                id: 4,
                name: 'Steering/Tyres'
            },{
                id: 5,
                name: 'Engine'
            }];
            $scope.chosenStep1 = $scope.step1Codes[3];

            $scope.step2Codes = [{
                id: 1,
                name: 'Servo Pump'
            }, {
                id: 2,
                name: 'Tyre Valve'
            },{
                id: 3,
                name: 'Tyre'
            },{
                id: 4,
                name: 'Rim'
            },{
                id: 5,
                name: 'Tyre Transponder System'
            }];
            $scope.chosenStep2 = $scope.step2Codes[2];

            $scope.step3Codes = [{
                id: 1,
                name: 'Flat'
            }];
            $scope.chosenStep3 = $scope.step3Codes[0];

            $scope.step4Codes = [{
                id: 1,
                name: 'Roadside Repair'
            },{
                id: 2,
                name: 'Towing'
            }];
            $scope.chosenStep4 = $scope.step4Codes[0];

            $scope.step5Codes = [{
                id: 1,
                name: 'Customer Not Present'
            }, {
                id: 2,
                name: 'Repair Not Feasible'
            },{
                id: 3,
                name: 'User Rejects Repair'
            },{
                id: 4,
                name: 'Diagnose Not Possible'
            },{
                id: 5,
                name: 'Part Not Available'
            }];
            $scope.chosenStep5 = $scope.step5Codes[0];

            $scope.faultCodes = [{
                id: 1,
                name: 'Fault 1'
            }, {
                id: 2,
                name: 'Fault 2'
            }];
            $scope.chosenFaultCode = $scope.faultCodes[0];

            self.workorder = $scope.$parent.workorder;

            self.model = {
                completedAction: $scope.action,
                fixDeterminedTime: '',
                chosenFaultCode: '',
                isFixed: false,
                chosenStep1: $scope.chosenStep1,
                chosenStep2: $scope.chosenStep2,
                chosenStep3: $scope.chosenStep3,
                chosenStep4: $scope.chosenStep4,
                chosenStep5: $scope.chosenStep5
            };

            self.processStep = function(cb){
                self.model.fixDeterminedTime = new Date();
                self.model.chosenFaultCode = $scope.chosenFaultCode;
                cb();
            };

            self.completeStep = function(){
                self.workorder.completedAction = $scope.action;
                self.workorder.fixDeterminedTime = self.model.fixDeterminedTime;
                self.workorder.chosenFaultCode = self.model.chosenFaultCode;

                // Publish model, update workorder
                self.workorderManager.update(self.workorder).then(function() {
                    mediator.publish('wfm:workflow:step:done', self.model);
                });
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
                self.ev = ev;
                var n = new Date();
                if(self.model.isFixed && self.model.isFixed === true){
                    self.completeStep();
                }else{
                    self.processStep(function(){
                        self.completeStep();
                    });
                }

                // Action can be triggered only once
                $scope.isActionButtonDisabled = true;
                $scope.isContinueButtonDisabled = false;
            };
        }
        , controllerAs: 'ctrl'
    };
})
;


module.exports = 'sos.sos-onsite';
