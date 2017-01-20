/**
 * Created by darachcawley on 12/12/2016.
 * This is the first step of the workflow.
 */
'use strict';

var ngModule = angular.module('sos.sos-inspection', ['wfm.core.mediator', require('sos-workorder'), require('fh-wfm-user')]);

require('./template');

ngModule.directive('sosInspection', function($templateCache) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-inspection-view.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosInspectionForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-inspection-form.tpl.html')
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
            $scope.action = 'INSPECTED';

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
            });

            self.workorder = $scope.$parent.workorder;

            self.model = {
                completedAction: $scope.action,
                inspectedTime: '',
                isDamageDone: false
            };

            self.completeStep = function(ev){
                self.workorder.completedAction = $scope.action;
                self.model.inspectedTime = new Date();
                self.workorder.inspectedTime = self.model.inspectedTime;

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

            self.showPictureCapture = function(ev){
                var deferred = $q.defer();

                // Appending dialog to document.body to cover sidenav in docs app
                var confirm = $mdDialog.confirm()
                    .title('Add Pictures')
                    .textContent('Placeholder to capture the preexisting damage/scratches.')
                    .ariaLabel('AddPicturesOfDamage')
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


module.exports = 'sos.sos-inspection';
