//入口函数
$(function () {
    // 1.点击去注册隐藏登陆区域,显示注册区域
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show()
    })
    $("#link_login").on("click", function () {
        $(".reg-box").hide()

        $(".login-box").show();

    })

    // 自定义校验规则
    let form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //选择器必须带空格 ,选择的是后代中的input ,name属性为password的哪个标签
            let pwd = $(".reg-box input[name=password]").val()
            if (value !== pwd) {
                return "两次密码输入不一样"
            }

        }
    })
    // 注册功能
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();

        // 注册用户模块
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $(".reg-box input[name=username]").val(),
                password: $(".reg-box input[name=password]").val(),
            },
            success: (res) => {
                console.log(res)
                const { username, password, status, message } = res;
                if (status !== 0) {
                    return layer.msg(message);
                }
                layer.msg("message")
                //提交成功后的处理代码

                $("#link_login").click();
                // 表单清空
                $("#form_reg")[0].reset();
            }

        })
    })

    // 登陆功能
    $("#form-login").submit(function (e) {
        // 阻止表单提交
        e.preventDefault();

        // 用户模块
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data:
                $(this).serialize(),

            success: function (res) {
                console.log(res)

                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // layer.msg(res.message)
                //提交成功后的处理代码

                localStorage.setItem('token', res.token);
                // 登陆后跳转
                location.href = "../../index.html";
            }

        })
    })
})