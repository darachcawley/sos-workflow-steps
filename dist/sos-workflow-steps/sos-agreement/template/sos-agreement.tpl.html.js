/**
 * Created by darachcawley on 12/12/2016.
 */
var ngModule;
try {
    ngModule = angular.module('sos.sos-agreement');
} catch (e) {
    ngModule = angular.module('sos.sos-agreement', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
    // displays this steps' results
    $templateCache.put('sos-template/sos-agreement-view.tpl.html',
        '<md-subheader>Customer Agreement</md-subheader>\n' +
        '<md-list>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <signature value="sos.customerSignature"></signature>\n' +
        '           <p>Customer Signature</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.chosenWorkshop}}</h3>\n' +
        '           <p>Chosen Workshop</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.departedToWorkshopLocation[0]}}, {{sos.departedToWorkshopLocation[1]}}</h3>\n' +
        '           <p>Departed From</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.departedToWorkshopTime}}</h3>\n' +
        '           <p>Departed to Workshop Time</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '</md-list>\n'+
        '\n' +
        '');

    // captures the data required for this step
    $templateCache.put('sos-template/sos-agreement-form.tpl.html',
        '<div ng-if="!isLocationAvailable" flex layout="row" layout-align="center center" class="spinner-overlay">\n' +
        '   <md-progress-circular md-diameter="80" md-mode="indeterminate"></md-progress-circular>\n' +
        '   <br><p>Retrieving GPS location...</p>\n' +
        '</div>\n' +
        '<md-subheader>Customer Acceptance</md-subheader>\n' +
        '   <md-list>\n' +
        '       <md-list-item class="md-1-line" >\n' +
        '           <p>Choose Workshop:</p>\n' +
        '           <select ng-model="chosenWorkshop" ng-options="workshop.name for workshop in workshops" style="padding: 10%"></select>\n' +
        '       </md-list-item>\n' +
        '       <md-list-item class="md-1-line" >\n' +
        '           <md-switch ng-model="ctrl.model.isCustomerOnsite" aria-label="Is Customer Onsite?"></md-switch>\n' +
        '           <p>Is Customer Onsite?</p>\n' +
        '       </md-list-item>\n' +
        '   </md-list>\n' +
        '   <div ng-if="ctrl.model.isCustomerOnsite === true">' +
        '       <p>Please get the customer to sign here:</p>' +
        '      <signature-form value="ctrl.model.customerSignature"></signature-form>\n' +
        '   </div>'+
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.goBack($event)">Back</md-button>\n' +
        '       <md-button class="md-primary" ng-click="ctrl.onAction($event)">Depart to Workshop</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
