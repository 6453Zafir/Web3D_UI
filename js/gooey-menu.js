/**
 * Created by admin on 2017/5/22.
 */
function reGooey() {
    $(function($) {

        $(".gooey-round").gooeymenu({
            bgColor: "#fe8b6c",
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
                radius: 55
            },
            margin: "small",
            size: 80,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#df7052"
        });
        $(".gooey-h").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "horizontal",
            horizontal: {
                menuItemPosition: "glue",
                direction:"left"
            },
            circle: {
                radius: 90
            },
            margin: "small",
            size: 80,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#df7052"
        });

        $(".gooey-h-l").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "horizontal",
            horizontal: {
                menuItemPosition: "glue",
                direction:"left"
            },
            circle: {
                radius: 90
            },
            margin: "small",
            size: 80,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#df7052"
        });

        $(".gooey-h-s").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "horizontal",
            horizontal: {
                menuItemPosition: "spaced",
                direction: "right"
            },
            circle: {
                radius: 90
            },
            margin: "small",
            size: 80,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#df7052"
        });
        $(".gooey-h-s-l").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "horizontal",
            horizontal: {
                menuItemPosition: "spaced",
                direction: "left"
            },
            circle: {
                radius: 90
            },
            margin: "small",
            size: 80,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#df7052"
        });

        $(".gooey-v").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "vertical",
            vertical: {
                menuItemPosition: "glue",
                direction: "down"
            },
            circle: {
                radius: 90
            },
            margin: "small",
            size: 80,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#df7052"
        });

        $(".gooey-v-u").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "vertical",
            vertical: {
                menuItemPosition: "glue",
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
            hover: "#df7052"
        });

        $(".gooey-v-s").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "vertical",
            vertical: {
                menuItemPosition: "spaced",
                direction: "down"
            },
            circle: {
                radius: 90
            },
            margin: "small",
            size: 80,
            bounce: true,
            bounceLength: "small",
            transitionStep: 100,
            hover: "#df7052"
        });
        $(".gooey-v-s-u").gooeymenu({
            bgColor: "#fe8b6c",
            contentColor: "white",
            style: "vertical",
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
            hover: "#df7052"
        });
    })
}
