/*
{
    "target": "^https://card\\.surugabank\\.co\\.jp",
    "account_id": 4,
    "account_name": "card_surugabank_co_jp"
}
*/

function parse(rows) {
    var trans = []; 
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (row.length != 7) continue;
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
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }   
    return trans;
}
