/*
SCRIPT
this script handles the user placing the selected (if any) sprite on the canvas

INFO

*/

let mouseIsDown = false;
$(document).mousedown(function() {
	mouseIsDown = true;
}).mouseup(function() {
	mouseIsDown = false;  
});

$( ()=> {
	$('#user-map').click( (evt)=> {
		handleMapClick(evt);
	});

	$('#user-map').mousemove( (evt)=> {
		// dragging mouse
		if(!mouseIsDown) return;

		handleMapClick(evt);
	});

});

function handleMapClick(evt) {
		let clickX = evt.offsetX;
		let clickY = evt.offsetY;

		let mapX = Math.floor(clickX/16)*16 ; // not working, scaled incorrectly
		let mapY = Math.floor(clickY/16)*16  ;

		placeSprite(mapX, mapY);
}

function placeSprite(mapX, mapY) {
	if(selectedSprite[X] == -1) {
		return; // no selected sprite
	}

	let startX = selectedSprite[X]*17 - 1;
	let startY = selectedSprite[Y]*17 - 1;

	let ctx = document.getElementById('user-map').getContext('2d');
	ctx.clearRect(mapX, mapY, 16, 16);
	ctx.drawImage(document.getElementById('sprites-img'), startX, startY, 16, 16,
		mapX, mapY, 16, 16);
}
