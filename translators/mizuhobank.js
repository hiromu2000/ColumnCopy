/*
{
    "target": "https://web[0-9]\\.ib\\.mizuhobank\\.co\\.jp",
    "account_name": "mizuhobank_co_jp",
    "custom": true
}
*/

function parse(rows) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {            
        var row = rows[i];
        var date = moment(row[0], 'YYYY.MM.DD').format('YYYY-MM-DD');

        if (row[1].search(/円/) != -1) {
            var m = /([\d,]+)\s円/.exec(row[1]);
            var amount = parseInt(m[1].replace(/[,\s]/g, '')) * -1;
        } else {
            var m = /([\d,]+)\s円/.exec(row[2]);
            var amount = parseInt(m[1].replace(/[,\s]/g, ''));
        }
        var name = row[3];
        var memo = "";
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }   
    return trans;
}
