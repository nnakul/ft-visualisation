
const USER = 0 ;
const FOURIER = 1;
let BUTTONS = [] ;
let x = [] ;
let fourierX ;
let time = 0 ;
let path = [] ;
let isComplete = false ;
let PICTURE = TITLE ;
let WEIGHT = 4 ;
let COLOR = [255,255,255] ;
let MARGIN = 30 ;
let SKIP = 1 ;
let OMISSION = 0 ;

let PICTURES = {
	'alb_eins' : 	{ 'margin' : 0 , 'omission' : 50 , 'skip' : 5 , 'points' : AE , 'color' : [17, 212, 212]} ,
	'ballerina' : { 'margin' : 15 , 'omission' : 50 , 'skip' : 4 , 'points' : BALLERINA , 'color' : [255, 20, 147]} ,
	'boy' : 		{ 'margin' : 30 , 'omission' : 0 , 'skip' : 3 , 'points' : BOY , 'color' : [30, 144, 255]} ,
	'danny' : 	{ 'margin' : 25 , 'omission' : 750 , 'skip' : 4 , 'points' : DANNY , 'color' : [255, 0, 0]} ,
	'doll' : 		{ 'margin' : 45 , 'omission' : 0 , 'skip' : 4 , 'points' : DOLL , 'color' : [255, 153, 255]} ,
	'family' : 	{ 'margin' : 25 , 'omission' : 0 , 'skip' : 6 , 'points' : FAMILY , 'color' : [255, 165, 0]} ,
	'friends' : 	{ 'margin' : 37 , 'omission' : 50 , 'skip' : 4 , 'points' : FRIENDS , 'color' : [255, 105, 180]} ,
	'walk' : 		{ 'margin' : 20 , 'omission' : 0 , 'skip' : 3 , 'points' : WALK , 'color' : [135, 206, 235]} ,
	'guitar' : 	{ 'margin' : 30 , 'omission' : 200 , 'skip' : 4 , 'points' : GUITAR , 'color' : [240, 128, 128]} ,
	'india' : 	{ 'margin' : 40 , 'omission' : 0 , 'skip' : 5 , 'points' : INDIA , 'color' : [0, 250, 154]} ,
	'rose' : 		{ 'margin' : 30 , 'omission' : 200 , 'skip' : 5 , 'points' : ROSE , 'color' : [199, 21, 133]} ,
	'simpson' : 	{ 'margin' : 30 , 'omission' : 0 , 'skip' : 4 , 'points' : SIMP , 'color' : [255, 255, 0]} ,
	'sydney' : 	{ 'margin' : 30 , 'omission' : 150 , 'skip' : 4 , 'points' : SYD , 'color' : [255, 99, 71]} ,
	'unicorn' : 	{ 'margin' : 70 , 'omission' : 100 , 'skip' : 3 , 'points' : UNICORN , 'color' : [255, 0, 255]} ,
	'yoga' : 		{ 'margin' : 30 , 'omission' : 0 , 'skip' : 5 , 'points' : YOGA , 'color' : [0, 255, 0]}
} ;

function loadNewDrawing()
{
	x = [] ;
	path = [] ;
	time = 0 ;
	isComplete = false ;
	for (let i = 0; i < PICTURE.length-OMISSION; i+=SKIP )
		{
			const c = new Complex(PICTURE[i].x-500-MARGIN, PICTURE[i].y-300) ;
			x.push(c) ;
		}
	fourierX = dft(x);
	fourierX.sort((a, b) => b.amp - a.amp) ;
}

function changeDrawing( code )
{
	var p = PICTURES[code] ;
	PICTURE = p.points ;
	WEIGHT = 1 ;
	COLOR = p.color ;
	MARGIN = p.margin ;
	SKIP = p.skip ;
	OMISSION = p.omission ;
	loadNewDrawing() ;
}

function makeButton( text , position , code )
{
	var button = createButton(text) ;
	button.style('background-color', color(255,140,0)) ;
	button.style('color', color(255,255,255)) ;
	button.style('font-size', '32px') ;
	button.style('padding', '10px 10px') ;
	button.style('border-radius', '12px') ;
	button.style('border', 'None') ;
	button.position(position[0],position[1]) ;
	button.mousePressed(function() {	button.style('background-color', color(255,255,255)); 
										button.style('color', color(255,140,0))	}) ;
	button.mouseReleased(function() {	button.style('background-color', color(255,140,0)); 
										button.style('color', color(255,255,255)); 
										changeDrawing(code);	}) ;
	return button ;
}

