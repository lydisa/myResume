$(function () {
    alert("test");
    $.getJSON("menu.json", function (data) {
        var menu = new Menu(data);
        menu.init();
    });

    var Menu = {};
    var Menu = function (data) {
        var seleted = null;
        /**菜单初始化**/
        this.init = function () {
            Menu.createMenuItems(data);
            Menu.addMenuEvents();
            $('.nav_tab').css('maxHeight', $('.side_nav').height() - 40);
        }

        /**插入一级菜单**/
        Menu.createMenuItems = function (data) {
            //插入第一级菜单
            var first = $('.side_nav .first');
            for (var i = 0; i < data.length; i++) {
                var img = data[i].sub? "<img src='../../../imgs/icon_right.png' alt='' />":""
                first.append("<li> <i class='icon " + data[i].icon + "'></i> <a href=''>" + data[i].name +
                    "</a><i class='icon_right'>" + img + "</i>")
            }
        }
        /**菜单事件**/
        Menu.addMenuEvents = function () {
            Menu.addFirstMenuEvents();
            Menu.addSubMenuEvents();
            $('.menu_icon span').click(function () {
                $('.menu_icon span').removeClass('menu_off');
                $(this).addClass('menu_on').siblings().removeClass('menu_on').addClass('menu_off');
            });
        }

        Menu.addFirstMenuEvents = function () {
            $('.side_nav .first>li').hover(function (e) {
                //上个选项恢复原来的样式
                $(seleted).css({
                    background: 'none',
                    color: '#fff'
                });
                var index = $(this).index() + 1;
                $(this).css({
                    background: '#fff',
                    color: '#1B1B1B'
                });
                var subMenu = $('#sub_menu');
                subMenu.find('i.icon').addClass('icon-' + index);
                //有二级菜单时显示二级菜单
                if (data[index - 1].sub) {
                    var subMenus = data[index - 1].sub;
                    var second = $('.second2');
                    //清空并生成二级菜单
                    second.empty();
                    for (var i = 0; i < subMenus.length; i++) {
                        if (subMenus[i].isTitle) {
                            second.append("<li class='litit' " + (subMenus[i].href ? "href='" +
                                subMenus[i].href + "'" : "") + ">" + subMenus[i].name + "</li>");
                        } else {
                            second.append("<li><a href='" + subMenus[i].href + "'>" + subMenus[i].name +
                                "</a><i></i></li>");
                        }
                    }
                    //计算二级菜单显示坐标,默认顶部与一级菜单对齐
                    var menuPos = $(this).position();
                    menuPos.top -= 10;
                    subMenu.find('.tabs_con').css('top', menuPos.top);
                    subMenu.find('.tabs_con').css('bottom', '');
                    subMenu.find('.second2').show();
                    var subRect = subMenu.find('.second2').get(0).getBoundingClientRect();
                    var bottom_dis = subRect.bottom - $(window).height();
                    var top_dis = subRect.top;
                    //下边界超出屏幕时
                    if (bottom_dis > 0) {
                        if (top_dis > subMenu.find('.second2').innerHeight()) {
                            //上边界空间足够,设置下边界与菜单对齐
                            subMenu.find('.tabs_con').css('top', -(subMenu.find('.second2').innerHeight() -
                                $(this).innerHeight() - menuPos.top));
                            subMenu.find('.tabs_con').css('bottom', '');
                        } else {
                            //上边界空间不足,设置与菜单居中对齐，且保证上边界不超出屏幕
                            var top_offset = subRect.top - $(this).find('.second2').height() / 2;
                            subMenu.find('.tabs_con').css('top', menuPos.top - $(this).find('.second2')
                                .height() / 2 - top_offset);
                            subMenu.find('.tabs_con').css('bottom', '');
                        }
                    }
                } else {
                    $('#sub_menu').find('.second2').hide();
                }

            }, function () {
                var index = $(this).index() + 1;
                seleted = $(this);
                $(this).find('.second2').hide();
            });
        }
        Menu.addSubMenuEvents = function () {
            $('#sub_menu').hover(function () {
                seleted.css({
                    background: '#fff',
                    color: '#1B1B1B'
                })
                $('#sub_menu').find('.second2').show();
            }, function () {
                seleted.css({
                    background: 'none',
                    color: '#fff'
                });
                $(this).find('.second2').hide();
            })
        }
    }
})