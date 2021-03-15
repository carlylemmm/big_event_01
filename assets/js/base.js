// 开发huanjing
baseURL = "http://ajax.frontend.itheima.net"
//测试环境
//baseURL = "http://ajax.frontend.itheima.net"
//生产环境
//baseURL = "http://ajax.frontend.itheima.net"


$.ajaxPrefilter(function (options) {
    //手动为url路径加前缀
    options.url = baseURL + options.url
    // 身份认证
    // console.log(options.headers);
    if (options.url.indexOf('/my/') !== -1) {

        options.headers = {
            //重新登陆 token12小时过期
            Authorization: localStorage.getItem('token') || ""

        }

    }
    // 拦截所有响应, 判断身份认证信息
    options.complete = function (res) {
        let obj = res.responseJSON;
        console.log(res.responseJSON);
        // localStorage.removeItem('token')

        if (obj.status == 1 && obj.message == '身份认证失败!') {
            //1.清空本地token
            localStorage.removeItem('token')
            location.href = "../../login.html"

        }
    }
})