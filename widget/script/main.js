; (function () {
    function stampToDate(timestamp, plushour) {
        var getDate;
        try {
            if (typeof timestamp !== 'number') {
                timestamp = Number(timestamp);
            }
            if (!timestamp) {
                throw new Error('num error');
            }
            getDate = new Date(timestamp);
        } catch (e) {
            return '-- -- --'
        }
        var year = getDate.getFullYear();
        var month = getDate.getMonth() + 1;
        month = month < 10 ? ('0' + month) : month;
        var day = getDate.getDate();
        day = day < 10 ? ('0' + day) : day;
        var hour = getDate.getHours();
        hour = hour < 10 ? ('0' + hour) : hour;
        var minute = getDate.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        if (plushour) {
            return year + '-' + month + '-' + day + ' ' + hour + '-' + minute;
        } else {
            return year + '-' + month + '-' + day;
        }
    }

    $('[data-timestamp]').each(function () {
        var timestamp = $(this).data('timestamp');
        var dateType = stampToDate(timestamp);
        $(this).text(dateType);
    });
    $('[data-timestamphour]').each(function () {
        var timestamp = $(this).data('timestamphour');
        var dateType = stampToDate(timestamp, true);
        $(this).text(dateType);
    });

    // 首页返回顶部
    // 下拉动画
    function testAnim(x) {
        $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass();
        });
    };
    $('.menu').click(function () {
        if ($('.showMenu').hasClass('showed')) {
            $('.box').addClass('fadedown-leave').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).attr('style', 'display:none').removeClass('fadedown-leave');
            });
            $('.showMenu').attr('style', 'display:none').removeClass('showed');
        } else {
            $('.box').addClass('fadedown-enter').attr('style', 'display:block').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass('fadedown-enter');
            });
            $('.showMenu').attr('style', '').addClass('showed');
        }
    });
    $('.bg-box').click(function () {
        $('.box').addClass('fadedown-leave').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).attr('style', 'display:none').removeClass('fadedown-leave');
        });
        $('.showMenu').attr('style', 'display:none').removeClass('showed');
    });
    $('.public-top').click(function () {
        window.scrollTo(0, 0);
    });
    $('.close-ban').click(function () {
        $('.public-divide').hide();
        $('.mainWrap').removeClass('pad');
    });
    $('.kefu').click(function () {
        $('#public-service').attr('style', '');
    });
    $('.public-main-box-icons,.public-mask-dark').click(function () {
        $('#public-service').attr('style', 'display:none');
    });

    // 第三方跳转页面控制
    // IFRAME链接
    var params = function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var theframe = $('#theframe');
    if (theframe.length) {
        var minusHeight = $('.header_back').height();
        theframe.attr('src', params('frameAdress'));
        theframe.attr('height', document.documentElement.clientHeight - minusHeight);
        theframe.attr('width', document.documentElement.clientWidth);
        $(window).on('resize', function () {
            theframe.attr('height', document.documentElement.clientHeight - minusHeight);
            theframe.attr('width', document.documentElement.clientWidth);
        });
        $('.for_frame').css({
            'padding-top': minusHeight
        });
    }
    $('#fromback').click(function () {
        var back_url = Cookies.get('backup_url');
        if (back_url) {
            window.location.href = back_url;
        } else {
            window.history.back();
        }
    });
    // 跳转微信部分处理
    var clipboard = new Clipboard('.weixinbox .right', {
        text: function () {
            return 'jiedianqianwfh';
        }
    });
    $('.sec.more').find('.list').eq(0).on('click', function () {
        $('.weixinpop,.weixinbox').attr('style', 'display:block');
    });
    $('.weixinbox .left').click(function () {
        $('.weixinpop,.weixinbox').attr('style', 'display:none');
    });
    $('.weixinbox .right').click(function () {
        $('.weixinpop,.weixinbox').attr('style', 'display:none');
        window.location.href = 'weixin://';
    });

    // 芝麻信用登录处理
    $('.onelogo').find('.title').each(function () {
        if (this.innerText.indexOf('芝麻') !== -1) {
            var sessionId = Cookies.get('name');
            if (sessionId) {
                $(this).parent().attr('href', $(this).parent().attr('href') + '?sessionId=' + sessionId);
            } else {
                $(this).parent().attr('href', '/index.html#!/recommendValid');
            }
        };
    })
} ());


