/**
 * Created by admin on 2017/5/22.
 */
$(function($) {
    $("#gooey-round").gooeymenu({
        bgColor: "#68d099",
        contentColor: "white",
        style: "circle",
        horizontal: {
            menuItemPosition: "spaced"
        },
        vertical: {
            menuItemPosition: "spaced",
            direction: "up"
        },
        circle: {
            radius: 85
        },
        margin: "small",
        size: 80,
        bounce: true,
        bounceLength: "small",
        transitionStep: 100,
        hover: "#5dbb89"
    });
    $("#gooey-h").gooeymenu({
        bgColor: "#68d099",
        contentColor: "white",
        style: "horizontal",
        horizontal: {
            menuItemPosition: "glue"
        },
        vertical: {
            menuItemPosition: "spaced",
            direction: "up"
        },
        circle: {
            radius: 90
        },
        margin: "small",
        size: 80,
        bounce: true,
        bounceLength: "small",
        transitionStep: 100,
        hover: "#5dbb89"
    });
})