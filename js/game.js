/* Main Game */

Game = (function () {

	var s;

	return {

		settings: {

			score: 0,
			timer: 1000,
			multiplier: 1,
			sps: 1,
			speedIncrease: 0.5

		},

		checkSave: function () {

			if(typeof(Storage) !== "undefined") {

			    var savedScore = localStorage.getItem('Game.score');
			
			    s.score = parseInt(savedScore);

			} else {

			    alert('Your browser does not support local storage');

			}

		},

		save: function (score) {

			localStorage.setItem('Game.score', score);
			
		},

		init: function () {

			s = this.settings;

			// Check for stored
			Game.checkSave();
			
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
				Game.addScore(s.score, s.sps)
				Game.updateScore(s.score);
			});

			$('a.mod').on('click', function () {
				Game.addModifier($(this).attr('data-modifier'), $(this));
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

		addModifier: function (options, el) {
				
			var cost = el.attr('data-cost');

			if (cost < s.score) {
				
				el.addClass('disabled').removeAttr('data-modifier');

				if (options == 'speed' ) {
					s.sps = s.sps * 2;
					Game.pay(cost);
					Game.save(s.score);
				}	

			} else {

				alert('Not enough clicks!');

			}

		},

		pay: function (cost) {

			s.score = s.score - cost;
			Game.updateScore(s.score);

		}

	}

})();