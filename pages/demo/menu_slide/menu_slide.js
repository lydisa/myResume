$(document).ready(function () {
    /**首页面板portal**/
    var mainPortal = new MainPortal();
    mainPortal.initPortal();
});

var MainPortal = {};
/**首页面板portal**/
var MainPortal = function () {

    /**portal加载初始化**/
    this.initPortal = function () {
        /**个性化菜单的事件**/
        MainPortal.portalEvent();
        /**配置的panels信息**/
        MainPortal.portalPanelsData();
    };

    /**个性化菜单的事件**/
    MainPortal.portalEvent = function () {
        var changing = false;
        var firstMenu = $(".box span").eq(0);
        var firstBtn = $(".my_menu_btn a").eq(0);
        var secondBtn = $(".my_menu_btn a").eq(1);
        var btnSlider = $(".my_menu_btn a").eq(2);
        var leftBtn = $(".side_left");
        var rightBtn = $(".side_right");

        leftBtn.hide();

        $('#portals_first_menu_btn').click(function () {
            showFirst();
        });

        $('#portals_second_menu_btn').click(function () {
            showSecond();
        });
        rightBtn.click(function () {
            showSecond();
        });
        leftBtn.click(function () {
            showFirst();
        });

        function showSecond() {
            if (changing || secondBtn.hasClass("on")) {
                return;
            }
            firstBtn.removeClass("on");
            btnSlider.css("left", firstBtn.offset().left + "px");
            btnSlider.css("display", "");
            changing = true;
            firstMenu.animate({ "margin-left": "-100%" });
            btnSlider.animate({ "left": secondBtn.offset().left + "px" }, function () {
                secondBtn.addClass("on");
                btnSlider.hide();
                changing = false;
            });
            leftBtn.show();
            rightBtn.hide();
        }
        function showFirst() {
            if (changing || firstBtn.hasClass("on")) {
                return;
            }
            secondBtn.removeClass("on");
            btnSlider.css("left", secondBtn.offset().left + "px");
            btnSlider.css("display", "");
            changing = true;
            firstMenu.eq(0).animate({ "margin-left": "0" });
            btnSlider.animate({ "left": firstBtn.offset().left + "px" }, function () {
                firstBtn.addClass("on");
                btnSlider.hide();
                changing = false;
            });
            leftBtn.hide();
            rightBtn.show();
        }
    };

    /**配置的panels信息**/
    MainPortal.portalPanelsData = function () {
        /**获取个性化菜单数据**/
        MainPortal.createPortalMenuDiv(0, $('#portals_first_menu_ul'));
        MainPortal.createPortalMenuDiv(1,$('#portals_second_menu_ul'));
    };

    /**生成第一个TABDIV菜单**/
    MainPortal.createPortalMenuDiv = function (tabNum,$div) {
        var portals_menu_ul_li = '';
        for (var j = 0; j < 15; j++) {
            if (j < 5) {
                rowNum = 1;
            } else if (j < 10) {
                rowNum = 2;
            } else {
                rowNum = 3;
            }
            columnNum = j;
            portals_menu_ul_li += '<li><div id="div_'+tabNum + rowNum + columnNum + '" class="index_css_cursor" numVal="1" row="' + rowNum + '" column="' + columnNum  + '" tabNum="'+ tabNum +'" onclick="MainPortal.addMenu(this)"><span><h4><a href="javascript:;"><p>添加菜单</p></a></h4></span></div></li>';
            $div.html(portals_menu_ul_li);
        }
    };

    /**删除菜单**/
    MainPortal.deleteMenu = function (e) {
        var itemId = e.getAttribute("itemId");
        var rowNum = e.getAttribute("row");
        var columnNum = e.getAttribute("column");
        var tabNum = e.getAttribute("tabNum");
        $('#div_' + tabNum+rowNum + columnNum).html('<span><h4><a href="javascript:;"><p>添加菜单</p></a></h4></span>');
        setTimeout(function () {
            $('#div_' +tabNum+ rowNum + columnNum).attr("onclick", "MainPortal.addMenu(this)");
        }, 300);

        $('#div_' + tabNum+rowNum + columnNum).addClass("index_css_cursor");
        $('#div_' + tabNum+rowNum + columnNum).removeClass("img1");

    };


    /**新建菜单**/
    MainPortal.addMenu = function (e) {
        var rowNum = e.getAttribute("row");
        var columnNum = e.getAttribute("column");
        var numVal = e.getAttribute("numVal");
        var itemBooth = e.getAttribute("itemBooth");
        var tabNum = e.getAttribute("tabNum");
        var url = "target.jsp";
        var title = "添加菜单";
        var width = 600;
        var height = 500;
        var toData = null;
        var html_div ="";
        var itemId= 0;
        var itemName = "新菜单";
        html_div += '<span  '+ '" id="span_' + itemId + '" >';
        html_div += '<h4><a  id="' + itemId + '" name="' + itemName + '" url="' + url   + '" onclick="MainPortal.panelsColumnContentCreateTapEvent(this)" href="javascript:;" ><p>' + itemName + '</p></a>';
        html_div += '</h4><em class="menuClose" id="em_' + itemId + '" itemId="' + itemId + '" row="' + rowNum + '" column="' + columnNum +  '" tabNum="' + tabNum +'" onclick="MainPortal.deleteMenu(this)"></em></span>';
        $('#div_' + tabNum+rowNum + columnNum).html(html_div);
        $('#div_' + tabNum+rowNum + columnNum).removeAttr("onclick");
        $('#div_' + tabNum+rowNum + columnNum).removeClass("index_css_cursor");
        $('#div_' + tabNum+rowNum + columnNum).addClass("img1");
    };


    /**portal column内容注册事件**/
    MainPortal.panelsColumnContentCreateTapEvent = function (e) {
        alert("打开菜单！");
    };
};
