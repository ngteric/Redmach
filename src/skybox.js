(function(ctx){

	var skybox = {

		init: function(){

			this.drawSky();
			console.log('init skybox ...');

		},

		drawSky: function(){

			var w = redmach.webgl;

			var imagePrefix = "../assets/";
			var urls = [imagePrefix + "px.jpg",imagePrefix + "nx.jpg", imagePrefix + "py.jpg", imagePrefix + "ny.jpg",imagePrefix + "pz.jpg",imagePrefix + "nz.jpg"];

			w.textureCube = new THREE.CubeTextureLoader();
			var skybox;
			
			w.textureCube.load(urls, function(texture){

				var shader_cube = THREE.ShaderLib["cube"];
				shader_cube.uniforms["tCube"].value = texture;

				var material_cube = new THREE.ShaderMaterial({
					fragmentShader:shader_cube.fragmentShader,
					vertexShader:shader_cube.vertexShader,
					uniforms:shader_cube.uniforms,
					depthWrite:false,
					side: THREE.BackSide
				});
				skybox = new THREE.Mesh(new THREE.BoxGeometry(1024,1024,1024),material_cube);
				skybox.position.set(0,-125,0);
				w.scene.add(skybox);
			});	
		}

	
	};

	var self = skybox;
	ctx.skybox = skybox;

})(redmach);