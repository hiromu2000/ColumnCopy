function parse(rows, db, account_id) {
    rows.splice(0,1);
    (function nextRecord() {
        do {
            var row = rows.shift();
        } while (row.length != 7); 
        if (row) {
            var re2 = /(\d+)年\s*(\d+)月\s*(\d+)日/;
            var m = re2.exec(row[1]);
            var year = m[1];
            var month = m[2];
            var day = m[3];
            // Zero-padding
            month = ( "0" + month ).slice( -2 );
            day = ( "0" + day ).slice( -2 );
            var date = year + "-" + month + "-" + day;

            var name = row[2];
            var amount = parseInt(row[3].replace(/[,\s円]/g, ''));
            if (row[0].search(/ご利用/) != -1){
                amount *= -1;
            }
            var memo = '';
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
