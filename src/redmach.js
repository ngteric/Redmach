(function(ctx){

	var redmach = {

		webgl:{},
		config: {
			debug: false
		},
		gameover : document.getElementById('gameover'),
		gamestart : document.getElementById('gamestart'),
		speed: 1,
		phase1:{
			status:true,
			speed:1,
			message:'Phase 1'
		},
		phase2:{
			status:false,
			speed:1.5,
			message:'Phase 2'
		},

		init: function(){

			this.init_webgl();
            this.ship.init();
            this.floor.init();
            this.skybox.init();
            this.wall.init();
            this.score.init();

			console.log('mygame is ready to rock !');
			return this;
		},
		init_webgl: function(){

			var w = this.webgl;

            Physijs.scripts.worker = '/vendor/physijs_worker.js';
            Physijs.scripts.ammo = '/vendor/ammo.js';

			w.scene = new Physijs.Scene;
            w.scene.setGravity(new THREE.Vector3( 0,0,0 ));
			w.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight,1,10000 );
			w.camera.position.set(0,5,15);

			document.body.style.margin = 0;
			document.body.style.overflow = 'hidden';

			w.renderer = new THREE.WebGLRenderer({ canvas: my_game });
			w.renderer.setSize(window.innerWidth, window.innerHeight);
			// document.body.appendChild(w.renderer.domElement);

			// CONTROLS
			//w.controls = new THREE.OrbitControls( w.camera, w.renderer.domElement );

			var light = new THREE.PointLight(0xFFFFFF);
			light.position.set(0,15,0);
			w.scene.add(light);

			var ambient = new THREE.AmbientLight(0x333333);
			w.scene.add(ambient);

		
			if(this.config.debug === true){

				w.stats = new Stats();
				w.stats.setMode( 0 ); // 0: fps, 1: ms, 2: mb

				w.stats.domElement.style.position = 'absolute';
				w.stats.domElement.style.left = '0px';
				w.stats.domElement.style.top = '0px';

				document.body.appendChild( w.stats.domElement );

				var axisHelper = new THREE.AxisHelper( 10 );
				axisHelper.position.set(0,0,7);
				w.scene.add( axisHelper );

				console.log('====== DEBUG ON ======');
			}
			console.log('Webgl is ready !');
		},
		start: function(){
			console.log(' *** MYGAME IS STARTED *** ');
		},
		menu: function(){
			this.init_webgl();
            this.ship.init();
            this.floor.init();
            this.skybox.init();
            this.sound.init();

			redmach.animate();
		},
		restart:function(){
			redmach.webgl = {};
			redmach.wall.tabObstacle = [];
			redmach.wall.tabRespawn = [];
			redmach.grid1 = {};
			redmach.grid2 = {};
			redmach.score.stop = false;
			redmach.phase1.status = true;
			redmach.phase2.status = false;
			redmach.gameover.style.display='none';
			this.init();
		},
		animate: function(){
			if(redmach.config.debug === true) redmach.webgl.stats.begin();
			
			redmach.floor.gridMove();
			redmach.wall.animate();
			redmach.ship.animate();
			redmach.score.animate();
            
			if(redmach.config.debug === true) redmach.webgl.stats.end();
            redmach.webgl.scene.simulate(); 
			requestAnimationFrame( redmach.animate );
            
			redmach.webgl.renderer.render(redmach.webgl.scene, redmach.webgl.camera);
		}
	};
    
	ctx.redmach = redmach;

})(window);