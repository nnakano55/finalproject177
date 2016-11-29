
function main()
{// main function
	
	var shader = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	if(!gl || !shader)
	{
		console.log("failed to load context");
		return -1;
	}
	initTemp();
	initInputMouse();
	initInputKey();
	var tick = function()
	{// animation tick
		updateKeyInfo();
		updateMouseInfo();
		drawStuff();
		requestAnimationFrame(tick, canvas);					
	}// End tick()
	tick();
	
}// End main

function updateKeyInfo()
{// updates the keyboard inputs
	if (Key.isDown(Key.w)||Key.isDown(Key.W)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, 10);
	if (Key.isDown(Key.a)||Key.isDown(Key.A)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(-10, 0);
	if (Key.isDown(Key.s)||Key.isDown(Key.S)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(0, -10);
	if (Key.isDown(Key.d)||Key.isDown(Key.D)) scene1.objects[ITEM_KEY.PLAYER2].shift_character(10, 0);
	
	if (Key.isDown(Key.SPACE))
	{		
		scene1.objects[ITEM_KEY.PLAYER2].shapes[3].draw = true;
		checkCollisionSpray();
	}
	else scene1.objects[ITEM_KEY.PLAYER2].shapes[3].draw = false;
	
	scene1.objects[ITEM_KEY.PLAYER2].updateVertices();
}// End updateKeyInfo

function checkCollisionSpray()
{// check if the spray collides with the hair
	for(var j = 0; j < scene1.objects[ITEM_KEY.FOOTHAIR].shapes.length; j++)
	{
		if( scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].name == 'hair')
		{
			var checkX = scene1.objects[ITEM_KEY.FOOTHAIR].x_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locX;
			var checkY = scene1.objects[ITEM_KEY.FOOTHAIR].y_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locY;
			var player = scene1.objects[ITEM_KEY.PLAYER2];
			if
			(
				checkX <= player.x_orig + player.shapes[3].locX + player.shapes[3].width/2 &&
				checkX >= player.x_orig + player.shapes[3].locX - player.shapes[3].width/2 &&
				checkY <= player.y_orig + player.shapes[3].locY + player.shapes[3].height/2 &&
				checkY >= player.y_orig + player.shapes[3].locY - player.shapes[3].height/2
			){
				scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].change_color(1, 1, 1, 1);
				scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].name = "spray-hair";
			}
		}
	}
}// End checkCollisionSpray

function updateMouseInfo()
{// updates the mouse input
	scene1.objects[ITEM_KEY.PLAYER1].change_character(Mouse.x, Mouse.y);
	scene1.objects[ITEM_KEY.PLAYER1].updateVertices();
	if(Mouse.isDown(Mouse.LEFT))
	{
		checkSprayedHair();
	}
}// End updateMouseInfo

function checkSprayedHair()
{// see if razor gets any sprayed hair
	for(var j = 0; j < scene1.objects[ITEM_KEY.FOOTHAIR].shapes.length; j++)
	{
		if(scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].name == "spray-hair")
		{
			var checkX = scene1.objects[ITEM_KEY.FOOTHAIR].x_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locX;
			var checkY = scene1.objects[ITEM_KEY.FOOTHAIR].y_orig + scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].locY;
			var player = scene1.objects[ITEM_KEY.PLAYER1];
			if
			(
				checkX <= player.x_orig + player.shapes[2].locX + player.shapes[2].width/2 &&
				checkX >= player.x_orig + player.shapes[2].locX - player.shapes[2].width/2 &&
				checkY <= player.y_orig + player.shapes[2].locY + player.shapes[2].height/2 &&
				checkY >= player.y_orig + player.shapes[2].locY - player.shapes[2].height/2
			){
				scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].change_color(1, 0.5, 0, 1);
				scene1.objects[ITEM_KEY.FOOTHAIR].shapes[j].name = "no-hair";
			}
		}
	}
}// End checkSprayedHair

