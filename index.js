

let state = "left";
let leftMenu = $(".left-menu")
let leftBrain = $(".left-brain")
let rightMenu = $(".right-menu")
$(".left-menu .menu-item").hover(() => {
    if (state != 'right') {
        returnState();
        return;
    }
    leftBrain.animate({ "width": "50%" }, 300);
    leftMenu.removeClass("f_black");
})

$(".left-menu .menu-item").click(() => {
    if (state == 'none') {
        return;
    }
    leftBrain.animate({ "width": "100%" }, 300);
    rightMenu.removeClass("f_black");
    state = 'left'
});


$(".right-menu .menu-item").hover(() => {
    if (state != 'left') {
        returnState();
        return;
    }
    leftBrain.animate({ "width": "50%" }, 300);
    rightMenu.addClass("f_black");
})

$(".right-menu .menu-item").click(() => {
    if (state == 'none') {
        return;
    }
    leftBrain.animate({ "width": "0%" }, 300);
    leftMenu.addClass("f_black");
    state = 'right';
});

$(".branner").mouseout(returnState);
function returnState() {
    switch (state) {
        case "left":
            leftBrain.animate({ "width": "100%" }, 300);
            break;
        case "right":
            leftBrain.animate({ "width": "0%" }, 300);
            break;
        case "none":
            return;
    }
}

$.fn.fixedDiv = function (actCls) {
    let that = $(this),
        offsetTop = that.offset().top,
        scrollTop;
    let height = that.height();
    let new_div = $(document.createElement("div"));
    new_div.css("height", height + "px");
    new_div.hide();
    new_div.insertBefore(that);
    function fix() {
        scrollTop = $(document).scrollTop();
        if (scrollTop > offsetTop) {
            that.addClass(actCls);
            new_div.show();
            $(".menu-item").css("color", "white");
        } else {
            that.removeClass(actCls);
            new_div.hide();
            $(".menu-item").css("color", "");
        }
    }
    fix();
    $(window).scroll(fix);
}

$('.menu-div').fixedDiv('fix-menu');

let weixin = document.getElementById("weixin");
let erweima = document.getElementById("erweima");
let weixinShow = false;
weixin.addEventListener("click", (e) => {
    if (!weixinShow) {
        erweima.style.display = ""
        erweima.removeClass("scale-rev")
        erweima.addClass("scale");
        weixinShow = true;
    } else {
        erweima.removeClass("scale")
        erweima.addClass("scale-rev");
        weixinShow=false;
        erweima.addEventListener('webkitAnimationEnd', function () {
            if (!weixinShow) {
                erweima.style.display = "none"
            }

        }, false);
    }
})
