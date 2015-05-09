// Bind the context handlers
var dbName = 'Trans';
var version = '1.0';
var displayName = 'Trans';
var estimatedSize = 65536;
function openDB(){ 
    return openDatabase( 
        dbName, 
        version, 
        displayName, 
        estimatedSize
    ); 
}
function insertData(url, rows){ 
    var m = url.match(/^https?:\/\/([^/]+)/);
    var tablename = m[1].replace(/\./g, '_');
    var db = openDB(); 
    db.transaction( 
        function(trans){ 
            trans.executeSql(
                'CREATE TABLE IF NOT EXISTS '
                + tablename 
                + ' (date DATE NOT NULL,'
                + ' name TEXT NOT NULL,' 
                + ' memo TEXT,'
                + ' amount INTEGER NOT NULL);' 
            );
            for (var i = 1; i < rows.length; i++){
                var row = rows[i];
                if (url.search(/mufg/) != -1){
                    // var re = new RegExp("(\d+)年(\d+)月(\d+)日");
                    // var match = re.exec(row[0]);
                    var re2 = /(\d+)年(\d+)月(\d+)日/;
                    var m = re2.exec(row[0]);
                    var year = m[1];
                    var month = m[2];
                    var day = m[3];
                    // Zero-padding
                    month = ( "0" + month ).slice( -2 );
                    day = ( "0" + day ).slice( -2 );
                    var date = year + "-" + month + "-" + day;

                    if (row[1].search(/円/) != -1) {
                        var m = /([\d,]+)円/.exec(row[1]);
                        var amount = parseInt(m[1].replace(',', '')) * -1;
                    } else {
                        var m = /([\d,]+)円/.exec(row[2]);
                        var amount = parseInt(m[1].replace(',', ''));
                    }
                    var name = row[3];
                    var memo = row[5];
                } else if (url.search(/mizuhobank/) != -1){
                    var re2 = /(\d+)\.(\d+)\.(\d+)/;
                    var m = re2.exec(row[0]);
                    var year = m[1];
                    var month = m[2];
                    var day = m[3];
                    var date = year + "-" + month + "-" + day;

                    if (row[1].search(/円/) != -1) {
                        var m = /([\d,]+)\s円/.exec(row[1]);
                        var amount = parseInt(m[1].replace(/[,\s]/g, '')) * -1;
                    } else {
                        var m = /([\d,]+)\s円/.exec(row[2]);
                        var amount = parseInt(m[1].replace(/[,\s]/g, ''));
                    }
                    var name = row[3];
                    var memo = "";
                } else if (url.search(/surugabank/) != -1){
                    if (row.length != 6){
                        continue;
                    }
                    var re2 = /(\d+)\/(\d+)\/(\d+)/;
                    var m = re2.exec(row[0]);
                    var year = m[1];
                    var month = m[2];
                    var day = m[3];
                    var date = year + "-" + month + "-" + day;

                    if (row[1].search(/円/) != -1) {
                        var m = /([\d,]+)円/.exec(row[1]);
                        var amount = parseInt(m[1].replace(/,/g, '')) * -1;
                    } else {
                        var m = /([\d,]+)円/.exec(row[2]);
                        var amount = parseInt(m[1].replace(/,/g, ''));
                    }
                    var name = row[3];
                    var memo = "";
                }
                trans.executeSql('INSERT INTO '
                    + tablename
                    + ' (date, name, memo, amount) ' 
                    + 'VALUES (?, ?, ?, ?)', [date, name, memo, amount]);
            } 
        }
    );
} 

var contexts = {
      copyColumn: chrome.contextMenus.create({
        'title': 'Copy this column',
        'contexts': ['all'],
        'onclick': handleContextMenuClick
      }),
      copyTable: chrome.contextMenus.create({
        'title': 'Copy entire table',
        'contexts': ['all'],
        'onclick': handleContextMenuClick
      }),
    };

function handleContextMenuClick(info, tab) {
  switch (info.menuItemId) {
    case contexts.copyColumn:
      chrome.tabs.sendMessage(tab.id, { columnCopyContextMenuClick: 'copyColumn' });
      break;
    case contexts.copyTable:
      chrome.tabs.sendMessage(tab.id, { columnCopyContextMenuClick: 'copyTable' });
      break;
  }
}

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.toCopy) {
    var textarea = document.getElementById("clipboardBridge");
    textarea.value = message.toCopy;
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
    insertData(sender.url, message.toCopy);
  }
  else if (message.gaTrackEvent) {
    _gaq.push(['_trackEvent', message.gaTrackEvent, message.gaTrackEvent]);
  }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method === 'getOptions') {
    sendResponse({ options: getOptions() });
  }
  else {
    sendResponse({});
  }
});

// GA tracking
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-40331704-1']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
