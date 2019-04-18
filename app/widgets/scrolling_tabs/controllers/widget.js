/**
 * Controller: Widget.js
 * @To create segmented controles.
 * @author Bhushan
 */

/**
 * Global variables scoped within this JS file.
 */

var segmentsLabelColor,
    selectedsegmentsLabelColor,
    segmentsBackroundColor,
    selectedSegmentsBackroundColor,
    borderColor,
    horizontalLineColor,
    widgetType,
    segmetWidth,
    labelFontSize,
    itemsLength;

var segmetArray = new Array();
var segmentsSingleTab;

/**
 * @function: initSegmentedControl
 * @description:Initializing the segmented control widget.
 * @arguments:
 * 				segmentsList - Array of segmented controles
 *              eventListener - exported event listner to listen event of segment control
 *              UIproperties - styling of  segment control
 */
exports.initSegmentedControl = function(segmentsList, eventListener, UIproperties) {
	Ti.API.trace("[SEGMENTED_CONTROL] >>> [initSegmentedControl]");

	if (UIproperties) {
		borderColor = UIproperties.borderColor;
		segmentsBackroundColor = UIproperties.bgColor;
		selectedSegmentsBackroundColor = UIproperties.selectedBgColor;
		segmentsLabelColor = UIproperties.labelColor;
		selectedsegmentsLabelColor = UIproperties.selectedsegmentsLabelColor;
		labelFontSize = UIproperties.labelFontSize;
		horizontalLineColor = UIproperties.horizontalLineColor;
		widgetType = UIproperties.widgetType;
		segmetWidth = UIproperties.segmentsWidth;
		itemsLength = segmentsList.length;
	}

	if (widgetType == "scrollingFlatSegments") {
		var segmentLength = calculateSegmentedViewWidth(segmentsList) + "dp";
		if (segmentLength) {
			$.segmentedView.width = segmentLength;
		}

	}

	segmentsSingleTab = eventListener;
	setupSegmentedControl(segmentsList);

	if (segmetArray.length != 0) {
		activeTab = segmetArray[0];
		selectTab(activeTab);
	}
};

/**
 * @function: getSegmentsArray
 * @description:Returning the Segemts  array .
 * @arguments:No arguments needed
 * @return:  segmetArray -Array of segmets
 */

exports.getSegmentsArray = function() {
	Ti.API.trace("[SEGMENTED_CONTROL] >>> [getSegmentsArray]");

	return segmetArray;
};

/**
 * @function: setupSegmentedControl
 * @description:Receiving data in the form of JSON from controller and assigning it to the controls in the widget.
 * @arguments:
 *             segmentsList - Array of segmented controles
 *
 */

function setupSegmentedControl(segmentsList) {
	Ti.API.trace("[SEGMENTED_CONTROL] >>> [setupOptionHeader]");

	if (segmentsList.length <= 1) {
		$.contentView.remove($.segmentedView);
		return;
	}
	var segmentsWidth = (100 / (segmentsList.length ) ) + "%";

	for (var i = 0; i < segmentsList.length; ++i) {

		if (widgetType != "scrollingFlatSegments") {
			var segment = createsegment();
			segment.customId = i;
			if (i == segmentsList.length - 1)
				segmentsWidth = Ti.UI.FILL;
		} else {
			var segment = createsegment(segmentsList[i]);
			segment.customId = i;
		}

		tabOperations(segment, segmentsWidth, segmentsList[i]);
	}
}//end of setupOptionHeader

/**
 * @function: tabOperations
 * @description:function to setup header option tab and binding event to them.
 * @arguments:
 *             segment - single tab of segmented control
 * 			   segmentsWidth  - width of segmented control
 * 			   text      - text of tab
 */
function tabOperations(segment, segmentsWidth, text) {
	Ti.API.trace("[SEGMENTED_CONTROL] >>> [setupOptionHeader] >>> [inner] >>> [tabOperations]");

	if (widgetType == "scrollingFlatSegments") {
		segmentsWidth = (text.length * 6 + 10) + "dp";
	}

	segment.width = segmentsWidth;
	segment.getChildren()[0].text = text;
	segment.addEventListener("singletap", segmentsSingleTab);
	segmetArray.push(segment);
	$.segmentedView.add(segment);
}//end of tabOperations

function calculateSegmentedViewWidth(list) {
	Ti.API.trace("[SEGMENTED_CONTROL] >> [calculateSegmentedViewWidth]");

	var width = 0;
	for (var i = 0; i < list.length; i++) {
		width = width + list[i].length * 6 + 10;
	};
	return width;
}

/**
 * @function: createsegment
 * @description: creates segments and returns segment
 * @arguments: No arguments
 */
