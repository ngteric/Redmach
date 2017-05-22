(function(ctx){

	var sound = {
		engine : null,
		source : null,
		init: function(){

			this.onload();
			this.play();
			console.log('sound rocks ...');
		},
		onload: function() {
		    self.engine = new jWebAudio.SoundEngine();
		    self.source = self.engine.addSoundSource({
		        'url': '../assets/sound/redmach.mp3',
		        'loop' : true,
		    });
		},
		play: function() {
		    self.source.load(function() {
		        self.source.sound.play();
		    });
		}
	};

	var self = sound;
	ctx.sound = sound;

})(redmach);