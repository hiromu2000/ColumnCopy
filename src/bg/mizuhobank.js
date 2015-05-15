function parse(rows, db, account_id) {
    rows.splice(0,1);
    (function nextRecord() {
        var row = rows.shift();
        if (row) {
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
            db.transaction(function (trans){ 
                    trans.executeSql('INSERT INTO trans'
                        + ' (date, name, memo, amount, account_id) ' 
                        + 'VALUES (?, ?, ?, ?, ?);',
                        [date, name, memo, amount, account_id], nextRecord);
            }); 
        } else {
            return;
        }   
    })();
}
