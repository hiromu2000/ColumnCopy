describe('bk_mufg_jp', function() {
    var rows = [
        ['日付', 'お支払い', 'お預かり', 'お取引内容', '差引残高', 'メモ'],
        ['2015年5月7日', '1,080円', '', '口座振替４', '1,000,000円', ''],
        ['2015年5月27日', '', '8,364円', '振込２', '1,008,364円', ''],
    ];
    var transToBe = [
        {date: "2015-05-07", name: "口座振替４", memo: "", amount: -1080},
        {date: "2015-05-27", name: "振込２", memo: "", amount: 8364}
    ];
    var metadata = {
        target: "^https://direct11\\.bk\\.mufg\\.jp",
        account_name: "bk_mufg_jp",
        custom: false,
        date_format: "YYYY年M月D日",
        column_date: 0,
        column_name: 3,
        column_memo: 5,
        column_deposit: 2,
        column_withdraw: 1,
        amount_separator: "[^-0-9]"
    };
    var trans;
    beforeEach(function(done) {
        var account_name = metadata.account_name;
        if (metadata.custom) {
            script = '../translators/' + script;
        } else {
            script = '../translators/default.js';
        }
        $.getScript(script, function() {
            trans = parse(rows, metadata);
            done();
        });
    });
    it('Transaction check', function() {
        expect(trans).toEqual(transToBe);
    });
});
