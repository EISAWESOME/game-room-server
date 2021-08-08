/* eslint-disable no-undef */
angular.module('TestApp', ['ngMaterial', 'ngMessages']).controller("ctrl", function ($scope, $http) {

    const SERVER_URL = "http://127.0.0.1:8080"

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    // On genère un user Id quand on arrive sur la page

    const userId = uuidv4();

    $scope.user = {
        id: userId,
        name: "Testeur"
    };

    $scope.gameId = "1";

    $scope.create = () => {
        $http.post(SERVER_URL + "/create", {
            gameId: Number($scope.gameId),
            user: $scope.user
        }).then(() => {

            $scope.list();
        })
    }

    $scope.rooms = [];
    $scope.list = () => {
        $http.get(SERVER_URL + "/list?details=true").then((res) => {

            if (res.data && Object.keys(res.data).length > 0) {

                $scope.rooms = [];
                for(const [key, value] of Object.entries(res.data)) {
                    $scope.rooms.push(value);

                }

            }

        })

    }

    $scope.join = (room) => {

        let id = room.id.replace("ROOM_", '');

        $http.post(SERVER_URL + "/join", {
            roomId: id,
            users: [$scope.user]
        }).then(() => {

            $scope.list();

        })

    }

    $scope.details = (room) => {
        let id = room.id.replace("ROOM_", '');

        $http.get(SERVER_URL + "/details/" + id).then((res) => {

            room.details = res.data;

        })
    }

    $scope.list();

});