function initTemp()
{// initializes the shapes
	var neg = ITEM_KEY.PLAYER1 == 0 ? 1 : -1;
	Mouse.x = neg == -1 ? 300 : 0;
	
	var c = new Character(300 * neg, 0);
	var lel = new Square(25, 50, 100, 25);
	c.addShape(lel);
	lel = new Square(0, 0, 100, 200);
	c.addShape(lel);
	lel = new Square(0, 100, 50, 25);
	c.addShape(lel);
	lel = new Square(150, 50, 150, 75);
	lel.change_color(1, 1, 1, 1);
	lel.draw = false;
	c.addShape(lel);
	scene1.addObject(c);
	
	c = new Character(300 * neg, 0);
	lel = new Square(0, 50, 200, 35);
	c.addShape(lel);
	lel = new Square(100, 0, 50, 75);
	c.addShape(lel);
	lel = new Square(0, 0, 200, 25);
	c.addShape(lel);
	lel = new Square(0, -50, 200, 35);
	c.addShape(lel);
	lel = new Square(-100, 0, 50, 75);
	c.addShape(lel);
	c.change_all_color(0, 0, 1, 1);
	scene1.addObject(c);
	
	c = new Character(0, 0);
	var rand = Math.floor((Math.random() * 30) + 15);
	for(var i = 0; i < rand; i++)
	{
		lel = new Square
		(
			(Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 45) + 0)), 
			(Math.random() < 0.5 ? -1 : 1) * (Math.floor((Math.random() * 150) + 0)), 
			10, 10
		);
		lel.name = "hair";
		c.addShape(lel);
	}
	c.change_all_color(0, 0, 0, 1);
	scene1.addObject(c);
	
	c = new Character(0, 0);
	lel = new Square(0, 0, 100, 350);
	lel.change_color(1, 0.5, 0, 1);
	c.addShape(lel);
	lel = new Square(0, -200, 150, 75);
	lel.change_color(1, 0.5, 0, 1);
	c.addShape(lel);
	scene1.addObject(c);
	
}// End initTemp


function drawStuff()
{//draws the shapes
	gl.clearColor(1,1,1,1);
	gl.enable(gl.DEPTH_TEST);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	for(var i = 0; i < scene1.objects.length; i++)
	{
		for(var j = 0; j < scene1.objects[i].shapes.length; j++)
		{
			var n = initVertexBuffers(gl, i, j);
			if(n > 0)
				gl.drawElements(gl.TRIANGLES, n , gl.UNSIGNED_SHORT, 0);
		}
	}
}// End drawStuff

function initVertexBuffers(gl, index, index_s)
{// buffers the light objects
	
	if(!scene1.objects[index].shapes[index_s].draw)
	{// draw only if draw == true
		return -1;
	}
	
	var f_vertices;
	var f_colors;
	var u_indices;
	var mvpMatrix = new Matrix4();
	var vertex_buffer = gl.createBuffer();
	var index_buffer = gl.createBuffer();
	var color_buffer = gl.createBuffer();
	var u_MvpMatrix = gl.getUniformLocation(gl.program, 'u_MvpMatrix');
	
	mvpMatrix.setOrtho
	(
		-640, 640,
		-360, 360,
		-600, 600
	);
	
	if(!vertex_buffer || ! index_buffer || !color_buffer)
	{// check if both buffer created succesfully 
		console.log("failed to create buffer");
		return -1;
	}
				
	f_vertices = new Float32Array(scene1.objects[index].shapes[index_s].vertices);
	f_colors = new Float32Array(scene1.objects[index].shapes[index_s].colors);
	u_indices = new Uint16Array(scene1.objects[index].shapes[index_s].indices);
	
	gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);

	init_array_buffer(vertex_buffer, 3, "a_Position", f_vertices, gl.program);
	init_array_buffer(color_buffer, 4, "a_Colors", f_colors, gl.program);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, u_indices, gl.STATIC_DRAW);
	
	return u_indices.length;
	
}// End initVertexBuffersLight