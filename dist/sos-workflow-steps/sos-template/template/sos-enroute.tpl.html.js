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
        '  <md-subheader>SOS {{action}}</md-subheader>\n' +
        '\n' +
        '');

    // captures the data required for this step
    $templateCache.put('sos-template/sos-enroute-form.tpl.html',
        '  <md-subheader>SOS Form {{action}}</md-subheader>\n' +
        '\n' +
        '     <div class="workflow-actions md-padding md-whiteframe-z4">\n' +
        '       <md-button class="md-primary" ng-click="ctrl.onAction($event)">Continue</md-button>\n' +
        '     </div><!-- workflow-actions-->\n' +
        '');
}]);
