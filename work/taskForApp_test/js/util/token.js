var access_token = null;
if (!getCookie('accessToken_' + buff)) {
    $.ajax({
        url: apiModule.getAccess_token,
        type: 'GET',
        ContentType: 'application/json',
        async: false,
        data: {
            'client_id': 'msd0c28f00413d6c95',
            'secret': 'a89c4996d0c28f00413d6c95ff6e4a2a'
        },
        success: function (res) {
            setCookie('accessToken_'+buff, res.access_token, res.expires);
            access_token = res.access_token;
        },
        error: function (error) {
            console.log(error);
        }
    });
} else {
    access_token = getCookie('accessToken_' + buff);
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

//设置cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 1000 / 2));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//清除cookie  
function clearCookie(name) {
    setCookie(name, "", -1);
}

