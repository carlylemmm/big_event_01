// 开发huanjing
baseURL = "http://ajax.frontend.itheima.net"
//测试环境
//baseURL = "http://ajax.frontend.itheima.net"
//生产环境
//baseURL = "http://ajax.frontend.itheima.net"


$.ajaxPrefilter(function (options) {
    //手动为url路径加前缀
    options.url = baseURL + options.url
});