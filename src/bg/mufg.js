function parse(rows, db, account_id) {
    rows.splice(0,1);
    (function nextRecord() {
        var row = rows.shift();
        if (row) {
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
