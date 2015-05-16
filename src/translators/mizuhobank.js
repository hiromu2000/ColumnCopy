/*
{
    "target": "https://web[0-9]\\.ib\\.mizuhobank\\.co\\.jp"
}
*/

function parse(rows) {
    var trans = [];
    for (var i = 1; i < rows.length; i++) {            
        var row = rows[i];
        var re2 = /(\d+)\.(\d+)\.(\d+)/;
        var m = re2.exec(row[0]);
        var year = m[1];
        var month = m[2];
        var day = m[3];
        var date = year + "-" + month + "-" + day;

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
