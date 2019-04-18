
(function () {
    var df = Ti.Platform.displayCaps.logicalDensityFactor;

    var w = OS_IOS ? Ti.Platform.displayCaps.platformWidth : Ti.Platform.displayCaps.platformWidth / df;
    var h = OS_IOS ? Ti.Platform.displayCaps.platformHeight : Ti.Platform.displayCaps.platformHeight / df;

    Alloy.Globals.deviceWidth = Math.min(w, h);
    Alloy.Globals.deviceHeight = Math.max(w, h);
})();
