<template>	
	<div class="container">
		<div class="row">
			<div class="col-8">
				
				<div class="board_grid container-fluid rounded">
					<div v-for="i in grid.height" class="board_row row">
						<!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 m-0 d-none"><div class="dummy">&nbsp;</div></div> -->
						<div v-for="j in grid.width" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 rounded board_cell" :id="'cell_'+(i-1)+'_'+(j-1)">
							<!-- <div class="dummy">&nbsp;</div> -->
						</div>			
						<!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 m-0 d-none"><div class="dummy">&nbsp;</div></div> -->
					</div>
				</div>
			</div>

			<div class="col-4">
				
				<nextpiece :num_next_pieces="num_next_pieces"></nextpiece>
			</div>
		</div>
	</div>

</template>

<script>
	import NextPiece from "./NextPiece.vue"
	import {bus} from "../main.js"


	export default {
		name: 'app',
		components : {
			nextpiece : NextPiece,
		},

		data () {
			return {
				grid : {
					height : 20,
					width  : 10
				},
				curr_piece : null
			}
		},
		props : {
			num_next_pieces : Number,
		},
		methods:{
			paintPiece() {
				console.log("pinto pieza " + this.curr_piece );
				switch (this.curr_piece) {
					case 0: // I
						$("#cell_0_3").css("background-color" , "cyan");
						$("#cell_0_4").css("background-color" , "cyan");
						$("#cell_0_5").css("background-color" , "cyan");
						$("#cell_0_6").css("background-color" , "cyan");
					break;
					case 1: // T
						$("#cell_0_4").css("background-color" , "purple");
						$("#cell_0_5").css("background-color" , "purple");
						$("#cell_0_6").css("background-color" , "purple");
						$("#cell_1_5").css("background-color" , "purple");
					break;
					case 2: // cuadrado
						$("#cell_0_4").css("background-color" , "yellow");
						$("#cell_0_5").css("background-color" , "yellow");
						$("#cell_1_4").css("background-color" , "yellow");
						$("#cell_1_5").css("background-color" , "yellow");
					break;
					case 3: // Z
						$("#cell_0_3").css("background-color" , "green");
						$("#cell_0_4").css("background-color" , "green");
						$("#cell_0_5").css("background-color" , "green");
						$("#cell_1_4").css("background-color" , "green");
					break;
					case 4: // S
						$("#cell_0_4").css("background-color" , "red");
						$("#cell_0_5").css("background-color" , "red");
						$("#cell_1_4").css("background-color" , "red");
						$("#cell_1_5").css("background-color" , "red");
					break;
					case 5: // L
						$("#cell_0_4").css("background-color" , "blue");
						$("#cell_0_5").css("background-color" , "blue");
						$("#cell_1_4").css("background-color" , "blue");
						$("#cell_1_5").css("background-color" , "blue");
					break;
					case 6: // L
						$("#cell_0_4").css("background-color" , "orange");
						$("#cell_0_5").css("background-color" , "orange");
						$("#cell_1_4").css("background-color" , "orange");
						$("#cell_1_5").css("background-color" , "orange");
					break;
				}
			}

		},

		created(){
			// Escucha el bus
			bus.$on("paintPiece",(piece) => {  
				this.curr_piece = piece;
				this.paintPiece(); 
			});
		}

	}
</script>

<style type="text/css" scoped>
	.dummy {
		margin-top: 100%;

	}
	.board_grid{
		width: 45%;
	}
	.board_row{
		background-color: black;
		max-width: 270px; /** 10 * 25 + 10 * 2 */
		min-width: 270px; /** 10 * 25 + 10 * 2 */

	}
	.board_cell{
		max-height: 25px;
		min-height: 25px;
		max-width: 25px;
		min-width: 25px;
		
		background-color: #1a1a1a;

		margin: 1px !important;
		padding: 0px !important;
	}
</style>