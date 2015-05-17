/*
{
    "target": "^https://direct11\\.bk\\.mufg\\.jp",
    "account_name": "bk_mufg_jp",
    "custom": true
}
*/

function parse(rows) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var date = moment(row[0], 'YYYY年M月D日').format('YYYY-MM-DD');

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
