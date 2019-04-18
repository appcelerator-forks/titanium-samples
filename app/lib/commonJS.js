
var loader = Alloy.createWidget("nl.fokkezb.loading");

exports.show = function (_msg) { loader.show(_msg || 'Please wait...');};
exports.hide = function () { loader.hide(); };



function dialog(_msg, _buttons, _callback) {
   if (_buttons === undefined) {
      Alloy.createWidget('nl.fokkezb.toast', { message: _msg, fullscreen: (_callback !== undefined) ? true : false });

   } else {
      var d = Ti.UI.createAlertDialog({
          title: Alloy.CFG.APP_NAME,
          message: _msg,
          ok: 'OK',
          buttonNames : _buttons || ['OK'],
          canceledOnTouchOutside : false
      });
      d.addEventListener('click', _callback);
      d.show();
   }
}

exports.GUID = function generateUUID() {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

exports.GUID32 = function generateUUID() {
    var d = new Date().getTime();

    var uuid = 'xxxxxxxxxxxxxyxxxyxxxxxxxxxxxxxxxxxxxxxxxxxxxxyxxxyxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

exports.showUnderline = function (view, text) {
    view.attributedString = Ti.UI.createAttributedString({
        text: text,
        attributes: [{
            type: Titanium.UI.ATTRIBUTE_UNDERLINES_STYLE,
            value: Ti.UI.ATTRIBUTE_UNDERLINE_STYLE_SINGLE,
            range: [0, text.length]
        }]
    });
};

exports.dialog = dialog;
