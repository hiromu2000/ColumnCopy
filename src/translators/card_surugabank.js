/*
{
    "target": "^https://card\\.surugabank\\.co\\.jp",
    "account_name": "card_surugabank_co_jp"
}
*/

function parse(rows) {
    var trans = []; 
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (row.length != 7) continue;
        var date = moment(row[1].replace(/\s/g, ''), 'YYYY年M月D日').format('YYYY-MM-DD');

        var name = row[2];
        var amount = parseInt(row[3].replace(/[,\s円]/g, ''));
        if (row[0].search(/ご利用/) != -1){
            amount *= -1;
        }
        var memo = '';
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }   
    return trans;
}
