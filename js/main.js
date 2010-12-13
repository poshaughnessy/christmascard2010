$(function() {

    drawTree();

    $('#play').click(function(event) {
        playMusic();
        event.preventDefault();
    });

    $('#pause').click(function(event) {
        pauseMusic();
        event.preventDefault();
    });

    $('#frontpage').click(function(event) {
        openCard();
        event.preventDefault();
    });

    $('#firstinnerpage').click(function(event) {
        closeCard();
        event.preventDefault();
    });

    document.addEventListener('keydown', function(e) { keyHandle(e); }, false);

});

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

function openCard() {
  
    if( $('#card').data('open') === 'true' ) return;

    $('#frontpage')[0].addEventListener('webkitTransitionEnd', function(event) {
        $('#firstinnerpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(-180deg)');
        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

    $('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateY(-90deg)');

    $('#card').data('open','true');

    playMusic();
    
}

function closeCard() {

    if( $('#card').data('open') !== 'true' ) return;

    $('#firstinnerpage')[0].addEventListener('webkitTransitionEnd', function(event) {
        $('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-out').css('-webkit-transform', 'rotateY(0deg)');
        this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

    $('#firstinnerpage').css('-webkit-transition','-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateY(-90deg)');

    $('#card').data('open','false');

    pauseMusic();

}
