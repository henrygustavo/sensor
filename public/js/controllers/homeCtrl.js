angular.module('applicationModule.homeCtrl', [])
    .controller('homeCtrl', function($location,sensorService) {
        var vm = this;
        vm.turnOn = function() {

            sensorService.trigger("1").then(
                function(response) {
                    alert(response.message);
                },
                function(response) {

                });
        };

        vm.turnOff = function(username, password) {
            sensorService.trigger("0").then(
                function(response) {
                    alert(response.message);
                },
                function(response) {

                });
        };

    });
