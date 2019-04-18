

var momentLib = require('/alloy/moment');
var TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";


function getDateString(_format, _moment1, _moment2) {
    var resultDate = '';

    if (_moment1 == undefined) {
        resultDate = momentLib().format(_format);

    } else {
        if (_moment2 == undefined) {
            resultDate = momentLib(_moment1).format(_format);

        } else {
            resultDate = momentLib(_moment1, _moment2).format(_format);
        }
    }

    return resultDate;
}

function getUTCDate(_format, _moment1, _moment2) {
    var finalDate = '';

    if (_moment1 == undefined) {
        finalDate = momentLib.utc().format(_format);

    } else {
        if (_moment2 == undefined) {
            finalDate = momentLib.utc(_moment1).format(_format);

        } else {
            finalDate = momentLib.utc(_moment1, _moment2).format(_format);
        }
    }

    return finalDate;
}

function getTimestamp(format) {
    return format == undefined ? getUTCDate(TIMESTAMP_FORMAT) : getUTCDate(format);
}

function setLocale(locale) {
    momentLib.locale(locale);
}


exports.getDateString = getDateString;
exports.getUTCDate = getUTCDate;
exports.getTimestamp = getTimestamp;
exports.setLocale = setLocale;
