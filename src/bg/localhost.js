function parse(rows, db, account_id) {
    rows.splice(0,1);
    (function nextRecord() {
        var row = rows.shift();
        if (row) {
            var re2 = /(\d+)\/(\d+)\/(\d+)/;
            var m = re2.exec(row[0]);
            var year = m[1];
            var month = m[2];
            var day = m[3];
            var date = year + "-" + month + "-" + day;
            var name = row[2];
            var memo = '';
            var amount = parseInt(row[1].replace(/[,\s円]/g, ''));
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
