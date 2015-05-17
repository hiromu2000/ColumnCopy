/*
{
    "target": "^https://netanswerplus\\.saisoncard\\.co\\.jp",
    "account_name": "saisoncard_co_jp"
}
*/

function parse(rows) {
    var trans = []; 
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var date = moment(row[0], "YYYY/MM/DD").format('YYYY-MM-DD');
        var name = row[1];
        var memo = '';
        var amount = parseInt(row[4].replace(/[,\s円]/g, ''));
        amount *= -1;
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }   
    return trans;
}
