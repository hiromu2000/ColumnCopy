describe('TransactionTableCopy', function() {
    function runTest(translatorName) {
        var trans;
        var rows;
        var metadata;
        var spec;
        beforeEach(function(done) {
            jasmine.getFixtures().fixturesPath = '../translators';
            var fixture = readFixtures(translatorName + '.js');
            var m = /\/\*([\S\s]*?)\*\//.exec(fixture);
            metadata = JSON.parse(m[1]);
            var account_name = metadata.account_name;
            var script = metadata.account_name + '.js';
            if (metadata.custom) {
                script = '../translators/' + script;
            } else {
                script = '../translators/default.js';
            }
            jasmine.getFixtures().fixturesPath = './';
            fixture = readFixtures('test_' + translatorName + '.html');
            setFixtures(fixture);
            m = /<!--([\S\s]*?)-->/.exec(fixture);
            spec = JSON.parse(m[1]);
            var $table = $('table:first');
            var _ColumnCopy = new ColumnCopy();
            _ColumnCopy.options = {
                hyperlinkMode: 'off',
                columnSeparator: '\t'    
            };
            rows = _ColumnCopy.getValuesForTable($table);
            for (var i = 0; i < rows.length; i++) {
              rows[i] = rows[i].split('\t');
            }
            $.getScript(script, function() {
                trans = parse(rows, metadata);
                done();
            });
        });
        it('Translator check for ' + translatorName, function() {
            expect(trans).toEqual(spec.trans);
        });
    }
    runTest('bk_mufg_jp');
    runTest('mizuhobank_co_jp');
    runTest('saisoncard_co_jp');
    runTest('card_surugabank_co_jp');
    runTest('ib_surugabank_co_jp');
    runTest('mufgcard_com');
});
