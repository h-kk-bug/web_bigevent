$(function () {
    var layer = layui.layer;
    var form = layui.form
    // 发起ajax请求,获取文章类别
    initArtCateList();
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
            }
        })
    }
    var index = null;
    // 使用layer.open实现弹出层效果
    // 给添加类别注册点击事件
    $('#btnAddCate').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })


    //通过代理的形式,为form-add(弹出框的表单)表单绑定submit事件
    $('body').on('submit', '#form-add', function (e) {
        // 阻止表单的默认提交事件
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $('#form-add').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增失败')
                }
                layer.msg('新增成功');
                initArtCateList();
                // 根据索引,关闭对应的弹出层
                layer.close(index)
            }
        })
    })
    // 修改文章信息的索引
    var indexEdit = null;
    // 通过事件委托的形式,为btn-edit(编辑),绑定点击事件
    $('tbody').on('click', '.btn-edit', function () {
        // 弹出一个修改文章分类信息的层
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-edit').html()
        });

        var id = $(this).attr('data-id')
        // 发起请求获取对应分类的数据
        $.ajax({
            method: "GET",
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('form-edit', res.data)

            }
        })
    })
    //更新文章分类的数据
    $('body').on('submit','#form-edit',function(e) {
        e.preventDefault();
        $.ajax({
            method:'POST',
            url :'/my/article/updatecate',
            data : $(this).serialize(),
            success : function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新分类数据失败!');
                }
                layer.msg('更新数据成功');
                // 通过弹出框的索引值删除弹出框
                layer.close(indexEdit)
                // 调用函数重新渲染页面
                initArtCateList();
            }
        })
    })
    // 删除文章分类
    $('tbody').on('click','.btn-delete',function() {
        var id = $(this).attr('data-id');
        // 提示用户是否要删除
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method : 'GET',
                url:'/my/article/deletecate/' + id,
                success : function(res) {
                   if(res.status !== 0) {
                       return layer.msg('删除失败')
                   } 
                   layer.msg('删除成功')
                   layer.close(index);
                   initArtCateList()
                }
            })
            layer.close(index);
          });
    })

})