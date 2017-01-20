/**
 * Created by darachcawley on 12/12/2016.
 */
var ngModule;
try {
    ngModule = angular.module('sos.sos-inspection');
} catch (e) {
    ngModule = angular.module('sos.sos-inspection', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
    // displays this steps' results
    $templateCache.put('sos-template/sos-inspection-view.tpl.html',
        '<md-subheader>Vehicle Inspection</md-subheader>\n' +
        '<md-list>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.inspectedTime}}</h3>\n' +
        '           <p>Inspected Time</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.isDamageDone}}</h3>\n' +
        '           <p>Damage Noted?</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '</md-list>\n'+
        '\n' +
        '');

    // captures the data required for this step
    $templateCache.put('sos-template/sos-inspection-form.tpl.html',
        '<md-subheader>Check if the Vehicle has damage which requires recording before towing.</md-subheader>\n' +

        '   <md-list>\n' +
        '       <md-list-item class="md-1-line" >\n' +
        '           <md-switch ng-model="ctrl.model.isDamageDone" aria-label="Noticable Damage/Scratches to Note?"></md-switch>\n' +
        '       <p>Noticable Damage/Scratches to Note?</p>\n' +
        '   </md-list>\n'+
        '<md-button class="md-raised md-primary md-hue-2" ng-if="ctrl.model.isDamageDone === true" ng-click="ctrl.showPictureCapture($event)">Add Pictures</md-button>\n' +
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.goBack($event)">Back</md-button>\n' +
        '       <md-button class="md-primary" ng-click="ctrl.onAction($event)">Agreement</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
