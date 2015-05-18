/*
{
    "target": "^[0-9]",
    "comment": "Target never match any url",
    "creator": "Hiromu2000"
}
*/

function parse(rows, metadata) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var date = moment(row[metadata.column_date], metadata.date_format).format('YYYY-MM-DD');
        var name = row[metadata.column_name];
        var memo = '';
        if (metadata.column_memo != null) memo = row[metadata.column_memo];
        var re = new RegExp(metadata.amount_separator, "g");
        var amount = row[metadata.column_amount];
        amount = amount.replace(re, '');
        amount = parseInt(amount);
        if (metadata.amount_negate) amount *= -1;
        trans.push({date: date, name: name, memo: memo, amount: amount});
    }
    return trans;
}
