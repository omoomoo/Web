var jSeal = {
	acquireMouse: function(element) {
		var mouse = {
			x: 0,
			y: 0
		};
		$(element).mousemove(function(event) {
			mouse.x = event.offsetX;
			mouse.y = event.offsetY;
		});

		return mouse;
	}
};

function Arrow() {
	this.x = 0;
	this.y = 0;
	this.color = '#03A9F4';
	this.rotation = 0; // Math.PI = 180deg
};
Arrow.prototype.draw = function(context) {
	context.save();
	context.translate(this.x, this.y);
	context.rotate(this.rotation);
	context.lineWidth = 2;
	context.fillStyle = this.color;
	context.beginPath();
	context.moveTo(-50, -25);
	context.lineTo(0, -25);
	context.lineTo(0, -50);
	context.lineTo(50, 0);
	context.lineTo(0, 50);
	context.lineTo(0, 25);
	context.lineTo(-50, 25);
	context.lineTo(-50, -25);
	context.closePath();
	context.fill();
	context.stroke();
	context.restore();
};

function Ball(radius) {
	this.x = 0;
	this.y = 0;
	this.radius = radius || 10;
	this.color = '#03A9F4';
	this.rotation = 0;
}

Ball.prototype.draw = function(ctx) {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.translate(this.x, this.y);
	ctx.rotate(this.rotation);
		
	ctx.beginPath();
	ctx.arc(0, 0, 10, 0, Math.PI * 2);
	ctx.closePath();
	
	ctx.stroke();
	ctx.fill();
	ctx.restore();
}