/**
 *
 * jquery alert plugin
 * */
;
(function ($, window, document, undefined) {
    var jQueryAlert = function (ele, opt) {
        this.$element = ele;//alert window元素
        this.defaults = {
            msg: '消息内容',
            btn_ok: true,
            btn_okCancel: false
        };

        this.options = $.extend({}, this.defaults, opt);//用户选项设置
    };

    jQueryAlert.prototype = {
        show: function () {
            var that = this;

            var showMark = function () {
                var mask = $('<div id="global_mark">');
                var width = $(document).width();
                var height = $(document).height();
                mask.css({
                    'filter': 'alpha(opacity=30)',
                    'opacity': '0.3',
                    'background-color': 'grey',
                    'position': 'absolute',
                    'top': '0px',
                    'left': '0px',
                    'z-index': 1001,
                    'width': width,
                    'height': height
                });
                $('body').append(mask);
            };

            var showMsg = function () {
                that.$element.find('h4').html(that.options.msg);
            };

            var showBtns = function () {
                //显示确定按钮
                var showBtnOk = function () {
                    $('#prompt_btnOK').hide();
                    $('#prompt_btnCancle').removeClass('button_gray_b').addClass(function () {
                        if (!$(this).hasClass('button_org_b')) {
                            return "button_org_b";
                        }
                    }).val("确定");
                };

                if (that.options.btn_ok) {//只显示一个确定按钮
                    showBtnOk();
                } else if (that.options.btn_okCancel) {//同时显示确定和取消按钮
                    $('#prompt_btnOK').show();
                    $('#prompt_btnCancle').removeClass('button_org_b').addClass(function () {
                        if (!$(this).hasClass('button_gray_b')) {
                            return "button_gray_b";
                        }
                    }).val("取消");
                } else {//默认显示一个确定按钮
                    showBtnOk();
                }
            };

            showMark();
            showMsg();
            showBtns();

            //设置弹出层位置和样式
            var top = ($(window).height() - this.$element.height()) / 2;
            var left = ($(window).width() - this.$element.width()) / 2;
            var scrollTop = $(document).scrollTop();
            var scrollLeft = $(document).scrollLeft();
            that.$element.css({
                'position': 'absolute',
                'z-index': 1010,
                'top': top + scrollTop,
                'left': left + scrollLeft
            }).show();

            //弹出层按钮事件
            var registeButtonEvent = function () {
                //弹出层 关闭、取消
                $('.close,#prompt_btnCancle').click(function () {
                    $('#global_mark').remove();
                    that.$element.hide();
                });
            };

            registeButtonEvent();
        },
        close: function () {
        }
    };

    $.fn.jQueryAlert = function (options) {
        var jAlert = new jQueryAlert(this, options);
        return jAlert;
    };

})(jQuery, window, document);
