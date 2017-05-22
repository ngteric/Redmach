(function(ctx){

	var floor = {

		grid1:{},
		grid2:{},

		init: function(){

			this.drawGrid();
			console.log('init floor ...');

		},

		drawGrid: function(){

			var w = redmach.webgl;

			self.grid1 = new THREE.GridHelper( 300, 5 );
			self.grid1.position.z = -300;
			self.grid1.position.y = - 1;
			self.grid1.setColors(0x5bfdff,0x5bfdff);
			self.grid1.material.opacity = 0.25;
			self.grid1.material.transparent = true;

			self.grid2 = new THREE.GridHelper( 300, 5 );
			self.grid2.position.z = - 900;
			self.grid2.position.y = - 1;
			self.grid2.setColors(0x5bfdff,0x5bfdff);
			self.grid2.material.opacity = 0.25;
			self.grid2.material.transparent = true;


			w.scene.add( self.grid1 );
			w.scene.add( self.grid2 );
		},

		gridMove: function(){
			self.grid1.position.z += 1 * redmach.speed;
			if(self.grid1.position.z >= 300){
				self.grid1.position.z = -900;
			}

			self.grid2.position.z += 1 * redmach.speed;
			if(self.grid2.position.z >= 300){
				self.grid2.position.z = -900;
			}
		}
	
	};

	var self = floor;
	ctx.floor = floor;

})(redmach);