function createsegment() {
	Ti.API.trace("[SEGMENTED_CONTROL] >>> [createFooterView]");

	var segment = Ti.UI.createView();
	var optionDescLabel = Ti.UI.createLabel();
	$.addClass(optionDescLabel, "segmentLabelClass");
	optionDescLabel.font = {
		fontSize : labelFontSize || "14sp",
		fontWeight : 'normal'
	};

	if (segmentsLabelColor) {
		optionDescLabel.color = segmentsLabelColor;
	}
	var horizontalLineView = Ti.UI.createView();

	if (widgetType == "borderSegment") {
		$.segmentedView.borderColor = borderColor || "white";
		$.segmentedView.borderRadius = "5";
		$.segmentedView.borderWidth = "1dp";
		$.addClass(horizontalLineView, "segmentVerticalLineViewClass");
		horizontalLineView.backgroundColor = borderColor;
	} else if (widgetType == "flatSegment") {
		$.addClass(horizontalLineView, "segmentHorizontalLineViewClass");
		horizontalLineView.backgroundColor = horizontalLineColor;
	} else if (widgetType == "scrollingFlatSegments") {
		$.scrollView.scrollingEnabled = true;
		$.addClass(horizontalLineView, "segmentHorizontalLineViewClass");
		horizontalLineView.backgroundColor = horizontalLineColor;

	}

	segment.add(optionDescLabel);
	segment.add(horizontalLineView);

	return segment;

}//end of createsegment

/**
 * @function: selectTab
 * @description:function will select the tab i.e current active tab
 * @arguments:
 *             activeTab- Current active tab
 */
function selectTab(activeTab) {
	Ti.API.trace("[SEGMENTED_CONTROL] >>> [selectTab]");

	for ( i = 0; i < segmetArray.length; ++i) {
		if (_.isNumber(activeTab.customId)) {
			if (activeTab.customId != i) {

				if (widgetType == "borderSegment") {
					segmetArray[i].backgroundColor = segmentsBackroundColor || "white";
					segmetArray[i].getChildren()[0].color = segmentsLabelColor || "#00a38a";
				} else if (widgetType == "flatSegment") {

					segmetArray[i].getChildren()[1].visible = false;
					segmetArray[i].getChildren()[0].font = {
						"fontSize" : "14sp",
						"fontWeight" : 'normal'
					};
				} else if (widgetType == "scrollingFlatSegments") {
					segmetArray[i].getChildren()[1].visible = false;
					segmetArray[i].getChildren()[0].font = {
						"fontSize" : "14sp",
						"fontWeight" : 'normal'
					};
				}

			} else {

				if (widgetType == "borderSegment") {
					segmetArray[i].backgroundColor = selectedSegmentsBackroundColor || "#00a38a";
					segmetArray[i].getChildren()[0].color = selectedsegmentsLabelColor || "white";
				} else if (widgetType == "flatSegment") {
					segmetArray[i].getChildren()[1].visible = true;
					segmetArray[i].getChildren()[0].font = {
						"fontSize" : "14sp",
						"fontWeight" : 'bold'
					};
				} else if (widgetType == "scrollingFlatSegments") {
					if (arguments[1]) {
						var segmentedWidth = $.segmentedView.getwidth().slice(0, $.segmentedView.getwidth().indexOf("dp"));

						if (getscrollWidth(i) < segmentedWidth - getscrollWidth(2)) {
							(function() {
								if (i < itemsLength - 3) {
									var scrollvalue = i == itemsLength - 4 ? getscrollWidth(i) - 5 : getscrollWidth(i);
									$.scrollView.scrollTo(scrollvalue, 0);
								}

							})();
						}

					}
					segmetArray[i].getChildren()[1].visible = true;
					segmetArray[i].getChildren()[0].font = {
						"fontSize" : "14sp",
						"fontWeight" : 'bold'
					};
				}

			}
		}

	}
}//end of selectTab

function getscrollWidth(index) {

	var widthtoScroll = 0;
	for (var i = 0; i < index; i++) {

		widthtoScroll = widthtoScroll + Number(segmetArray[i].width.slice(0, segmetArray[i].width.indexOf("dp")));
	};
	return widthtoScroll;
}

/**
 * @function: equal
 * @description:not so simple check for object equality
 * @arguments:
 *             a- Object 1st to compare with another object
 *             b- Object 2nd to compare with another object
 */

var equal = function(a, b) {
	function check(a, b) {
		for (var attr in a) {
			if (a[attr] != b[attr]) {
				switch (a[attr].constructor) {
				case Object:
					return equal(a[attr], b[attr]);
				case Function:
					if (a[attr].toString() != b[attr].toString()) {
						return false;
					}
					break;
				default:
					return false;
				}
			}
		}
		return true;
	};
	return check(a, b) && check(b, a);
};
/**
 * @function: selectTabFromController
 * @description:exported function to select tab
 * @arguments:
 *             selectedTab : tab to select
 */

exports.selectTabFromController = function(selectedTab, ScrollEnabled) {
	//selectedTab = segmetArray[selectedTab];
	if (widgetType == "scrollingFlatSegments") {
		selectTab(selectedTab, ScrollEnabled);
	} else {
		selectTab(selectedTab);
	}
};

