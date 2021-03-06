document.addEventListener("deviceready", onDeviceReady, false);

var backFunction;

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){
        e.preventDefault();
    });
    
    if (navigator.notification) { // Override default HTML alert with native dialog
        window.alert = function (message) {
            navigator.notification.alert(
                message,    // message
                null,       // callback
                "HospiView", // title
                'OK'        // buttonName
            );
        };
        window.confirm = function(message, callBack){
            navigator.notification.confirm(
                message, 
                callBack, 
                "Hospiview", 
                ["OK","Cancel"]
            );
        };
    }
}

function viewBack(){
    alert(backFunction);
}

/**
 * Adds object to localstorage item. Creates the object if it does not exist.
 * 
 * @param {type} lsKey  key of the localstorage item.
 * @param {type} data   object that needs to be added.
 * @returns {undefined}
 */
function addToLocalStorage(lsKey, data) {
    if (localStorage.getItem(lsKey) !== null) {
        var lsText = localStorage.getItem(lsKey);
        var lsJson = JSON.parse(lsText);
        lsJson.push(data);
        localStorage.setItem(lsKey, JSON.stringify(lsJson));
    }
    else {
        var lsText = JSON.stringify(data);
        var lsJson = JSON.parse(lsText);
        localStorage.setItem(lsKey, JSON.stringify(lsJson));
    }
}

/**
 * Parses the incoming XML string to a JSON object using the xml2sjon library.
 * (/js/xml2json.min.js).
 * 
 * @param {string} xml    
 * @returns             json object
 */
function parseJson(xml) {
    var x2js = new X2JS();
    var json = x2js.xml_str2json(xml);
    return json;
}

/**
 * Parses the JSON object to XML string using the xml2sjon library.
 * (/js/xml2json.min.js).
 * 
 * @param {object} json     
 * @returns             xml string
 */
function parseXml(json) {
    var x2js = new X2JS();
    var xml = x2js.json2xml_str(json);
    return xml;
}

/**
 * Changes the format of a date to yyyy-mm-dd. This format is needed to pass 
 * the date to the webservice. To get the month, we need to add 1 to 
 * date.getMonth() because January is 0;
 * If the day or month has only 1 digit, a zero
 * is added to get a two digit day or month.
 * 
 * @param {type} date       The date as date object.
 * @returns {String}        The date as string in the right format.
 */
function formatDate(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    date = yyyy + '-' + mm + '-' + dd;
    return date;
}

/**
 * 
 * returns a formatted date based on the language ID
 * 
 * @param {type} date
 * @param {type} languageID
 * @returns {Date|String|formatShowDate.newDate}
 */
function formatShowDate(date, languageID) {
    var newDate = new Date(date);
    
    if(languageID===undefined)
        languageID=1;
    
    var dayNames = getDayNames(languageID),
        monthNames = getMonthNames(languageID),
        
    
    
    newDate = dayNames[newDate.getDay()] + " " + newDate.getDate() + " " + monthNames[newDate.getMonth()];
    return newDate;
}

/**
 * returns the names of the days based on the given languageID
 * 
 * @param {type} languageID
 * @returns {Array|String}
 */
function getDayNames(languageID){
    switch(languageID){
        case 1:
            return "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_");
        case 2:
            return "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_");
        case 3:
            return "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_");
    }
}

/**
 * 
 * returns the month names based on the given languageID
 * 
 * @param {type} languageID
 * @returns {array|String}
 */
function getMonthNames(languageID){
    switch(languageID){
        case 1:
            return "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split("_");
        case 2:
            return "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_");
        case 3:
            return "January_February_March_April_May_June_July_August_September_October_November_December".split("_");
    }
}

/**
 * returns the short version of the day based on the given lenguageID
 * 
 * @param {type} languageID
 * @returns {String}
 */
function getDayNamesShort(languageID){
   switch(languageID){
        case 1:
            return "Zo_Ma_Di_Wo_Do_Vr_Za".split("_");
        case 2:
            return "Di_Lu_Ma_Me_Je_Ve_Sa".split("_");
        case 3:
            return "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    } 
}

/**
 * Checks which browser is being used and changes the CSS if it's an Android
 * Browser. Older versions and some recent versions of Android use a different
 * browser then Chrome. This problem won't percist in the future, it looks like
 * devices with Android 4.4 have Chrome as standard browser.
 * 
 * @returns {undefined}
 */
function changeSelect(){
    var nua = navigator.userAgent;
    var is_android = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
    if (is_android) {
        $('select.form-control').css('-webkit-appearance', 'none');
    }
}