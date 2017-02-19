$(document).ready(function(e) {

        //平台检测
        var os = detectOS();
        //------------判断浏览器、操作系统
        function detectOS() {
            var userAgent = navigator.userAgent;
            var os = {};
            os.android = userAgent.match(/(Android)\s+([\d.]+)/) || userAgent.match(/Silk-Accelerated/) || (/android/i.test(userAgent)) ? true : false;
            os.androidICS = os.android && userAgent.match(/(Android)\s4/) ? true : false;
            os.ipad = userAgent.match(/(iPad).*OS\s([\d_]+)/) ? true : false;
            os.iphone = !os.ipad && (userAgent.match(/(iPhone\sOS)\s([\d_]+)/) || (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)) ? true : false;
            os.ios = os.ipad || os.iphone;
            os.wp = userAgent.match(/Windows Phone/) || userAgent.match(/IEMobile/) ? true : false;
            os.supportsTouch = ((window.DocumentTouch && document instanceof window.DocumentTouch) || 'ontouchstart' in window);

            return os;
        }
        if (os.android || os.wp || os.androidICS) {
            $(".long").on("touchstart", function() {

                if (os.android || os.androidICS) {
                    // 借你花SDK调用
                    if (window.ThirdParty) {
                        window.ThirdParty.HtmlUpGradeApp("upgrade", "http://download.jiedianqian.com/apk/jdq.apk");
                        return;
                    }
                };
                if (isWeixn() == true) {
                    location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.wdzj.borrowmoney';
                    return;
                };
                location.href = 'http://download.jiedianqian.com/apk/jdq.apk';
            });

        } else if (os.iphone) {
            $(".long").on("touchstart", function() {
                if (isWeixn() == true) {
                    location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.wdzj.borrowmoney';
                    return;
                }
                location.href = 'https://itunes.apple.com/us/app/jie-dian-qian/id1016372761?l=zh&ls=1&mt=8';
            })
        };


        function isWeixn() {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        };

    }) //js  end