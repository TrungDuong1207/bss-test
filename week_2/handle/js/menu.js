function checkWidth() {
    var windowSize = $(window).width();
    if (windowSize < 415) {
        $(".sidebar").hide();
        $(".header").hide();
        $(".sidebar-btn").show();
    } else {
        $(".sidebar").show();
        $(".header").show();
        $(".sidebar-btn").hide();
    }
}

$(window).resize(checkWidth);
checkWidth();

$(document).ready(function () {
    $(".sidebar-btn").click(function () {
        $(".cover").show();
        $(".sidebar").fadeToggle(1000);
        $(".header").fadeToggle(1000);
        $(".header").css({ "display": "flex", "justify-content": "center" });
        $(this).hide(); // ẩn đi nút sidebar-btn
    });

    $(".cover").click(() => {
        $(".sidebar").hide(500);
        $(".header").hide(500);
        $(".sidebar-btn").show(1000);
        $(".cover").hide();
    });

    $('.drop-down').click(function () {
        $('.sub-menu').toggle();

    });

});

