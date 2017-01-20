/**
 * Created by darachcawley on 12/12/2016.
 * This is the first step of the workflow.
 */
'use strict';

var ngModule = angular.module('sos.sos-enroute', ['wfm.core.mediator', require('fh-wfm-workorder'), require('fh-wfm-user')]);

require('./template');

ngModule.directive('sosEnroute', function($templateCache, mediator, userClient) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-enroute.tpl.html')
        , scope: {
            sos: "=value"
        }
        , controller: function($scope) {
            var self = this;

            userClient.getProfile().then (function (profileData){
                $scope.profileData = profileData;
            });
        }
        , controllerAs: 'ctrl'
    };
});

ngModule.directive('sosEnrouteForm', function($templateCache, mediator, userClient, $timeout) {
    return {
        restrict: 'E'
        , template: $templateCache.get('sos-template/sos-enroute-form.tpl.html')
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
            $scope.action = 'ENROUTE';
            $scope.workorderManagerAvailable = false;
            self.completedEarly = false;

            workorderSync.createManager().then (function (manager){
                self.workorderManager = manager;
                $scope.workorderManagerAvailable = true;
            });

            self.workorder = $scope.$parent.workorder; // TODO, use the workorderManager

            self.model = { // TODO this data shoud come from a call to the MBaaS
                status: 'In Progress',
                action: $scope.action,
                enRouteToSiteTimestamp: (typeof self.workorder.enRouteToSiteTimestamp !== 'undefined' ? self.workorder.enRouteToSiteTimestamp : '')
            };


            self.processGPSLocation = function(cb){
                var foundLocation = null;

                //testing
                var location = [];
                location.push('52.310131339684446');
                location.push('-7.119140622500026');
                foundLocation = [{location: location}];
                cb(foundLocation);

                //if(navigator.geolocation) {
                //    navigator.geolocation.getCurrentPosition(function (pos) {
                //        var location = [];
                //        var crd = pos.coords;
                //        console.log('Your current position is:');
                //        console.log('Latitude : ' + crd.latitude);
                //        console.log('Longitude: ' + crd.longitude);
                //        console.log('More or less ' + crd.accuracy + ' meters.');
                //
                //        location.push(crd.latitude);
                //        location.push(crd.longitude);
                //
                //        foundLocation = [{location: location}];
                //        cb(foundLocation);
                //        console.log('Callback done from Arrival');
                //        //multistep = false;
                //    },  function geoError(err) {
                //        console.warn('ERROR(' + err.code + '): ' + err.message);
                //        foundLocation = null;
                //        cb(foundLocation);
                //        console.log('Callback done from GPS location failure');
                //        // = false;
                //    }, $scope.options);
                //} else {
                //    console.log('Geo location not supported');
                //    foundLocation = null;
                //    cb(foundLocation);
                //    console.log('Callback done from GPS location without geolocation');
                //}
            };

            self.processEnRoute = function(cb){
                self.model.enRouteToSiteTimestamp = new Date();
                self.workorder.enRouteToSiteTimestamp = self.model.enRouteToSiteTimestamp;

                console.log(JSON.stringify($scope.options));
                // alert(JSON.stringify($scope.options));
                // if geo location is supported
                self.processGPSLocation(function(foundLocation){
                    self.model.enRouteToSiteLocation = foundLocation.location;
                    self.workorder.enRouteToSiteLocation = foundLocation.location;
                    cb();
                });
            };

            $scope.$watch('workorderManagerAvailable', function(current, old) {
                console.log('current', current, "old", old);
                if(self.completedEarly){
                    self.completeStep();
                }
            });

            self.completeStep = function(){

                self.workorder.completedAction = $scope.action;
                self.workorder.status = self.model.status;

                if(self.workorderManager){
                    // Publish model, update workorder
                    self.workorderManager.update(self.workorder).then(function() {
                        console.log('updated workorder');
                    });
                    ev.preventDefault();
                    ev.stopPropagation();

                    //setTimeout(function () {
                    //    self.completeStep(ev);
                    //}, 10);
                }else{
                    //workorder manager not available yet
                    self.completedEarly = true;
                }


            };

            //self.goBack = function(){
            //    //self.workorder.completedAction = $scope.action;
            //
            //    // Publish model, update workorder
            //    self.workorderManager.update(self.workorder).then(function() {
            //        mediator.publish('wfm:workflow:step:back', self.model);
            //    });
            //    ev.preventDefault();
            //    ev.stopPropagation();
            //};

            //
            //self.onAction = function(ev) {
            //    console.log('onAction', $scope.action);
            //    self.ev = ev;
            //    var n = new Date();
            //
            //
            //    // Action can be triggered only once
            //    $scope.isActionButtonDisabled = true;
            //    $scope.isContinueButtonDisabled = false;
            //};

            self.processEnRoute(function(){
                self.completeStep();
            });
        }
        , controllerAs: 'ctrl'
    };
})
;


module.exports = 'sos.sos-enroute';
