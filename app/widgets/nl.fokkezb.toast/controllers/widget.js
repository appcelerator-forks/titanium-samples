(function constructor(args) {
  if (OS_ANDROID) {
      Ti.UI.createNotification({
          message : args.message,
          duration: Ti.UI.NOTIFICATION_DURATION_SHORT
      }).show();

  } else {
	$.label.text = "    " + args.message + "               ";
    $.window.open();

    show();
  }

})(arguments[0] || {});

function show(e) {
    // enterAnimation defined in TSS
    $.window.animate({
      duration : 250,
      opacity : 1,
      bottom : 100
    });

    // set a timeout to hide and close
    setTimeout(hide, 2500);
}

function hide(e) {
  // exitAnimation defined in TSS
  $.window.animate({
      duration : 150,
      opacity : 0,
      transform : Ti.UI.create2DMatrix({scale:0.9})

  }, function(e) {
      $.window.close();
  });
}
