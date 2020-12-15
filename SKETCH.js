
const USER = 0 ;
const FOURIER = 1;

let x = [] ;
let fourierX = [] ;
let time = 0 ;
let path = [] ;
var user_drawing = [] ;
user_drawing[0] = TITLE ;
for ( var i=0 ; i < user_drawing[0].length ; i++ )
{ 
	user_drawing[0][i].x -= 250 ;
	user_drawing[0][i].y -= 220 ;
}
let state = -1 ;
var leftBuffer ;
var rightBuffer ;
let button_undo ;
let button_erase ;
let button_invert ;
let isOverButton = false ;
let current = 0 ;
let slider ;

function mousePressed() 
{
	if ( mouseX <= 0 )	return ;
	if ( mouseX >= 725 )	return ;
	if ( mouseY <= 0 )	return ;
	if ( mouseY >= 500 )	return ;
	state = USER ;
	if ( ! isOverButton )
	{
		user_drawing.push([]) ;
		current ++ ;
	}
}

function mouseReleased() 
{
	if ( state == FOURIER )
		return ;
	state = FOURIER ;
	time = 0 ;
	path = [] ;
	fourierX = [] ;
	x =[] ;
	const skip = 1 ;
	for (let j = 0; j < user_drawing.length; j++ )
		for (let i = 0; i < user_drawing[j].length; i++ ) 
		{
			const c = new Complex(user_drawing[j][i].x, user_drawing[j][i].y) ;
			x.push(c) ;
		}
	fourierX = dft(x);
	fourierX.sort((a, b) => b.amp - a.amp) ;
}

function reset()
{
	state = -1 ;
	path = [] ;
	time = 0 ;
	fourierX = [] ;
	x = [] ;
	user_drawing = [] ;
	current = -1 ;
}

function undo()
{
	console.log('hello');
	console.log(user_drawing);
	user_drawing.pop() ;
	console.log(user_drawing);
	console.log('done');
	if ( current == -1 )	return ;
	current-- ;
}

function setup() 
{
	main_canvas = createCanvas(1500, 500) ;
	main_canvas.position(10,135) ;
	leftBuffer = createGraphics(750, 500) ;
	rightBuffer = createGraphics(750, 500) ;
	
	slider = createSlider(10,100,100,0.5) ;
	slider.position(12, 690);
	slider.style('width', '1500px');
	slider.style('color', color(0,0,0));
	mouseReleased() ;
	
	let gap = 8 ;
	
	button_undo = createButton('UNDO') ;
	button_undo.style('background-color', color(255, 140, 0));
	button_undo.style('color', color(255,255,255));
	button_undo.style('font-size', '28px');
	button_undo.style('border-radius', '12px');
	button_undo.style('border', 'None');
	button_undo.position(15, 150 + gap);
	button_undo.mousePressed(function() {button_undo.style('background-color', color(0,0,0))}) ;
	button_undo.mouseReleased(function() {button_undo.style('background-color', color(255,140,0)); undo();}) ;
	button_undo.mouseOver(function() {isOverButton=true}) ;
	button_undo.mouseOut(function() {isOverButton=false}) ;
	
	button_erase = createButton('ERASE') ;
	button_erase.style('background-color', color(255, 140, 0));
	button_erase.style('color', color(255,255,255));
	button_erase.style('font-size', '28px');
	button_erase.style('border-radius', '12px');
	button_erase.style('border', 'None');
	button_erase.position(15, 197 + gap);
	button_erase.mousePressed(function() {button_erase.style('background-color', color(0,0,0))}) ;
	button_erase.mouseReleased(function() {button_erase.style('background-color', color(255,140,0)); reset();}) ;
	button_erase.mouseOver(function() {isOverButton=true}) ;
	button_erase.mouseOut(function() {isOverButton=false}) ;
	
	txt = 'No. of epicycle : ' + int(fourierX.length*slider.value()/100) ;
	h = createElement( 'h2' , txt ) ;
	h.position( 50 , 632 ) ;
}

function epicycles(x, y, rotation, fourier) 
{
	for (let i = 0; i < fourier.length*slider.value()/100; i++) 
	{
		let prevx = x ;
		let prevy = y ;
		let freq = fourier[i].freq ;
		let radius = fourier[i].amp ;
		let phase = fourier[i].phase ;
		x += radius * cos(freq * time + phase + rotation) ;
		y += radius * sin(freq * time + phase + rotation) ;
		stroke(244, 138, 160);
		strokeWeight(1);
		noFill();
		ellipse(prevx, prevy, radius * 2);
		stroke(255,255,255);
		line(prevx, prevy, x, y);
	}
	return createVector(x, y);
}

function draw() 
{
	clear() ;
	drawLeftBuffer();
	image(leftBuffer, 0, 0);
	drawRightBuffer();
    image(rightBuffer, 725, 0);
	stroke(255,255,255);
	strokeWeight(50);
    noFill();
	line(750, 0, 750, 500);
	h.html( ' NUMBER OF EPICYCLES : ' + int(fourierX.length*slider.value()/100) ) ;
}

function drawLeftBuffer() 
{
	background(0) ;
    leftBuffer.background(0) ;
	leftBuffer.beginShape() ;
	leftBuffer.noFill() ;
	leftBuffer.stroke(255,255,255);
	leftBuffer.strokeWeight(4) ;
	for (var i=0 ; i<user_drawing.length ; i++ )
		for (let v of user_drawing[i])
			leftBuffer.vertex( v.x+362, v.y+250 ) ;
	leftBuffer.endShape();
	if (state == USER && ! isOverButton)
	{
		if ( ! ( mouseX <= 0 || mouseX >= 725 || mouseY <= 0 ||  mouseY >= 500 ) )
		{
			let p = createVector( mouseX-362, mouseY-250 ) ;
			user_drawing[current].push(p) ;
		}
	}
}

function drawRightBuffer() 
{
	if ( ! (fourierX && fourierX.length) )	return ;
	let v = epicycles(755+362, 250-25, 0, fourierX);
	path.unshift(v);
	beginShape();
	rightBuffer.noFill();
	rightBuffer.stroke(255,255,255);
	strokeWeight(4);
	for (let i = 0; i < path.length; i++)
		vertex(path[i].x, path[i].y+15);
	endShape(OPEN);
	const dt = TWO_PI / fourierX.length;
	time += dt;
	if (time > TWO_PI) {
		time = 0;
		path = [];
	}
}