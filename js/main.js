$(function() {

    drawTree();

    $('#play').click(function(event) {
        playMusic();
        event.preventDefault();
    });
    $('#play').bind('touchstart',function(event) {
        playMusic();
        event.preventDefault();
    });

    $('#pause').click(function(event) {
        pauseMusic();
        event.preventDefault();
    });
    $('#pause').bind('touchstart',function(event) {
        pauseMusic();
        event.preventDefault();
    });

    $('#frontpage').click(function(event) {
        openCard();
        event.preventDefault();
    });
    $('#frontpage').bind('touchstart',function(event) {
	openCard();
	event.preventDefault();
    });

    $('#firstinnerpage').click(function(event) {
        closeCard();
        event.preventDefault();
    });
    $('#firstinnerpage').bind('touchstart',function(event) {
	closeCard();
	event.preventDefault();
    });

    $('#song').bind('onended',function(event) {
	alert('Song ended');
	onMusicEnded();
    });

    document.addEventListener('keydown', function(e) { keyHandle(e); }, false);

    addSwipeListener($('body')[0], function(e) {doSwipe(e);});

});

function doSwipe(e) {
    if( e.direction == 'left' ) {
        openCard();
    } else if( e.direction == 'right' ) {
        closeCard();
    }
}

function addSwipeListener(el, listener) {

    var startX;
    var startY;
    var dx;
    var direction;

    function cancelTouch() {
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
        startX = null;
        startY = null;
        direction = null;
    }
    
    function onTouchMove(e) {
        if( e.touches.length > 1 ) {
            cancelTouch();
        } else {
            dx = e.touches[0].pageX - startX;
            var dy = e.touches[0].pageY - startY;
            if( direction == null ) {
                direction = dx;
            } else if( (direction < 0 && dx > 0) || (direction > 0 && dx < 0) || Math.abs(dy) > 44) {
                cancelTouch();
            }
        }
    }

    function onTouchEnd(e) {
    
        cancelTouch();

        if( Math.abs(dx) > 50 ) {
            listener( {target:el, direction: dx > 0 ? 'right' : 'left'} );
            dx = 0;
        }

    }

    function onTouchStart(e) {

        e.preventDefault();
        e.stopPropagation();

        if( e.touches.length == 1 ) {
            startX = e.touches[0].pageX;
            startY = e.touches[0].pageY;
            el.addEventListener('touchmove', onTouchMove, false);
            el.addEventListener('touchend', onTouchEnd, false);
        }
        
    }

    el.addEventListener('touchstart', onTouchStart, false);

}

function keyHandle(e) {

    if( e.keyCode == 39 ) {
        // Right arrow
        openCard();
    } else if( e.keyCode == 37 ) {
        // Left arrow
        closeCard();
    }

}

function drawTree() {

    var context = $('#tree')[0].getContext("2d");

    // Tree
    context.moveTo(150, 0);
    context.beginPath();
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
    context.closePath();

    // Baubles
    /*
    context.moveTo(200, 50);
    context.beginPath();
    context.arc(200, 50, 5, 0, Math.PI * 2, false);
    context.closePath();
    context.strokeStyle='#FF0000';
    context.stroke();
    context.fillStyle='#FF1111';
    context.fill();

    context.moveTo(250, 140);
    context.beginPath();
    context.arc(250, 140, 5, 0, Math.PI * 2, false);
    context.closePath();
    context.strokeStyle='#FF0000';
    context.stroke();
    context.fillStyle='#FF1111';
    context.fill();

    context.moveTo(280, 250);
    context.beginPath();
    context.arc(280, 250, 5, 0, Math.PI * 2, false);
    context.closePath();
    context.strokeStyle='#FF0000';
    context.stroke();
    context.fillStyle='#FF1111';
    context.fill();
    */

}

function playMusic() {
    $('#song')[0].play();
    $('#play').addClass('disabled');
    $('#pause').removeClass('disabled');
}

function pauseMusic() {
    $('#song')[0].pause();
    $('#play').removeClass('disabled');
    $('#pause').addClass('disabled');
}

function onMusicEnded() {
    $('#play').removeClass('disabled');
    $('#pause').addClass('disabled');
}

function openCard() {
  
    if( $('#card').data('open') === 'true' ) return;

    $('#frontpage')[0].addEventListener('webkitTransitionEnd', function(event) {
	// Animation half way there, now need to animate the second half
        $('#firstinnerpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(-180deg)');
        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

    $('#firstinnerpage')[0].addEventListener('webkitTransitionEnd', function(event) {
	// Animation complete
	$('#card').data('open','true');	
	playMusic();
	this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

    $('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateY(-90deg)');

    // Experiment to see if I can get something working on Firefox
    $('#frontpage').css('-moz-transform','translateY(-180deg)');
    
}

function closeCard() {

    if( $('#card').data('open') !== 'true' ) return;

    $('#firstinnerpage')[0].addEventListener('webkitTransitionEnd', function(event) {
	// Animation half way there, now need to animate the second half
        $('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(0deg)');
        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

    $('#frontpage')[0].addEventListener('webkitTransitionEnd', function(event) {
	// Animation complete
	$('#card').data('open','false');
    }, false);

    $('#firstinnerpage').css('-webkit-transition','-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateY(-90deg)');

    pauseMusic();

}
