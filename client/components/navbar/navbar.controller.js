'use strict';

angular.module('georgieStClaireApp')
    .controller('NavbarCtrl', function($scope, $location, Auth, $modal, $log) {

        var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
        if (!is_chrome) {
            var openBrowser = function(size) {
                var modalInstance = $modal.open({
                    templateUrl: 'wrongbrowser.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function() {
                            return $scope.items;
                        }
                    }
                });
            };
            openBrowser();
        }

        $scope.items = ['item1', 'item2', 'item3'];

        $scope.openModal = function(size) {

            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function() {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }).controller('ModalInstanceCtrl', function($scope, $modalInstance, items) {

        $scope.items = items;

        $scope.ok = function() {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
