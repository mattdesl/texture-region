[![browser support](https://ci.testling.com/mattdesl/texture-region.png)](https://ci.testling.com/mattdesl/texture-region)

# texture-region

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A region of a texture, typically used for rendering sprites in a texture atlas on the GPU. Largely inspired by LibGDX's TextureRegion utility. 

This is useful alongside [kami](http://github.com/mattdesl/kami), but not necessarily tied to it.

## Usage

[![NPM](https://nodei.co/npm/texture-region.png)](https://nodei.co/npm/texture-region/)


```js
var TextureRegion = require('texture-region');

//can be anything with width/height, like an HTML Image object..
var tex = { width: 800, height: 600 };

//get a region for that texture with (x, y, width, height) in pixels
var region = new TextureRegion(tex, 25, 50, 100, 100);

//get UV coordinates
console.log( region.u, region.v, region.u2, region.v2 );

//the region size in pixels
console.log( region.x, region.y, region.width, region.height );
```

### properties (read-only)

- `texture` the texture/image this region is associated with
- `u` the first U coordinate (horizontal)
- `u2` the second U coordinate
- `v` the first V coordinate (vertical)
- `v2` the second V coordinate
- `x` the X position of the region in pixels
- `y` the Y position of the region in pixels
- `width` the width of the region in pixels
- `height` the height of the region in pixels

### methods

## `setUVs(u, v, u2, v2)`

Updates the UVs and scales the region's pixel values accordingly, based on the associated texture. For example:

```js
//with texture: {width: 50, height: 50}
region.setUV(0, 0, 1, 1);

region.x => 0
region.y => 0
region.width => 50
region.height => 50
```

## `setRegion(x, y, width, height)`

Updates the region in pixels, based on the associated texture. If width or height is not defined, they will default to the texture width and height. The x and y will defualt to zero.

## `clone()`

Returns a clone of this region.

## `copy(otherRegion)`

Copies the values of the other region into this region.

## `flip(u, v)`

Flips the UV coordinates on either or both axes. `u` and `v` are booleans specifying whether to flip that axis.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/texture-region/blob/master/LICENSE.md) for details.
