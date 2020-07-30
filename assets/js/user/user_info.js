$(function () {
    // 获取用户的信息
    initUserInfo();
    // 表单校验
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称必须在1~6个字符之间"
            }
        }
    })



    // 初始话用户的基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败!')
                }
                form.val('formUserInfo',res.data)
            }
        })
    }


    // 实现表单的重置效果
    $('#btnReset').on('click',function(e) {
        // 阻止表单的默认提交事件
        e.preventDefault();
        initUserInfo();
    })
    // 监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单的默认提交事件
        e.preventDefault();
        // 发起ajax请求中的POST请求
        $.ajax ({
            type : 'POST',
            url :'/my/userinfo',
            data : $(this).serialize(),
            success : function(res) {
                console.log(res);
                if(res.status !== 0) {
                    return layer.msg('更新失败')
                }
                layer.msg('更新成功')
                // 更新成功调用父页面中的方法,重新渲染页面头像和用户信息
                window.parent.getUsetInfo()
            }
        })
    })
})