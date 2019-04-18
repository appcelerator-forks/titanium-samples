

var isViewShown = false;
var WINDOW_WIDTH = 0,
    WINDOW_HEIGHT = 0,
    WINDOW_WIDTH_HALF = 0,
    WINDOW_HEIGHT_HALF = 0,
    WINDOW_WIDTH_THIRD_HALF = 0,
    WINDOW_HEIGHT_THIRD_HALF = 0;



function close(e){
    $.win.close();
}

// calculates the current window width in current orientation
// set the width to double to the parent-view of the actual content-view which will be revealed
function getWindowDimensions(e){
    $.win.removeEventListener('postlayout', getWindowDimensions);

    WINDOW_WIDTH = $.win.rect.width;
    WINDOW_HEIGHT = $.win.rect.height;

    WINDOW_WIDTH_HALF = WINDOW_WIDTH / 2;
    WINDOW_HEIGHT_HALF = WINDOW_HEIGHT / 2;

    WINDOW_WIDTH_THIRD_HALF = WINDOW_WIDTH * 1.5;
    WINDOW_HEIGHT_THIRD_HALF = WINDOW_HEIGHT * 1.5;


    // set the reveal's parent-view width & height to double so that it's center can be aligned to the main-window's corners
    // it will give a feel that animation is being started from the defined corner - top/left/right/bottom
    $.revealView.width = 2 * WINDOW_WIDTH;
    $.revealView.height = 2 * WINDOW_HEIGHT;


    // set the reveal-view width/height to the original window's width/height as its parent is now having double width/height
    $.mainView.width = WINDOW_WIDTH;
    $.mainView.height = WINDOW_HEIGHT;
}

function changeAnimationCorner(e) {
    setAnimationCorner(e.rowIndex);
}

// Sets the center for both parent-view and the reveal-view as per the selected corner to reveal
// reveal's parent-view's center is set as per the main parent-view
// reveal's center is set to its parent-view
function setAnimationCorner(corner) {
    switch (corner) {
        case 0:     // center position
            $.revealView.center = undefined;
            $.mainView.center = undefined;
            break;

        case 1:     // top-left position
            $.revealView.center = {'x' : 0, 'y' : 0};
            $.mainView.center = {'x' : WINDOW_WIDTH_THIRD_HALF, 'y' : WINDOW_HEIGHT_THIRD_HALF};
            break;

        case 2:     // top-right position
            $.revealView.center = {'x' : WINDOW_WIDTH, 'y' : 0};
            $.mainView.center = {'x' : WINDOW_WIDTH_HALF, 'y' : WINDOW_HEIGHT_THIRD_HALF};
            break;

        case 3:     // bottom-right position
            $.revealView.center = {'x' : WINDOW_WIDTH, 'y' : WINDOW_HEIGHT};
            $.mainView.center = {'x' : WINDOW_WIDTH_HALF, 'y' : WINDOW_HEIGHT_HALF};
            break;

        case 4:     // bottom-left position
            $.revealView.center = {'x' : 0, 'y' : WINDOW_HEIGHT};
            $.mainView.center = {'x' : WINDOW_WIDTH_THIRD_HALF, 'y' : WINDOW_HEIGHT_HALF};
            break;

        default:
            break;
    }
}

function revealMainView(e){
    isViewShown = !isViewShown;
    $.revealView[isViewShown ? 'show' : 'hide']({'animated':true});
}
