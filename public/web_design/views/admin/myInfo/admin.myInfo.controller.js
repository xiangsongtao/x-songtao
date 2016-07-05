/**
 * Created by xiangsongtao on 16/6/29.
 */
(function () {
    angular.module('xstApp')
        .controller('myInfoCtrl', ['$scope', 'AJAX', 'API', '$log', '$verification', '$timeout', '$rootScope', '$state', function ($scope, AJAX, API, $log, $verification, $timeout, $rootScope, $state) {
            if (!$rootScope.isLogin) {
                $state.go('home');
                return;
            }
            //获取我的信息
            AJAX({
                method: 'get',
                url: API.getMyInfoWithOriginal,
                success: function (response) {
                    if (parseInt(response.code) === 1) {
                        $scope.myinfo = response.data;
                        // console.log($scope.myinfo);
                    }
                }
            });

            //取值
            let changedValue;
            $scope.setThis = function (value) {
                changedValue = value;
            };
            //保存操作
            $scope.save = function (value) {
                // console.log(changedValue)
                // console.log(value)
                if (changedValue !== value) {
                    AJAX({
                        method: 'put',
                        url: API.postMyInfo,
                        data: {
                            _id: $scope.myinfo._id,
                            full_name: $scope.myinfo.full_name,
                            position: $scope.myinfo.position,
                            address: $scope.myinfo.address,
                            motto: $scope.myinfo.motto,
                            personal_state: $scope.myinfo.personal_state,
                            img_url: $scope.myinfo.img_url,
                        },
                        success: function (response) {
                            if (parseInt(response.code) === 1) {
                                $log.debug(response.msg);
                            } else {
                                alert("我的信息修改失败: " + response.msg);
                                $log.error(response.msg);
                            }
                        }
                    });
                }
            };


            //修改登录信息
            $scope.changeAuthorizationInfo = function () {
                if (!$verification.isUsername($scope.myinfo.username)) {
                    alert('用户名无效');
                    return false;
                }
                if (!$verification.isPassword($scope.myinfo.password)) {
                    alert('旧密码无效');
                    return false;
                }
                if (!$verification.isPassword($scope.myinfo.new_password)) {
                    alert('新密码无效');
                    return false;
                }
                AJAX({
                    method: 'post',
                    url: API.changePassword,
                    data: {
                        _id: $scope.myinfo._id,
                        username: $scope.myinfo.username,
                        password: $scope.myinfo.password,
                        new_password: $scope.myinfo.new_password,
                    },
                    success: function (response) {
                        if (parseInt(response.code) === 1) {
                            $scope.textState = '成功!';
                            $log.debug(response.msg);
                        } else {
                            $scope.textState = '失败!';
                            $log.error(response.msg);
                        }
                    },
                    complete: function () {
                        $timeout(function () {
                            $scope.myinfo.new_password = null;
                            $scope.textState = 'Submit';
                        }, 2000, true)
                    }
                });
            };


            /**
             * imgUpload 配置
             * */
            let config = {
                url: API.imgUpload,
                maxFilesize: 1000,
                paramName: "uploadImg",
                maxThumbnailFilesize: 10,
                parallelUploads: 1,
                //自动上传
                autoProcessQueue: true
            };
            let dropzone = new Dropzone(document.getElementById('imgUpload'), config);
            dropzone.on('success', function (file, response) {
                if (parseInt(response.code) === 1) {
                    $scope.myinfo.img_url = response.data;
                    isChanged = true;
                    $scope.save();
                }
            });
        }]);
})();


