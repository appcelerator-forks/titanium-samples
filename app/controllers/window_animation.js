


function close(e){
    $.win.close();
}

function openWindow(e){
    var win = Alloy.createController('/window_anim').getView();
    win.addSharedElement($.im1, "wowww");
    win.open();
}
