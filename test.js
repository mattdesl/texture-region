var test = require('tape').test;
var TextureRegion = require('./');

test('test region', function(t) {
    //any object with width/height will work, like HTML Image element
    var tex = {
        width: 800,
        height: 600
    };

    var r = new TextureRegion(tex, 25, 35, 50, 100);

    t.equal(r.texture.width, 800, 'maintains original texture size');
    t.equal(r.texture.height, 600, 'maintains original texture size');

    t.equal(r.x, 25, 'computes correct region X in pixels');
    t.equal(r.y, 35, 'computes correct region Y in pixels');

    t.equal(r.width, 50, 'correct region width in pixels');
    t.equal(r.height, 100, 'correct region height in pixels');

    var oldV = r.v;
    var oldV2 = r.v2;

    var oldU = r.u;
    var oldU2 = r.u2;

    t.equal(r.u2, 0.09375, 'correct U2');
    t.equal(r.v2, 0.225, 'correct V2');

    r.flip(false, true);
    t.equal(r.v2, oldV, 'flips V correctly');
    t.equal(r.v, oldV2, 'flips V correctly');

    r.flip(true, false);
    t.equal(r.u2, oldU, 'flips U correctly');
    t.equal(r.u, oldU2, 'flips U correctly');

    r.setUVs(0, 0, 1, 1);
    t.ok(r.width === r.texture.width
            && r.height === r.texture.height
            && r.x === 0
            && r.y === 0, 'setUVs works');

    var other = r.clone();
    t.deepEqual(r, other, 'clone works');

    var r2 = new TextureRegion(tex);
    t.ok(r2.width === tex.width && r2.height === tex.height, 'default size works');
    t.equal(r2.u, 0, 'correct U');
    t.equal(r2.v, 0, 'correct V');

    r2.copy(other);
    t.deepEqual(r2, other, 'copy works');


    t.end();
});