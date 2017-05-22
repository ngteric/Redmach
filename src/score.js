(function(ctx){

	var score = {

		stop:false,
		count : 0,
		countElmt : null,

		init: function(){
			self.count = 0;
			self.countElmt = document.getElementById('countElmt');
			this.message();
			console.log('init score ...');
		},
		animate: function(){
			if(self.countElmt && self.stop === false){
				self.countElmt.innerHTML = self.count++;
				if(self.count >= 2000){
					if(redmach.phase1.status){
						redmach.speed = redmach.phase2.speed;
						redmach.phase1.status = false;
						redmach.phase2.status = true;
						this.message();
					}
				}
			}
		},
		message: function(){
			var phase = document.getElementById('level');
			if(redmach.phase1.status) phase.innerHTML = redmach.phase1.message;
			if(redmach.phase2.status) phase.innerHTML = redmach.phase2.message;
		}
		
	};

	var self = score;
	ctx.score = score;

})(redmach);