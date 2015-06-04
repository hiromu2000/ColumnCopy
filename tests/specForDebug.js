describe('Tests', function() {
    function forEach(translatorName) {
        var trans;
        var rows;
        var metadata;
        var spec;
        beforeEach(function() {
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
            rows = _ColumnCopy.getValuesForTable($table);
            trans = parse(rows, metadata);
        });
        it('Translator check for ' + translatorName, function() {
            for (var i = 0; i < trans.length; i++) {
                expect(trans[i]).toEqual(spec.trans[i]);
            }
        });
    }
    forEach('mufgcard_com');
});
