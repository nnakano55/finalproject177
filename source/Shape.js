//Shape object
// basic shape container

function Shape(x, y)
{
	this.locX = x;
	this.locY = y;
	this.draw = true;
	this.name = "shape";
}

Shape.prototype.retX = function()
{
	return this.locX;
}

Shape.prototype.retY = function()
{
	return this.locY;
}

Shape.prototype.change_location = function(x,y)
{
	this.locX = x;
	this.locY = y;
}

Shape.prototype.shift_location = function(x,y)
{
	this.locX += x;
	this.locY += y;
}
