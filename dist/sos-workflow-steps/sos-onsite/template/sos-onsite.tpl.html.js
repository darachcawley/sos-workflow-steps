/**
 * Created by darachcawley on 12/12/2016.
 */
var ngModule;
try {
    ngModule = angular.module('sos.sos-onsite');
} catch (e) {
    ngModule = angular.module('sos.sos-onsite', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
    // displays this steps' results
    $templateCache.put('sos-template/sos-onsite-view.tpl.html',
        '<md-subheader>On Site</md-subheader>\n' +
        '<md-list>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.fixDeterminedTime}}</h3>\n' +
        '           <p>Determined Resolution Time</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" ng-if="sos.isFixed === true">\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.chosenFaultCode.name}}</h3>\n' +
        '           <p>Fault Found</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.isFixed}}</h3>\n' +
        '           <p>Fixed on site</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '</md-list>\n'+
        '\n' +
        '');

    // captures the data required for this step
    $templateCache.put('sos-template/sos-onsite-form.tpl.html',
        '<md-subheader>Has the issue been fixed?</md-subheader>\n' +
        '\n' +
        '   <md-list>\n' +
        '       <md-list-item class="md-1-line" >\n' +
        '           <md-switch ng-model="ctrl.model.isFixed" aria-label="Has the issue been fixed?"></md-switch>\n' +
        '           <p>Has the issue been fixed?</p>\n' +
        '       </md-list-item>\n' +
        '       <md-list-item class="md-1-line" >\n' +
        //'           <select ng-if="ctrl.model.isFixed === true" ng-model="chosenFaultCode" ng-options="faultCode.name for faultCode in faultCodes" style="padding: 10%"></select>\n' +
        '   <div style="padding: 10px;" ng-if="ctrl.model.isFixed === true">\n' +
        '      <p>Please update the Fault details (if needed):</p>\n' +
        '           <div flex="40" layout="row" layout-align="start center">\n' +
        '             <span class="md-body-2" style="">\n' +
        '               What was the fault?\n' +
        '             </span>\n' +
        '           </div>\n' +
        '       <select ng-model="chosenStep1" ng-options="stepCode.name for stepCode in step1Codes" style="padding: 10%"></select>\n' +
        '           <div flex="40" layout="row" layout-align="start center">\n' +
        '             <span class="md-body-2" style="">\n' +
        '               Which part was faulty?\n' +
        '             </span>\n' +
        '           </div>\n' +
        '       <select ng-model="chosenStep2" ng-options="stepCode.name for stepCode in step2Codes" style="padding: 10%"></select>\n' +
        '           <div flex="40" layout="row" layout-align="start center">\n' +
        '             <span class="md-body-2" style="">\n' +
        '               What was the cause?\n' +
        '             </span>\n' +
        '           </div>\n' +
        '       <select ng-model="chosenStep3" ng-options="stepCode.name for stepCode in step3Codes" style="padding: 10%"></select>\n' +

        '      <p>Please indicate the resolution/outcome:</p>\n' +
        '           <div flex="40" layout="row" layout-align="start center">\n' +
        '             <span class="md-body-2" style="">\n' +
        '               What was the outcome?\n' +
        '             </span>\n' +
        '           </div>\n' +
        '       <select ng-model="chosenStep4" ng-options="stepCode.name for stepCode in step4Codes" style="padding: 10%"></select>\n' +
        '           <div flex="40" layout="row" layout-align="start center">\n' +
        '             <span class="md-body-2" style="">\n' +
        '               Additional outcome detail:\n' +
        '             </span>\n' +
        '           </div>\n' +
        '       <select ng-model="chosenStep5" ng-options="stepCode.name for stepCode in step5Codes" style="padding: 10%"></select>\n' +
        '   </div>\n' +
        '       </md-list-item>\n' +
        '   </md-list>\n'+


        '\n' +
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.goBack($event)">Back</md-button>\n' +
        '       <md-button class="md-primary" ng-if="ctrl.model.isFixed === true" ng-click="ctrl.onAction($event)">Complete</md-button>\n' +
        '       <md-button class="md-primary" ng-if="ctrl.model.isFixed === false" ng-click="ctrl.onAction($event)">Continue</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
