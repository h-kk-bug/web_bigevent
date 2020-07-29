$(function () {
    getUsetInfo();

    var layer = layui.layer

    // 点退出按钮绑定事件
    $('#btnLogout').on('click',function() {
        // 提示用户是否直接退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 1.清除本地存储中的token数据
            localStorage.removeItem('token');
            // 2.重新跳转到登录页面
            location.href = '/login.html';
            // layui自带属性,关闭confirm询问框
            layer.close(index);
          });
    })
})

// 获取用户的基本信息
function getUsetInfo() {    
    $.ajax({
        type: "GET",
        url: '/my/userinfo',
        // //headers就是请求头配置对象
        // headers: {
        //     Authorization : localStorage.getItem('token') || '',
        // },
        success : function(res) {
            console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            } 
            // 调用renderAVatar渲染页面
            renderAvatar(res.data);
        },
        // 不论成功还是失败最终都会调用complete函数
        complete : function(res) {
            console.log('执行了complete函数');
            console.log(res);
            // 在complete函数中,使用responseJSON拿到服务器响应回来的数据
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 1.强制清空token 
                localStorage.removeItem('token');
                // 2.强制跳转到登录页面
                location.href = '/login.html';
            } 
        }
    })
}
// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称 ,先看用户有没有昵称,如果没有昵称则渲染用户名
    var name = user.nickname || user.username;
    // 2.设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' +name);
    // 3.按需渲染用户头像
    if(user.user_pic !== null) {
        // 3.1图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 3.2文字头像
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    }
}

