//入口函数
$(function () {
    getUserInof()
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        //框架
        //eg1
        layer.confirm('是否确定退出登录', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem("token")
            location.href = "../../login.html";
            layer.close(index);
        });

    })

});

// 退出


//获取用于信息
//其他页面要调用
function getUserInof() {
    $.ajax({

        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     //重新登陆 token12小时过期
        //     Authorization: localStorage.getItem('token') || ""

        // },

        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icom: 5 });
            }
            renderAvatar(res.data);
        }
        //请求成功,渲染头像


    })

}
// 头像文字渲染封装
function renderAvatar(user) {
    // console.log(user);
    //1.渲染名称
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".text-avatar").hide();
    } else {
        //,没有头像
        $(".layui-nav-img").hide();
        let text = name[0].toUpperCase();
        // console.log(text);
        $(".text-avatar").show().html(text);
    }

}