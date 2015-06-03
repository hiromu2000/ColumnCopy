describe('bk_mufg_jp', function() {
    var trans;
    var metadata;
    beforeEach(function(done) {
        jasmine.getFixtures().fixturesPath = '../translators';
        var fixture = readFixtures('bk_mufg_jp.js');
        var m = /\/\*([\S\s]*?)\*\//.exec(fixture);
        metadata = JSON.parse(m[1]);
        var rows = metadata.test.rows;
        var account_name = metadata.account_name;
        var script = metadata.account_name + '.js';
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
        expect(trans).toEqual(metadata.test.trans);
    });
});
