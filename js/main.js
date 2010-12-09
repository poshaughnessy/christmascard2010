$(function() {

    drawTree();

    $('#frontpage').click(function() {
        openCard();
    });

    // Probably want to use something else to close the card...
    $('#secondinnerpage').click(function() {
        closeCard();
    });

});

function drawTree() {

    var context = $('#tree')[0].getContext("2d");
    context.moveTo(150, 0);
    context.lineTo(200, 50);
    context.lineTo(170, 50);
    context.lineTo(250, 140);
    context.lineTo(200, 140);
    context.lineTo(280, 250);
    context.lineTo(20, 250);
    context.lineTo(100, 140);
    context.lineTo(50, 140);
    context.lineTo(130, 50);
    context.lineTo(100, 50);
    context.lineTo(150, 0);
    context.strokeStyle='#406B2E';
    context.stroke();
    context.fillStyle='#5CD12E';
    context.fill();

}

function openCard() {
  
    $('#frontpage')[0].addEventListener('webkitTransitionEnd', function(event) {
        $('#firstinnerpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(-180deg)');
        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

/*
    window.setTimeout(function() {
	$('#firstinnerpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(-180deg)');
	}, 1000);
*/

    $('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateY(-90deg)');

    $('#card').data('open','true');
    
}

function closeCard() {

    $('#firstinnerpage')[0].addEventListener('webkitTransitionEnd', function(event) {
        $('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(0deg)');
        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

/*
    window.setTimeout(function() {
	$('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(0deg)');
	}, 1000);
*/

    $('#firstinnerpage').css('-webkit-transition','-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateY(-90deg)');

    $('#card').data('open','false');

}
