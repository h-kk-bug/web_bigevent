// 注意:每次调用$.git或$.post或$.ajax的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中,可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起正真的ajax请求之前,统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 判断端口中是不是含有/my/
    if (options.url.indexOf('/my/') !== -1) {
        //headers就是请求头配置对象
        options.headers = {
            Authorization: localStorage.getItem('token') || '',
        }
    }

    // 全局统一挂载complete回调函数
    // 不论成功还是失败最终都会调用complete函数
    options.complete = function (res) {
        console.log('执行了complete函数');
        console.log(res);
        // 在complete函数中,使用responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token 
            localStorage.removeItem('token');
            // 2.强制跳转到登录页面
            location.href = '/login.html';
        }
    }

})