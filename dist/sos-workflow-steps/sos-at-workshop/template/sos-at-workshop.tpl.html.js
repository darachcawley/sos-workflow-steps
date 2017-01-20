/**
 * Created by darachcawley on 12/12/2016.
 */
var ngModule;
try {
    ngModule = angular.module('sos.sos-at-workshop');
} catch (e) {
    ngModule = angular.module('sos.sos-at-workshop', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
    // displays this steps' results
    $templateCache.put('sos-template/sos-at-workshop-view.tpl.html',
        '<md-subheader>Arrived at Workshop</md-subheader>\n' +
        '<md-list>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.workshopSignaturePrint}}</h3>\n' +
        '           <p>Workshop Handover Name</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <signature value="sos.workshopSignature"></signature>\n' +
        '           <p>Workshop Handover Signature</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '</md-list>\n'+
        '\n' +
        '');

    // captures the data required for this step
    $templateCache.put('sos-template/sos-at-workshop-form.tpl.html',
        '<md-subheader>Workshop Handover</md-subheader>\n' +

        '   <div style="padding: 10px;">\n' +
        '      <p>Please get the workshop to sign here:</p>\n' +
        '           <div flex="40" layout="row" layout-align="start center">\n' +
        '             <span class="md-body-2" style="">\n' +
        '               Print\n' +
        '             </span>\n' +
        '           </div>\n' +
        '       <input type="text" name="input" ng-model="ctrl.model.workshopSignaturePrint" ng-disabled="false">\n' +
        '           <div flex="40" layout="row" layout-align="start center">\n' +
        '             <span class="md-body-2">\n' +
        '               Sign\n' +
        '             </span>\n' +
        '           </div>\n' +
        '      <signature-form value="ctrl.model.workshopSignature"></signature-form>\n' +
        '   </div>\n'+
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.goBack($event)">Back</md-button>\n' +
        '       <md-button class="md-primary" ng-click="ctrl.onAction($event)">Review</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
