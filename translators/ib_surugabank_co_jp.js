/*
{
    "target": "^https://ib\\.surugabank\\.co\\.jp",
    "account_name": "ib_surugabank_co_jp",
    "custom": true
}
*/

function parse(rows, metadata) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (row.length != 6) continue;
        var date = moment(row[0], "YYYY/MM/DD").format('YYYY-MM-DD');

        if (row[1].search(/円/) != -1) {
            var m = /([\d,]+)円/.exec(row[1]);
            var amount = parseInt(m[1].replace(/,/g, '')) * -1;
        } else {
            var m = /([\d,]+)円/.exec(row[2]);
            var amount = parseInt(m[1].replace(/,/g, ''));
        }
        var name = row[3].trim();
        var memo = "";
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }   
    return trans;
}
