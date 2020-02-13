/*
SCRIPT
this script handles the user hovering and selecting sprites

INFO
sprites are 16x16px, with 1px between
selectedSprite is a global array with x and y values for selected sprite, used by spritePlacement.js
sprite preview is to 2x scale (32px)
*/

let selectedSprite = [-1,-1];

// consts for selectedSprite index
const X = 0;
const Y = 1;

const HOVER = 0;
const SELECT = 1;

$( ()=> {
	$('#sprites-img').mousemove( (evt)=> {
		// show outline
		let clickX = evt.offsetX;
		let clickY = evt.offsetY;

		let spriteX = Math.floor(clickX/17);
		let spriteY = Math.floor(clickY/17);

		displaySpriteOutline(spriteX, spriteY, false);
		displayPreview(spriteX, spriteY, HOVER);
	});
	$('#sprites-img').click( (evt)=> {
		// select / deselect
		let clickX = evt.offsetX;
		let clickY = evt.offsetY;

		let spriteX = Math.floor(clickX/17);
		let spriteY = Math.floor(clickY/17);

		displaySpriteOutline(spriteX, spriteY, true);
		displayPreview(spriteX, spriteY, SELECT);
		selectedSprite = [spriteX, spriteY];
	});
	$('#sprites-img').load( ()=> {
		// make it as large as sprite img
		$('#sprite-select-display').css('width', document.getElementById('sprites-img').clientWidth);
		$('#sprite-select-display').css('height', document.getElementById('sprites-img').clientHeight);
	});

});

function displaySpriteOutline(spriteX, spriteY, toggleSelect) {

	if(toggleSelect) {
		// remove all, including previous selection
		$('#sprite-select-display').empty();
	}
	else {
		// remove all previous, except selection
		let tmp = $('#sprite-select-display .selection').detach();
		$('#sprite-select-display').empty().append(tmp);
	}

	let startX = spriteX*17 - 1;
	let startY = spriteY*17 - 1;
	let outlineDiv = '<div class="'+(toggleSelect ? 'selection' : '')+'" style="width: 18px; height: 18px; border: 1px solid '+(toggleSelect ? '#933' : '#333')+'; position: absolute; text-align: left; left: '+startX+'px; top: '+startY+'px;"></div>';
	$('#sprite-select-display').append(outlineDiv);
}

function displayPreview(spriteX, spriteY, mode) {
	let startX = spriteX*17 - 1;
	let startY = spriteY*17 - 1;
	
	let ctx;
	if(mode == SELECT) {
		ctx = document.getElementById('select-preview').getContext('2d');
	}
	else {
		ctx = document.getElementById('hover-preview').getContext('2d');
	}
	
	ctx.clearRect(0,0,32,32);
	ctx.drawImage(document.getElementById('sprites-img'), startX, startY, 16, 16,
		0, 0, 32, 32);
}