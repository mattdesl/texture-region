//This is a GL-specific texture region, employing tangent space normalized coordinates U and V.
//A canvas-specific region would really just be a lightweight object with { x, y, width, height }
//in pixels.
function TextureRegion(texture, x, y, width, height) {
	if (!(this instanceof TextureRegion))
		return new TextureRegion(texture, x, y, width, height);
	//defaults
	this.width = 0;
	this.height = 0;
	this.u = 0;
	this.v = 0;
	this.u2 = 0;
	this.v2 = 0;

	this.texture = texture;
	this.setRegion(x, y, width, height);
}

TextureRegion.prototype.setUVs = function(u, v, u2, v2) {
	this.width = Math.round(Math.abs(u2 - u) * this.texture.width);
    this.height = Math.round(Math.abs(v2 - v) * this.texture.height);

    // From LibGDX TextureRegion.java -- 
	// For a 1x1 region, adjust UVs toward pixel center to avoid 
	// filtering artifacts on AMD GPUs when drawing very stretched.
	if (TextureRegion.FIX_AMD &&
			this.width == 1 && this.height == 1) {
		var adjustX = 0.25 / this.texture.width;
		u += adjustX;
		u2 -= adjustX;
		var adjustY = 0.25 / this.texture.height;
		v += adjustY;
		v2 -= adjustY;
	}

	this.u = u;
	this.v = v;
	this.u2 = u2;
	this.v2 = v2;
};

TextureRegion.prototype.copy = function(region) {
	this.texture = region.texture;
	this.u = region.u;
	this.v = region.v;
	this.u2 = region.u2;
	this.v2 = region.v2;
	this.width = region.width;
	this.height = region.height;
	return this;
};

TextureRegion.prototype.clone = function() {
	return new TextureRegion(this.texture, this.x, this.y, this.width, this.height);
};

TextureRegion.prototype.setRegion = function(x, y, width, height) {
	x = x || 0;
	y = y || 0;
	width = (typeof width === "number") ? width : this.texture.width;
	height = (typeof height === "number") ? height : this.texture.height;

	var invTexWidth = 1 / this.texture.width;
	var invTexHeight = 1 / this.texture.height;
	this.setUVs(x * invTexWidth, y * invTexHeight, (x + width) * invTexWidth, (y + height) * invTexHeight);
	this.width = Math.abs(width);
	this.height = Math.abs(height);
};

//TODO: add setters for x/Y and width/Height
Object.defineProperty(TextureRegion.prototype, "x", {
	get: function() {
		return Math.round(this.u * this.texture.width);
	} 
})

Object.defineProperty(TextureRegion.prototype, "y", {
	get: function() {
		return Math.round(this.v * this.texture.height);
	}
});

TextureRegion.prototype.flip = function(x, y) {
	var temp;
	if (x) {
		temp = this.u;
		this.u = this.u2;
		this.u2 = temp;
	}
	if (y) {
		temp = this.v;
		this.v = this.v2;
		this.v2 = temp;
	}
};

/**
 * 1x1 texture regions lead to filtering artifacts on some GPUs,
 * so we adjust the UVs toward pixel center if this is true. 
 * 
 * @type {Boolean}
 */
TextureRegion.FIX_AMD = true;

module.exports = TextureRegion;