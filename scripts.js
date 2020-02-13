$( ()=> {
	$('#sprites-img').mousemove( (evt)=> {
		// show outline
		let clickX = evt.offsetX;
		let clickY = evt.offsetY;

		let spriteX = Math.floor(clickX/17);
		let spriteY = Math.floor(clickY/17);

		displaySpriteOutline(spriteX, spriteY, false);
	});
	$('#sprites-img').click( (evt)=> {
		// select / deselect
		let clickX = evt.offsetX;
		let clickY = evt.offsetY;

		let spriteX = Math.floor(clickX/17);
		let spriteY = Math.floor(clickY/17);

		displaySpriteOutline(spriteX, spriteY, true);
		displayPreview(spriteX, spriteY);
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

	let startX = spriteX*17 - 2;
	let startY = spriteY*17 - 2;
	let outlineDiv = '<div class="'+(toggleSelect ? 'selection' : '')+'" style="width: 18px; height: 18px; border: 1px solid '+(toggleSelect ? '#933' : '#333')+'; position: absolute; text-align: left; left: '+startX+'px; top: '+startY+'px;"></div>';
	$('#sprite-select-display').append(outlineDiv);
}

function displayPreview(spriteX, spriteY) {
	let startX = spriteX*17 - 2;
	let startY = spriteY*17 - 2;
	
	let ctx = document.getElementById('sprite-preview').getContext('2d');
	ctx.drawImage(document.getElementById('sprites-img'), startX, startY, 16, 16,
		0, 0, 16, 16);
}