function setup()
{
	main = createCanvas(700, 750) ;
	main.position(800,110) ;
	loadNewDrawing() ;
	var ADJ_V = 10 ;
	
	var ADJ_H = 10 ;
	BUTTONS.push( makeButton('Albert Einstein' , [5+ADJ_H,200+ADJ_V] , 'alb_eins') ) ;
	BUTTONS.push( makeButton('A Ballerina' , [250+ADJ_H,200+ADJ_V] , 'ballerina') ) ;
	BUTTONS.push( makeButton('A Boy With Glasses' , [450+ADJ_H,200+ADJ_V] , 'boy') ) ;
	
	ADJ_H = -47 ;
	BUTTONS.push( makeButton('Daenerys Targaryen' , [80+ADJ_H,290+ADJ_V] , 'danny') ) ;
	BUTTONS.push( makeButton('A Doll' , [407+ADJ_H,290+ADJ_V] , 'doll') ) ;
	BUTTONS.push( makeButton('Unicorn' , [530+ADJ_H,290+ADJ_V] , 'unicorn') ) ;
	BUTTONS.push( makeButton('Family' , [679+ADJ_H,290+ADJ_V] , 'family') ) ;
	
	ADJ_H = 18 ;
	BUTTONS.push( makeButton('Friends' , [5+ADJ_H,380+ADJ_V] , 'friends') ) ;
	BUTTONS.push( makeButton('A Girl Walking Her Dog' , [200+ADJ_H,380+ADJ_V] , 'walk') ) ;
	BUTTONS.push( makeButton('A Guitar' , [612+ADJ_H,380+ADJ_V] , 'guitar') ) ;
	
	ADJ_H = -49 ;
	BUTTONS.push( makeButton('Map Of India' , [80+ADJ_H,470+ADJ_V] , 'india') ) ;
	BUTTONS.push( makeButton('A Rose' , [335+ADJ_H,470+ADJ_V] , 'rose') ) ;
	BUTTONS.push( makeButton('Homer Jay Simpson' , [500+ADJ_H,470+ADJ_V] , 'simpson') ) ;
	
	ADJ_H = 67 ;
	BUTTONS.push( makeButton('Sydney Opera House' , [5+ADJ_H,560+ADJ_V] , 'sydney') ) ;
	BUTTONS.push( makeButton('A Girl Doing Yoga' , [385+ADJ_H,560+ADJ_V] , 'yoga') ) ;
}

function epicycles(x, y, rotation, fourier) 
{
	for (let i = 0; i < fourier.length; i++)
	{
		let prevx = x ;
		let prevy = y ;
		let freq = fourier[i].freq ;
		let radius = fourier[i].amp ;
		let phase = fourier[i].phase ;
		x += radius * cos(freq * time + phase + rotation) ;
		y += radius * sin(freq * time + phase + rotation) ;
		stroke(47, 79, 79);
		strokeWeight(1);
		if ( i >= fourier.length / 2 )
			strokeWeight(0.5);
		if ( i >= fourier.length * 0.8 )
			strokeWeight(0.05);
		noFill();
		ellipse(prevx, prevy, radius * 2);
		stroke(255,255,255);
		line(prevx, prevy, x, y);
	}
	return createVector(x, y);
}

function draw() 
{
	background(0) ;
	let v = epicycles(600, 350, 0, fourierX) ;
	if ( ! isComplete )
		path.unshift(v) ;
	beginShape() ;
	noFill() ;
	stroke(COLOR[0],COLOR[1],COLOR[2]) ;
	strokeWeight(WEIGHT) ;
	for (let i = 0; i < path.length; i++)
		vertex(path[i].x, path[i].y+15) ;
	endShape(OPEN) ;
	const dt = TWO_PI / fourierX.length;
	time += dt ;
	if (time > TWO_PI) {
		time = 0;
		isComplete = true ;
	}
}
