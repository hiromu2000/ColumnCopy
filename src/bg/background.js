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
    /*
    $.getScript( "test.js", function(script, url) {
        var hoge = test( url );
        alert(hoge.msg);
    }
    );
    */
    var m = url.match(/^https?:\/\/([^/]+)/);
    var account_id, tablename, script;
    if (url.search(/mufg/) != -1){
        account_id = 1;
        tablename = 'bk_mufg_jp';
        script = 'mufg.js';
    } else if (url.search(/mizuhobank/) != -1){
        account_id = 2;
        tablename = 'mizuhobank_co_jp';
        script = 'mizuhobank.js';
    } else if (url.search(/ib\.surugabank/) != -1){
        account_id = 3;
        tablename = 'ib_surugabank_co_jp';
        script = 'ib_surugabank.js';
    } else if (url.search(/card\.surugabank/) != -1){
        account_id = 4;
        tablename = 'card_surugabank_co_jp';
        script = 'card_surugabank.js';
    } else if (url.search(/saisoncard/) != -1){
        account_id = 5;
        tablename = 'saisoncard_co_jp';
        script = 'saisoncard.js';
    } else {
        account_id = 99;
        tablename = m[1].replace(/\./g, '_');
        script = 'localhost.js';
    }
    var db = openDB(); 
    db.transaction( 
        function(trans){ 
            trans.executeSql(
                'CREATE TABLE IF NOT EXISTS accounts'
                + ' (account_id INTEGER PRIMARY KEY,'
                + ' name TEXT NOT NULL);'
            );
            trans.executeSql(
                'INSERT INTO accounts (account_id, name) VALUES (?, ?)'
                , [account_id, tablename]
            );
            trans.executeSql(
                'CREATE TABLE IF NOT EXISTS trans'
                + ' (date DATE NOT NULL,'
                + ' name TEXT NOT NULL,' 
                + ' memo TEXT,'
                + ' amount INTEGER NOT NULL,'
                + ' account_id INTEGER NOT NULL);'
            );
        }
    );
    $.getScript( script, function() {
        parse( rows, db, account_id );
    });
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
