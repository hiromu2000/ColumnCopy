/*
{
    "target": "^https://direct11\\.bk\\.mufg\\.jp",
    "account_id": 1,
    "tablename": "bk_mufg_jp"
}
*/

function parse(rows) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
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
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }
    return trans;
}
