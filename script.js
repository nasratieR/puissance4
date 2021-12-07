(function($) {
	$.fn.grid = function(x, y, p1_color, p2_color, name_p1, name_p2, turn) {

		if (p1_color == p2_color) {
			alert("Les joueurs ne peuvent avoir la meme couleurs.");
			return;
		}
		else if(x < 4 || y < 4)
		{
			alert("Vous devez entrez minimum une grille de 4x4");
			return; 
		}

		
		turn_indicator = 1; 
		col_indicator = ['']; 
		row_win_indicator = [];
		row_indicator = [];
		total_pion = x * y;
		cancel_p1 = 0; 
		cancel_p2 = 0; 
		string = "" 
		if (turn == '2') {
			turn_indicator++;
		}
		
		nextTurn(turn);

		
		score_p1 = localStorage.getItem('score_p1');
		score_p2 = localStorage.getItem('score_p2');

		
		displayPlayerColor('1', p1_color, name_p1);
		displayPlayerColor('2', p2_color, name_p2);
		displayScore(score_p1, score_p2);
		displayButton();

		createGrid(x, y);

		$('#reset_button').on('click', function() {
			location.reload();
			localStorage.removeItem("score_p1");
			localStorage.removeItem("score_p2");
		});

		$('#reset_game').on('click', function() {
			if(confirm('Etes vous sur de vouloir commencer une nouvelle partie ?'))
				{
					location.reload();
				}
		});

		
		$('#cancel').click(function() {
			cancelButton();
		});

		
		$('span').on('click', function() {
			PlayGame(this);
		});
		

		function displayPlayerColor(player, color, name) {
			$("#p" + player + "").attr("style", "color:" + color).append(name + " (" + color + ")<br>")
		}
		function displayScore(score_a, score_b) {
			$("#score").append('<a class="waves-effect waves-light btn">Score : ' + score_a + ' - ' + score_b + '</a><br><br>')
		}
		function displayButton() {
			$("#score").append('<a class="waves-effect waves-light btn" id="reset_game">Nouvelle Partie</a>').append("<input type='submit' class='waves-effect waves-light btn' value='Reset score' id='reset_button'>");
		}
		function createColumn(nb) {
			$('<span style="border: 4px solid black;border-radius: 100%;height:100Px; width:125Px;margin-left: 3%;">').html("").attr('class', 'col_' + nb).appendTo(".row_1");
		};
		function createRows(nb) {
			content = $(".row_1").html();
			$('<div style="display: inline-flex">').html(content).attr('class', 'row_' + nb).appendTo(".rows");
		};
		function createGrid(x, y) {
			for (it = 0; it < y; it++) {
				row_win_indicator[it] = [];
				for (it2 = 0; it2 < x; it2++) {
					row_win_indicator[it][it2] = "vide";
				}
			}

			$("#grid").append("<br>");

			$('<div>').html("").attr('class', 'row_1').appendTo("#grid");

			i = 1;
			while (i <= x) {
				createColumn(i);
				col_indicator.push(x);
				i++;
			}

			$("#grid").append("<br>")

	
		$('<div>').html("").attr('class', 'rows').appendTo("#grid"); 

			j = 2; 
			while (j < y + 1) {
				createRows(j);
				j++;
			}
		}

		function addPoint(position, color) {
			position.attr("style", "border: 4px solid black;background-color:" + color + ";border-radius: 100%;height:100Px; width:125Px;margin-left: 3%;margin-top:-100%").addClass('fill ' + color).animate({
				"margin-top": "0%"
			}, "slow");
		};

		function nextTurn(player) {
			if (player == "1") {
				$('#tour').fadeOut().fadeIn().html("Tour de " + name_p1)
			} else {
				$('#tour').fadeOut().fadeIn().html("Tour de " + name_p2)
			}
		};

		function PlayGame(obj) {



			a = 0;
			turn_indicator++; 



			if (total_pion == 0) {
				alert("Partie nulle. Fin du jeu");
				location.reload();
			}


			col = $(obj).attr("class");
			col_num = col.slice(-1);
			row_target = $(obj).parent('div').attr("class");

			point_first_row = $(".row_1").find("span").eq(col_num - 1);
			last_row = 'row_' + (j - 1);
			point_last_row = $(".rows").children("div." + last_row + "").find("span").eq(col_num - 1);
			point_top = $(".rows").children("div.row_" + col_indicator[col_num] + "").find("span").eq(col_num - 1);

			color = $(point_last_row).attr("style"); 
			color = color.split(';');

			
			if (turn_indicator % 2 == 0) {

				if (col_indicator[col_num] <= 0) {
					alert('Cette colonne est pleine !');
					total_pion++;
				}
				if (col_indicator[col_num] !== 1) {
					if (color.length == 6) {

						addPoint(point_last_row, p1_color);
						nextTurn("2");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						total_pion--;
						row_win_indicator[y - 1][col_num - 1] = p1_color
						last_row_play = y - 1;
						last_col_play = col_num - 1;
						//game.push('_')
					} else {


						addPoint(point_top, p1_color);
						nextTurn("2");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						col_indic = col_indicator[col_num];
						total_pion--;
						row_win_indicator[col_indic][col_num - 1] = p1_color
						last_row_play = col_indic;
						last_col_play = col_num - 1;
						//game.push('-')
					}
				} else {
					addPoint(point_first_row, p1_color);
					row_win_indicator[0][col_num - 1] = p1_color
					last_row_play = 0;
					last_col_play = col_num - 1;
					col_indicator[col_num] = col_indicator[col_num] - 1;
					total_pion--;

					//game.push('^')
				}
			}
			
			if (turn_indicator % 2 != 0) {

				if (col_indicator[col_num] <= 0) {
					alert('Cette colonne est pleine !');
					total_pion++;
				}
				if (col_indicator[col_num] !== 1) {
					if (color.length == 6) {
						addPoint(point_last_row, p2_color);
						nextTurn("1");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						total_pion--;
						row_win_indicator[y - 1][col_num - 1] = p2_color
						last_row_play = y - 1;
						last_col_play = col_num - 1;
						//game.push('|')
					} else {
						addPoint(point_top, p2_color);
						nextTurn("1");
						col_indicator[col_num] = col_indicator[col_num] - 1;
						col_indic = col_indicator[col_num];
						total_pion--;
						row_win_indicator[col_indic][col_num - 1] = p2_color
						last_row_play = col_indic;
						last_col_play = col_num - 1;
						//game.push('O')
					}
				} else {
					addPoint(point_first_row, p2_color);
					col_indicator[col_num] = col_indicator[col_num] - 1;
					row_win_indicator[0][col_num - 1] = p2_color
					total_pion--;
					last_row_play = 0;
					last_col_play = col_num - 1;
					//game.push('T')
				}
			}
			
			console.log(row_win_indicator);

			player1_win = p1_color + "," + p1_color + "," + p1_color + "," + p1_color;
			player2_win = p2_color + "," + p2_color + "," + p2_color + "," + p2_color;
			diago1_win = ""
			diago2_win = ""
			diago1_win2 = ""
			diago2_win2 = ""
			string = ""
			string2 = ""
			boucle = x;
			col_i = 1;

		
			while (boucle >= 0) {
				diago_droit = $(".rows").children("div.row_" + (boucle) + "").find("span").eq(col_num - (boucle - col_indicator[col_num]));
				diago_gauche = $(".rows").children("div.row_" + (col_i) + "").find("span").eq(col_num - (boucle + col_indicator[col_num]) - 1);
				string += diago_gauche.attr('class');
				string2 += diago_droit.attr('class');

				diago_droit_top = $(".rows").children("div.row_" + (boucle - 1) + "").find("span").eq(col_num - (boucle - col_indicator[col_num] - 1));
				boucle--;
				col_i++;
			}

			diago_col = col_num - 0; 
			limit = diago_col + 3; 

			while (diago_col <= limit) {
				diago1_win += "col_" + diago_col + " fill " + p1_color;
				diago2_win += "col_" + diago_col + " fill " + p2_color;
				diago_col++;
			}
			diago_col_inv = col_num - 3 
			limit_inv = diago_col_inv + 3 
			while (diago_col_inv <= limit_inv) {
				diago1_win2 += "col_" + diago_col_inv + " fill " + p1_color;
				diago2_win2 += "col_" + diago_col_inv + " fill " + p2_color;
				diago_col_inv++
			}

			if($(obj).attr("style").indexOf("background-color:red") !== -1 && col_indicator[col_num] <= 0)
			{
				alert('ok')
			}

			
			if (string.indexOf(diago1_win) !== -1 || string2.indexOf(diago1_win) !== -1 || string.indexOf(diago1_win2) !== -1 || string2.indexOf(diago1_win2) !== -1) {

				alert("Puissance 4 ! " + name_p1 + " a gagné (en diagonale) ");
				score_p1++;
				location.reload();
				window.localStorage.setItem("score_p1", score_p1);
			} else if (string.indexOf(diago2_win) !== -1 || string2.indexOf(diago2_win) !== -1 || string.indexOf(diago2_win2) !== -1 || string2.indexOf(diago2_win2) !== -1) {

				alert("Puissance 4 ! " + name_p2 + " a gagné (en diagonale) ");
				score_p2++;
				location.reload();
				window.localStorage.setItem("score_p2", score_p2);
			}
			while (a <= x - 1) {
				row = $(".row_" + a).find("span");
				if (row_win_indicator[a].toString().indexOf(player1_win) !== -1) {
					alert("Puissance 4 ! " + name_p1 + " a gagne (en horizontale)");
					location.reload();
					score_p1++;
					location.reload();
					window.localStorage.setItem("score_p1", score_p1);
				} else if (row_win_indicator[a].toString().indexOf(player2_win) !== -1) {
					alert('Puissance 4 ! ' + name_p2 + ' a gagne ! (en horizontale)')
					score_p2++;
					location.reload();
					window.localStorage.setItem("score_p2", score_p2);
				}
				a++;

			}
			for (z = 0; z < y; z++) {
				for (e = 0; e < x; e++) {
					if (row_win_indicator[z][e] === p1_color && row_win_indicator[z + 1][e] === p1_color && row_win_indicator[z + 2][e] === p1_color && row_win_indicator[z + 3][e] === p1_color) {
						alert("Puissance 4 ! " + name_p1 + " a gagne (en vertical)");
						score_p1++;
						location.reload();
						window.localStorage.setItem("score_p1", score_p1);
					} else if (row_win_indicator[z][e] === p2_color && row_win_indicator[z + 1][e] === p2_color && row_win_indicator[z + 2][e] === p2_color && row_win_indicator[z + 3][e] === p2_color) {
						alert("Puissance 4 ! " + name_p2 + " a gagne (en vertical)");
						score_p2++;
						location.reload();
						window.localStorage.setItem("score_p2", score_p2);
					}
				}
			}
			row_indicator = [];

		};

	};
})(jQuery);