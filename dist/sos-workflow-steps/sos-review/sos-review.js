/**
 * Created by darachcawley on 12/12/2016.
 */
'use strict';

var ngModule = angular.module('sos.sos-review', ['wfm.core.mediator', require('sos-workorder'), require('fh-wfm-user')]);

require('./template');

ngModule.directive('sosReview', function($templateCache) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-review-view.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;

            //self.steps = $scope.$parent.$parent.result.stepResults;
            //self.arrivedTime = self.steps['sos-enroute'].submission.arrivedTime;

        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosReviewForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-review-form.tpl.html')
        , scope: {
            action: "@action"
        }
        , link: function(scope, element, attributes){
            var self = this;
            console.log('sos Link function ', attributes.action);
        }
        , controller: function($q, $scope, $state, $timeout, $mdDialog, $mdToast, workorderSync, $stateParams, userClient, $filter) {
            console.log('sos controller function');
            var self = this;
            $scope.action = 'COMPLETED';

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
            });

            //$scope.faultCodes = [{
            //    id: 1,
            //    name: 'Fault 1'
            //}, {
            //    id: 2,
            //    name: 'Fault 2'
            //}];
            //$scope.chosenFaultCode = $scope.faultCodes[0];

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
            $scope.chosenStep4 = $scope.step4Codes[1];

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


            self.workorder = $scope.$parent.workorder;

            self.model = {
                completedAction: $scope.action,
                completedTime: '',
                caseType: self.workorder.caseType,
                chosenStep1: $scope.chosenStep1,
                chosenStep2: $scope.chosenStep2,
                chosenStep3: $scope.chosenStep3,
                chosenStep4: $scope.chosenStep4,
                chosenStep5: $scope.chosenStep5
            };

            //$stateParams is the current state of the route in the app.
            //This is used to get the ID of the current workorder that is being worked on.
            /**
             * result example
             *
             *
             {
                "status": "In Progress",
                "_localuid": "0a8bafa5e141e42d70a2f44c5dc2236c9b39455e",
                "stepResults": {
                  "risk-assessment": { // step code defined in the workflow
                    "step": {
                      "code": "risk-assessment",
                      "name": "Risk Assessment",
                      "templates": {
                        "form": "<risk-assessment-form></risk-assessment-form>",
                        "view": "<risk-assessment value=\"result.submission\"></risk-assessment>"
                      }
                    },
                    //submission is the data that was submitted by the step
                    "submission": {
                      "complete": true
                    },
                    "type": "static",
                    "status": "complete",
                    "timestamp": 1484037536516,
                    "submitter": "rJeXyfdrH"
                  },
                  "vehicle-inspection": {
                    "step": {
                      "code": "vehicle-inspection",
                      "name": "Vehicle Inspection",
                      "templates": {
                        "form": "<vehicle-inspection-form></vehicle-inspection-form>",
                        "view": "<vehicle-inspection value=\"result.submission\"></vehicle-inspection>"
                      }
                    },
                    "submission": {
                      "tires": true,
                      "fuel": 25,
                      "lights": true
                    },
                    "type": "static",
                    "status": "complete",
                    "timestamp": 1484037539745,
                    "submitter": "rJeXyfdrH"
                  }
                },
                "workorderId": "B1r71fOBr",
                "id": "BygiazMUl"
              }
             */
            mediator.request("wfm:result:read", $stateParams.workorderId).then(function(result) {
                self.result = result;
            });

            self.completeStep = function(ev){
                self.workorder.completedAction = $scope.action;
                self.workorder.status = 'Complete';
                self.model.completedTime = new Date();
                self.workorder.completedTime = self.model.completedTime;
                self.workorder.caseType = self.model.caseType;
                //self.workorder.chosenFaultCode = self.model.chosenFaultCode;

                //Subscribing to the done topic for updating the result. When the result has been updated we can proceed.
                mediator.once("done:wfm:result:update:" + $stateParams.workorderId, function() {
                    // Publish model, update workorder
                    self.workorderManager.update(self.workorder).then(function() {
                        mediator.publish('wfm:workflow:step:done', self.model);
                    });
                });

                //Publishing a topic to update the result to reflect any changes in the form.
                mediator.publish("wfm:result:update", $stateParams.workorderId, self.result);


                ev.preventDefault();
                ev.stopPropagation();
            };

            self.onAction = function(ev) {
                console.log('onAction', $scope.action);

                self.completeStep(ev);

                // Action can be triggered only once
                $scope.isActionButtonDisabled = true;
                $scope.isContinueButtonDisabled = false;
            };

            self.goBack = function(ev){
                // Publish model, update workorder
                self.workorderManager.update(self.workorder).then(function() {
                    mediator.publish('wfm:workflow:step:back', self.model);
                });
                ev.preventDefault();
                ev.stopPropagation();
            };
        }
        , controllerAs: 'ctrl'
    };
})
;


module.exports = 'sos.sos-review';
