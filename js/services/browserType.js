angular.module('browserTypeServiceModule', [])

    .service('browserType', function($window){
        var browserScope = this;

        browserScope.browserType = $window.navigator.sayswho= (function(){
            var ua= $window.navigator.userAgent, tem,
                M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE '+(tem[1] || '');
            }
            if(M[1]=== 'Chrome'){
                tem= ua.match(/\bOPR\/(\d+)/);
                if(tem!= null) return 'Opera '+tem[1];
            }
            M= M[2]? [M[1], M[2]]: [$window.navigator.appName, $window.navigator.appVersion, '-?'];
            if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
            return M;//.join(' ');
        })();

        browserScope.isChrome = browserScope.browserType[0] == "Chrome";
        browserScope.isFirefox = browserScope.browserType[0] == "Firefox";
        browserScope.isSafari = browserScope.browserType[0] == "Safari";

    });






