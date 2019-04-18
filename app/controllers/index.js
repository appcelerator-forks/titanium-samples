

(function () {
	$.listViewController.listView.addEventListener('itemclick', openWindow);

	$.win.open();
})();


function openWindow(e){
	var window = Alloy.createController(e.itemId).getView();
	OS_IOS ? $.win.openWindow(window) : window.open();
}
