import $ from 'jquery';
/*
 * url 请求地址
 * rtype 请求方式 GET,POST,PUT,DELETE
 * data 参数
 * callback 回调方法 type:0 成功 1数据异常 2 服务器异常
 */

export var HttpClient = (function () {
    let requestSuccess = 0;
    let requestDataError = 1;
    let requestServiceError = 2;
    function query (url,rtype,data,callback,contentType) {
        if (contentType == null) {
            contentType = 'application/x-www-form-urlencoded'
        }
        $.ajax({
            "url": url,
            "async": true,
            "cache": false,
            "method": rtype,
            "data": data,
            "dataType": 'json',
            "xhrFields": {
                "withCredentials": true
            },
            timeout: 40000,
            "crossDomain": true,
            "contentType": contentType,
            success: function (d) {
                //成功
                callback(d, requestSuccess);
            },
            error: function (e) {
                //服务异常
                callback(e, requestServiceError);
            }
        });
    }

    return {
        GET: 'GET',
        POST:"POST",
        requestSuccess:requestSuccess,
        requestDataError:requestDataError,
        requestServiceError:requestServiceError,
        query:query,
    }
}());