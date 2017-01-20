/**
 * Created by darachcawley on 12/12/2016.
 */
var ngModule;
try {
    ngModule = angular.module('sos.sos-enroute');
} catch (e) {
    ngModule = angular.module('sos.sos-enroute', []);
}

ngModule.run(['$templateCache', function ($templateCache) {
    // displays this steps' results
    $templateCache.put('sos-template/sos-enroute-view.tpl.html',
        '<md-subheader>En Route to Site</md-subheader>\n' +
        '<md-list>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.arrivedTime}}</h3>\n' +
        '           <p>Arrival Time</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '   <md-list-item class="md-2-line" >\n' +
        '       <md-icon md-font-set="material-icons">assignment</md-icon>\n' +
        '       <div class="md-list-item-text">\n' +
        '           <h3>{{sos.arrivedOnSiteLocation[0]}}, {{sos.arrivedOnSiteLocation[1]}}</h3>\n' +
        '           <p>Arrived At</p>\n' +
        '       </div>\n' +
        '   </md-list-item>\n' +
        '</md-list>\n'+
        '\n' +
        '');


    // captures the data required for this step
    $templateCache.put('sos-template/sos-enroute-form.tpl.html',
        '<div ng-if="!isLocationAvailable" flex layout="row" layout-align="center center" class="spinner-overlay">\n' +
        '   <md-progress-circular md-diameter="80" md-mode="indeterminate"></md-progress-circular>\n' +
        '   <br><p>Retrieving GPS location...</p>\n' +
        '</div>\n' +
        '<div class="map" flex>\n' +
        '   <workorder-map workorders="ctrl.workorders" center="ctrl.center"></workorder-map>\n' +
        '</div>\n' +
        '<md-button class="md-raised md-primary md-hue-2" ng-click="ctrl.showGoogleNav($event)">Open Navigation</md-button>\n' +
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.goBack($event)">Back</md-button>\n' +
        '       <md-button class="md-primary" ng-click="ctrl.onAction($event)">Arrived</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
