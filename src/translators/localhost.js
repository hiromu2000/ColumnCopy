/*
{
    "target": "^http://localhost",
    "account_id": 99,
    "tablename": "localhost"
}
*/

function parse(rows) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var re2 = /(\d+)\/(\d+)\/(\d+)/;
        var m = re2.exec(row[0]);
        var year = m[1];
        var month = m[2];
        var day = m[3];
        var date = year + "-" + month + "-" + day;
        var name = row[2];
        var memo = '';
        var amount = parseInt(row[1].replace(/[,\s円]/g, ''));
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }
    return trans;
}
