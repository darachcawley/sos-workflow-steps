/**
 * Created by darachcawley on 20/01/2017.
 */
var angular = require('angular');


angular.module('sos.steps', ['wfm.core.mediator',
    require('sos-workorder')
    , require('fh-wfm-user')
    , require('../../dist/sos-workflow-steps/sos-departure/sos-departure')
    , require('../../dist/sos-workflow-steps/sos-enroute/sos-enroute')
    , require('../../dist/sos-workflow-steps/sos-onsite/sos-onsite')
    , require('../../dist/sos-workflow-steps/sos-inspection/sos-inspection')
    , require('../../dist/sos-workflow-steps/sos-agreement/sos-agreement')
    , require('../../dist/sos-workflow-steps/sos-enroute-workshop/sos-enroute-workshop')
    , require('../../dist/sos-workflow-steps/sos-at-workshop/sos-at-workshop')
    , require('../../dist/sos-workflow-steps/sos-review/sos-review')
]);

module.exports = 'sos.steps';