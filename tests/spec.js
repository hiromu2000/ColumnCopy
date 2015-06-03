describe('Tests', function() {
    function forEach(translatorName) {
        var trans;
        var rows;
        var metadata;
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
            loadFixtures('test_' + translatorName + '.html');
            var $table = $('table:first');
            var _ColumnCopy = new ColumnCopy();
            rows = _ColumnCopy.getValuesForTable($table);
            $.getScript(script, function() {
                trans = parse(rows, metadata);
                done();
            });
        });
        // Now this just checks the length of rows.
        // I tried to check each element of rows one by one, 
        // but couldn't figure out how to allow test.rows to include &nbsp;, which could appear in rows.
        it('Scraper check for ' + translatorName, function() {
            expect(rows.length).toBe(metadata.test.rows.length);
        });
        it('Translator check for ' + translatorName, function() {
            expect(trans).toEqual(metadata.test.trans);
        });
    }
    forEach('bk_mufg_jp');
    forEach('mizuhobank_co_jp');
});
