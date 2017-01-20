/**
 * Created by darachcawley on 12/12/2016.
 */
var ngModule;
try {
    ngModule = angular.module('sos.sos-review');
} catch (e) {
    ngModule = angular.module('sos.sos-review', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
    // displays this steps' results
    $templateCache.put('sos-template/sos-review-view.tpl.html',
        '<md-subheader>Review & Update</md-subheader>\n' +
        '<md-list>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.completedTime}}</h3>\n' +
        '           <p>Completed Time</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.chosenStep1.name}}</h3>\n' +
        '           <p>Fault</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.chosenStep2.name}}</h3>\n' +
        '           <p>Part</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.chosenStep3.name}}</h3>\n' +
        '           <p>Cause</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.chosenStep4.name}}</h3>\n' +
        '           <p>Outcome</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.chosenStep5.name}}</h3>\n' +
        '           <p>Outcome Detail</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '</md-list>\n'+
        '\n' +
        '');

    // captures the data required for this step
    $templateCache.put('sos-template/sos-review-form.tpl.html',
        '<md-subheader>Review and update editable fields</md-subheader>\n' +
        '   <div style="padding: 10px;">\n' +
    //'           <div flex="40" layout="row" layout-align="start center">\n' +
    //'             <span class="md-body-2" style="">\n' +
    //'               Case Type:\n' +
    //'             </span>\n' +
    //'           </div>\n' +
    //    '       <input type="text" name="input" ng-model="ctrl.model.caseType" ng-disabled="false">\n' +
    //    '<br>\n' +
        //'      <p>Please update the workshop print name:</p>\n' +
        //'           <div flex="40" layout="row" layout-align="start center">\n' +
        //'             <span class="md-body-2" style="">\n' +
        //'               Fault Code:\n' +
        //'             </span>\n' +
        //'           </div>\n' +
        //'       <select ng-model="chosenFaultCode" ng-options="faultCode.name for faultCode in faultCodes" style="padding: 10%"></select>\n' +
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
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.goBack($event)">Back</md-button>\n' +
        '       <md-button class="md-primary" ng-click="ctrl.onAction($event)">Complete</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
