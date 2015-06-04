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

function registerAccount(account_name) {
    var db = openDB(); 
    db.transaction( 
        function(tx){ 
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS accounts'
                + ' (account_id INTEGER PRIMARY KEY AUTOINCREMENT,'
                + ' name TEXT NOT NULL);'
            );
            tx.executeSql(
                'INSERT INTO accounts (name) VALUES (?)'
                , [account_name]
            );
        }
    );
}

function insertData(url, rows){ 
    chrome.runtime.getPackageDirectoryEntry(function(root) {
        root.getDirectory("/crxfs/translators/", {create: false}, function(dirEntry) {
            var dirReader = dirEntry.createReader();
            var readEntries = function() {
                dirReader.readEntries (function(results) {
                    if (!results.length) {
                        return;
                    } else {
                        for (var i = 0; i < results.length; i++){
                            var fileEntry = results[i];
                            fileEntry.file(function(file) {
                                var reader = new FileReader();
                                reader.onloadend = function(e) {
                                    if (/^[\/]/.test(this.result)) {
                                        var m = /\/\*([\S\s]*?)\*\//.exec(this.result);
                                        var metadata = JSON.parse(m[1]);
                                        var re = new RegExp(metadata.target);
                                        if (re.test(url)) {
                                            var account_id = metadata.account_id;
                                            var account_name = metadata.account_name;
                                            registerAccount(account_name);
                                            translate(rows, metadata);
                                        }
                                    }
                                };
                                reader.readAsText(file);
                            });
                        }
                        readEntries();
                    }
                });
            };
            readEntries();
        });
    });
}

function translate(rows, metadata) {
    var script = metadata.account_name + ".js";
    var account_name = metadata.account_name;
    if (metadata.custom) {
        script = '../../translators/' + script;
    } else {
        script = '../../translators/default.js';
    }
    $.getScript(script, function() {
        var trans = parse(rows, metadata);
        insert(trans, account_name);
    });
}

function insert (trans, account_name) {
    var db = openDB(); 
    db.transaction(
        function(tx){ 
            tx.executeSql(
                'SELECT * FROM accounts where name="'
                + account_name
                + '";', [], function(tx, result){
                    var row = result.rows.item(0);
                    var account_id = row.account_id;
                    tx.executeSql(
                        'CREATE TABLE IF NOT EXISTS trans'
                        + ' (date DATE NOT NULL,'
                        + ' name TEXT NOT NULL,' 
                        + ' memo TEXT,'
                        + ' amount INTEGER NOT NULL,'
                        + ' account_id INTEGER NOT NULL);'
                    );
                    for (var i = 0; i < trans.length; i++) {
                        var tran = trans[i];
                        tx.executeSql('INSERT INTO trans'
                            + ' (date, name, memo, amount, account_id) ' 
                            + 'VALUES (?, ?, ?, ?, ?);'
                            , [tran.date, tran.name, tran.memo, tran.amount, account_id]
                        );
                    }
                }
            );
        }
    );
}

var contexts = {
    /*
      copyColumn: chrome.contextMenus.create({
        'title': 'Copy this column',
        'contexts': ['all'],
        'onclick': handleContextMenuClick
      }),
      */
      copyTable: chrome.contextMenus.create({
        'title': 'Copy transaction table',
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
