$(function () {
    // 密码的校验
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd : function(value) {
            if(value === $('[name=oldPwd]').val()) {
                return "新旧密码不能一致"
            }
        },
        rePwd : function(value) {
            if(value !== $('[name=newPwd]').val()) {
                return "两次密码输入不一致"
            }
        }
    })
    // 发起表单的重置密码的功能
    $('.layui-form').on('submit',function(e) {
        // 阻止表单的默认行为
        e.preventDefault();
        // 发起ajax的post请求
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success : function(res) {
                if(res.status !== 0) {
                    return layui.layer.msg('更改密码失败')
                }
                layui.layer.msg('更改密码成功');
                // 重置表单,reset这个方法是DOM元素中的方法,所以必须把jQuery转换成DOM元素
                $('.layui-form')[0].reset()
            }
        })
    })
})