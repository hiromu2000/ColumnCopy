describe('bk_mufg_jp', function() {
    var trans;
    var rows;
    var metadata;
    beforeEach(function(done) {
        jasmine.getFixtures().fixturesPath = '../translators';
        var fixture = readFixtures('bk_mufg_jp.js');
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
        loadFixtures('test_bk_mufg_jp.html');
        var $table = $('table:first');
        var _ColumnCopy = new ColumnCopy();
        rows = _ColumnCopy.getValuesForTable($table);
        $.getScript(script, function() {
            trans = parse(rows, metadata);
            done();
        });
    });
    it('Scraper check', function() {
        expect(rows).toEqual(metadata.test.rows);
    });
    it('Translator check', function() {
        expect(trans).toEqual(metadata.test.trans);
    });
});
