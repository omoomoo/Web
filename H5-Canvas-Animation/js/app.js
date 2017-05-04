var jSeal = {
	acquireMouse: function(element){
		var mouse = {x: 0, y: 0};
		$(element).mousemove(function(event){
			mouse.x = event.offsetX;
			mouse.y = event.offsetY;
		});
		
		return mouse;
	}
};

function Arrow(){
	this.x = 0;
	this.y = 0;
	this.color = '#03A9F4';
	this.rotation = 0; // Math.PI = 180deg
};
Arrow.prototype.draw = function (context) {
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
