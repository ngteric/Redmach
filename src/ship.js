(function(ctx){

	var ship = {

		spaceship:null,
        spaceshipBody:null,
		rotateLeft:false,
		rotateRight:false,
		slowMotion:false,

		init: function(){

			this.drawShip();

			document.addEventListener( 'keydown', self.onKeyDown, false );
			document.addEventListener( 'keyup', self.onKeyUp, false );

			console.log('init ship ...');
		},

		collide: function( collided_with, linearVelocity, angularVelocity ) {
			if(this.collisions == 0){
				redmach.gameover.style.display='block';
				document.getElementById('score').style.display='none';
				redmach.score.stop = true;
				document.querySelector('#gameover span').innerHTML = redmach.score.count;
				console.log('GAME OVER');
			}
		},
		drawShip: function(){

			var w = redmach.webgl;
            var c = redmach.cannon;
				
			w.loader = new THREE.JSONLoader();

			w.loader.load("../models/ship.json",function(geometry) {

				var material = new THREE.MeshPhongMaterial({
					color:0xff0000,
				});
				self.spaceship = new Physijs.BoxMesh(geometry, material);
				self.spaceship.position.set(0,0,0);
                self.spaceship.rotation.y = Math.PI;
                self.spaceship.collisions = 0;
                self.spaceship.castShadow = true;
                self.spaceship.addEventListener('collision', self.collide );

				w.scene.add(self.spaceship);
			});
		},
		onKeyDown : function ( event ) {
			switch ( event.keyCode ) {
				case 37: // left
					self.rotateLeft = true;
					break;

				case 39: // right
					self.rotateRight = true;
					break;

				case 40:
					self.slowMotion = true;
					break;
			}
		},
		onKeyUp : function ( event ) {
			switch( event.keyCode ) {
				case 37: // left
					self.rotateLeft = false;
					break;

				case 39: // right
					self.rotateRight = false;
					break;

				case 40:
					self.slowMotion = false;
					break;
			}
		},
		animate : function(){
			if(self.spaceship){
               
                self.spaceship.__dirtyRotation = true;
                // a regler !!!
                self.spaceship.rotation.z += self.spaceship.rotation.z * 0.002;
                
                if(self.rotateLeft){
					self.spaceship.rotation.z -= .08 * redmach.speed;
				}
				if(self.rotateRight){
					self.spaceship.rotation.z += .08 * redmach.speed;
				}

				if(self.slowMotion){
					redmach.speed = 0.3;
					if(redmach.webgl.camera.position.z >= 10){
						redmach.webgl.camera.position.z -=0.05;
					}
				}
				else{
					if(redmach.phase1.status){
						redmach.speed = redmach.phase1.speed;
					}
					if(redmach.phase2.status){
						redmach.speed = redmach.phase2.speed;
					}
					if(redmach.webgl.camera.position.z <= 15){
						redmach.webgl.camera.position.z +=0.02;
					}
				}
                
			}
		}
	};

	var self = ship;
	ctx.ship = ship;

})(redmach);