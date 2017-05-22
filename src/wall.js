(function(ctx){

	var wall = {
        patternBody:null,
		pattern : [
			{
				style:'cube',
				width:15,
				height:15,
				plane: {x :19, y : -10, z : 0 },
				plane2: {x : -19, y : 0, z : 0 },
				position : {x : 9.5, y : 0, z : 0 },
			},
			{
				style:'cube',
				width:15,
				height:6,
				plane: {x : 0, y : 10, z : 0 },
				plane2: {x : 0, y : -10, z : 0 },
				position : {x : 0, y : 5, z : 0 },
			},
			{
				style:'triangle',
				triangle:{x : 20, y : 30, z : 0 },
				triangle2:{x : 15, y : 8, z : 0 },
				position : {x : -7, y : -3, z : 0 },
			}
		],
		tabObstacle : [],
		tabRespawn : [],
		init: function(){
            var c = redmach.cannon;
            
			this.tabObstacle = this.randomize();
			for (var i = 0; i < this.tabObstacle.length; i++) {
				redmach.webgl.scene.add(this.tabObstacle[i]);
			};
		},
		buildWall: function(pattern){
				var w = redmach.webgl;

				if(pattern.style === 'cube'){
					var geometry = new THREE.BoxGeometry( pattern.width, pattern.height, 1, 1, 1, 1);
					var material = new THREE.MeshBasicMaterial( {
						color: 0x5bfdff,
						transparent:true,
						opacity:0.5,
						side: THREE.DoubleSide
					} );
					var plane = new Physijs.BoxMesh( geometry, material, 0 );
					plane.position.set( pattern.plane.x, pattern.plane.y, pattern.plane.z );
					var plane2 = plane.clone();
					plane2.position.set( pattern.plane2.x, pattern.plane2.y, pattern.plane2.z );
                    
					plane.add(plane2);
					plane.position.set(pattern.position.x, pattern.position.y, pattern.position.z);
					return plane;
				}
				else if(pattern.style === 'triangle'){

					var triangleShape = new THREE.Shape();
					triangleShape.moveTo(  0, 15 );
					triangleShape.lineTo(  15, 0 );
					triangleShape.lineTo( 15, 15 );
					triangleShape.lineTo(  15, 15 ); // close path

					var extrudeSettings = { amount: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 1, bevelThickness: 1 };

					var geometry = new THREE.ExtrudeGeometry( triangleShape, extrudeSettings );
					var triangle = new Physijs.ConvexMesh( geometry, new THREE.MeshPhongMaterial( { 
						color: 0x5bfdff,
						transparent:true,
						opacity:0.5,
						side: THREE.DoubleSide,
					 } ), 0 );

					triangle.position.set( pattern.triangle.x, pattern.triangle.y, pattern.triangle.z );

					var triangle2 = triangle.clone();

					triangle2.position.set( pattern.triangle2.x, pattern.triangle2.y, pattern.triangle2.z );
					triangle2.rotation.z =  -45 * Math.PI;
			
					triangle.add(triangle2);
					triangle.position.set(pattern.position.x, pattern.position.y, pattern.position.z);
					return triangle;
				}
		},
		randomize : function(){

			var tabObstacle = [];
			var pos = 4;
			var random;
			for (var i = 0; i < 3; i++) {
				wall.pattern[i].position.z = - (pos * 100);
				pos++;
				var obstacle = this.buildWall( wall.pattern[i] );
				tabObstacle.push( obstacle );
			}
			for (var i = 0; i < 3; i++) {
				random = Math.floor(Math.random() * 3);
				wall.pattern[random].position.z = - (pos * 100);
				pos++;
				var obstacle = this.buildWall( wall.pattern[random] );
				tabObstacle.push( obstacle );
			};
			return tabObstacle;
		},
		respawn : function(respawn){
				var random;
				var pos = 4;
				for (var i = 0; i < 3; i++) {
					random = Math.floor(Math.random() * respawn.length);
					respawn[random].position.z = - (pos * 100);
					pos ++;
					this.tabObstacle.push(respawn[random]);
					respawn.splice(random, 1);
				};
		},
		animate : function(){
			for (var i = 0; i < this.tabObstacle.length; i++) {
				this.tabObstacle[i].__dirtyPosition = true;
				this.tabObstacle[i].position.z += 1.5 * redmach.speed;
				if(this.tabObstacle[i].position.z >= 15){
					this.tabRespawn.push(this.tabObstacle.shift());
					if(this.tabRespawn.length === 3){
						this.respawn(this.tabRespawn);
						this.tabRespawn = [];
					}
				}
			};
		}
	};

	var self = wall;
	ctx.wall = wall;

})(redmach);