/*
{
    "target": "^https://www2\\.mufgcard\\.com|test_mufgcard_com\\.html$",
    "account_name": "mufgcard_com",
    "custom": true,
    "date_format": "YYYY/M/D",
    "column_date": 0,
    "column_name": 1,
    "column_memo": 5,
    "column_deposit": null,
    "column_withdraw": 4,
    "amount_separator": "[^-0-9]"
}
*/

function parse(rows, metadata) {
    var trans = [];
    for (var i = 3; i < rows.length; i++) {
        var row = rows[i];
        var m = /.*(\d{4}\/\d{1,2}\/\d{1,2}).*/g.exec(row[metadata.column_date]);
        var date = moment(m[1], metadata.date_format).format('YYYY-MM-DD');
        var name = row[metadata.column_name].replace("ご利用店名","").trim();
        var memo = '';
        if (metadata.column_memo != null) memo = row[metadata.column_memo].trim();
        var re = new RegExp(metadata.amount_separator, "g");
        var amount;
        if (metadata.column_deposit != null && row[metadata.column_deposit].search(/\d+/) != -1) {
            amount = row[metadata.column_deposit];
            amount = parseInt(amount.replace(re, ''));
        } else {
            amount = row[metadata.column_withdraw];
            amount = parseInt(amount.replace(re, ''));
            amount *= -1;
        }
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }
    return trans;
}
