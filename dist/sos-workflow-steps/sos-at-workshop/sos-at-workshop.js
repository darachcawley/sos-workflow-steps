/**
 * Created by darachcawley on 12/12/2016.
 */
'use strict';

var ngModule = angular.module('sos.sos-at-workshop', ['wfm.core.mediator', require('sos-workorder'), require('fh-wfm-user')]);

require('./template');

ngModule.directive('sosAtWorkshop', function($templateCache) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-at-workshop-view.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosAtWorkshopForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-at-workshop-form.tpl.html')
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
            $scope.action = 'HANDEDOVER';

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
            });

            self.workorder = $scope.$parent.workorder;

            self.model = {
                completedAction: $scope.action,
                workshopSignaturePrint: '',
                workshopSignature: '',
                handedOverTime: ''
            };

            self.completeStep = function(ev){
                self.model.handedOverTime = new Date();
                self.workorder.handedOverTime = self.model.handedOverTime;
                self.workorder.completedAction = $scope.action;
                self.workorder.workshopSignaturePrint = self.model.workshopSignaturePrint;

                // Publish model, update workorder
                self.workorderManager.update(self.workorder).then(function() {
                    mediator.publish('wfm:workflow:step:done', self.model);
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

                self.completeStep(ev);

                // Action can be triggered only once
                $scope.isActionButtonDisabled = true;
                $scope.isContinueButtonDisabled = false;
            };
        }
        , controllerAs: 'ctrl'
    };
})
;


module.exports = 'sos.sos-at-workshop';
