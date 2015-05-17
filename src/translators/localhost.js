/*
{
    "target": "^http://localhost",
    "account_name": "localhost"
}
*/

function parse(rows) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var date = moment(row[0], "YYYY/MM/DD").format('YYYY-MM-DD');
        var name = row[2];
        var memo = '';
        var amount = parseInt(row[1].replace(/[,\s円]/g, ''));
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }
    return trans;
}
