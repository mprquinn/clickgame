/* Main Game */

Game = (function () {

	var s;

	return {

		settings: {
			score: 0,
			timer: 1000,
			multiplier: 1,
			sps: 1
		},

		init: function () {
			s = this.settings;
			window.setInterval(function () {
				Game.gameLoop();
			}, s.timer);
			this.bindUI();
		},

		gameLoop: function () {
			this.addScore(s.score, s.sps);
			this.updateScore(s.score);
		},

		bindUI: function () {
			// click game
			$('a.button').on('click', function () {
				console.log('clicked');
				Game.addScore(s.score, s.sps)
				Game.updateScore(s.score);
			});

			$('a.mod').on('click', function () {
				console.log($(this).attr('data-modifier'));
			});
		},

		addScore: function (score, add) {
			score = (score + add) * s.multiplier;
			s.score = score;
		},

		updateScore: function (score) {
			$('h2.score').text('Your score: ' + score);
			$('title').text(score);
		},

		addModifier: function (options) {
			console.log(options);
		}

	}

})();