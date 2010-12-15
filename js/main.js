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

    // Enable snow on desktop, but it's too slow for iPhone/iPad
    if( screen.width > 1024 ) {
        renderSnow();
    }

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
	this.removeEventListener('webkitTransitionEnd', arguments.callee, false);
    }, false);

    $('#frontpage').css('-webkit-transition','-webkit-transform 1s ease-in').css('-webkit-transform', 'rotateY(-90deg)');

	  playMusic();

    // Experiment to see if I can get something working on Firefox
    //$('#frontpage').css('-moz-transform','translateY(-180deg)');
    
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

/* Lifted from JavaScript PixelPounding demos from github.com/sebleedelisle */
function renderSnow() {

    var SCREEN_WIDTH = window.innerWidth;
		var SCREEN_HEIGHT = window.innerHeight;

		var container;
    
		var particle;
    
		var camera;
		var scene;
		var renderer;
    
		var mouseX = 0;
		var mouseY = 0;
    
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		
		var particles = []; 
		var particleImage = new Image();
		particleImage.src = 'images/ParticleSmoke.png'; 
    
		init();
		setInterval( loop, 1000 / 60 );
    
		function init() {
        
				container = document.createElement('div');

        // Added by Peter
        container.style.position = 'absolute';
        container.style.top = '0';
        container.style.left = '0';

				document.body.appendChild(container);
        
				camera = new THREE.Camera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
				camera.position.z = 1000;
        
				scene = new THREE.Scene();
        
				renderer = new THREE.CanvasRenderer();
				renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        
				for (var i = 0; i < 100; i++) {
            
					  particle = new Particle3D( new THREE.ParticleBitmapMaterial( particleImage));
					  particle.position.x = Math.random() * 2000 - 1000;
					  particle.position.y = Math.random() * 2000 - 1000;
					  particle.position.z = Math.random() * 2000 - 1000;
					  particle.scale.x = particle.scale.y =  1;
					  scene.addObject( particle );
					  
					  particles.push(particle); 
				}
        
        // Added by Peter
        renderer.domElement.style.position = 'absolute';

				container.appendChild( renderer.domElement );
	      
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		}
    
		function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;
		}
    
		function loop() {
        
				for(var i = 0; i<particles.length; i++) {
				    
					  var particle = particles[i]; 
					  particle.update(); 
					  
					  with(particle.position) {
						    if(y<-1000) y+=2000; 
						    if(x>1000) x-=2000; 
						    else if(x<-1000) x+=2000; 
						    if(z>1000) z-=2000; 
						    else if(z<-1000) z+=2000; 
					  }				
				}
        
				camera.position.x += ( mouseX - camera.position.x ) * 0.05;
				camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        
				renderer.render( scene, camera );
        
		}
    
}
    
