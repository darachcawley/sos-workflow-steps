/**
 * Created by darachcawley on 12/12/2016.
 */
var ngModule;
try {
    ngModule = angular.module('sos.sos-departure');
} catch (e) {
    ngModule = angular.module('sos.sos-departure', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
    // displays this steps' results
    $templateCache.put('sos-template/sos-departure-view.tpl.html',
        '<md-subheader>Departure</md-subheader>\n' +
        '<md-list>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.departedTime}}</h3>\n' +
        '           <p>Departed Time</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.departedToSiteLocation[0]}}, {{sos.departedToSiteLocation[1]}}</h3>\n' +
        '           <p>Departed From</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.eta}} minutes</h3>\n' +
        '           <p>ETA</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '</md-list>\n'+
        '\n' +
        '');

    // captures the data required for this step
    $templateCache.put('sos-template/sos-departure-form.tpl.html',
        '<div ng-if="!isLocationAvailable" flex layout="row" layout-align="center center" class="spinner-overlay">\n' +
        '   <md-progress-circular md-diameter="80" md-mode="indeterminate"></md-progress-circular>\n' +
        '   <br><p>Retrieving GPS location...</p>\n' +
        '</div>\n' +
        '<md-subheader>Auto-estimated journey duration:</md-subheader>\n' +
        '<img src="images/distance.png" width="90%" style="padding: 5%">\n'+
        '<md-subheader>Please indicate an ETA for the Customer:</md-subheader>\n' +
        '<md-slider flex md-discrete ng-model="ctrl.model.eta" step="5" min="15" max="180" aria-label="rating" width="90%" style="padding: 5%"></md-slider>\n' +
        '<p><b>ETA selected:</b> {{ctrl.model.eta}} minutes</p>\n' +
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.onAction($event)">Departing</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
