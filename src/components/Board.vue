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
				gridArr : [],
				
				curr_piece : null,
				curr_positions : [],

				stickymode : false
			}
		},
		props : {
			num_next_pieces : Number,
		},
		methods:{
			getEmptyField(){
				return {
							color : "#1a1a1a",
							using : false,
							locked : false
						};
			},

			resetBoard() {
				this.gridArr = [];
				this.curr_piece = null;

				for(let i = 0; i < this.grid.height; i++){
					this.gridArr.push([]);
					for(let j = 0; j < this.grid.width; j++){
						this.gridArr[i].push(this.getEmptyField());
					}
				}
				this.repaintBoard();
			},
			checkLines(){
				for(let i = 0; i < this.gridArr.length; i++){
					let deleteLine = true;
					let emptyRow = [];
					for(let j = 0; j < this.gridArr[i].length; j++){
						deleteLine &= !this.gridArr[i][j].using && this.gridArr[i][j].locked;

						emptyRow.push(this.getEmptyField());
					}

					if (deleteLine) {
						// console.log("borrando linea " + i);
						this.gridArr.splice(i, 1); 
						this.gridArr.splice(0, 0, emptyRow);
					}
				}
			},
			repaintBoard() {
				this.checkLines();

				let gameOver = false;
				// console.log("repaintBoard");
				this.curr_positions = [];
				for(let i = 0; i < this.gridArr.length; i++){
					for(let j = 0; j < this.gridArr[i].length; j++){
						if(this.gridArr[i][j].using){
							this.curr_positions.push([i,j]);
						
							gameOver |= this.gridArr[i][j].locked;
						}
						

						$("#cell_"+i+"_"+j+"").css("background-color",this.gridArr[i][j].color);
					}
				}

				if (gameOver) {
					alert("GAME OVER");
					bus.$emit("gameOver", function(){});

				}
			},
			paintNewPiece() {
				// console.log("pinto pieza " + this.curr_piece );
				
				var piecePositions = [];
				var color = "#1a1a1a";

				switch (this.curr_piece) {
					case 0: // I
						piecePositions = [[0,3] , [0,4] , [0,5] , [0,6]];
						color = "cyan";
					break;
					case 1: // T
						piecePositions = [[0,4] , [0,5] , [0,6] , [1,5]];
						color = "purple";
					break;
					case 2: // []
						piecePositions = [[0,4] , [0,5] , [1,4] , [1,5]];
						color = "yellow";
					break;
					case 3: // Z
						piecePositions = [[0,4] , [0,5] , [1,5] , [1,6]];
						color = "green";
					break;
					case 4: // S
						piecePositions = [[0,5] , [0,6] , [1,4] , [1,5]];
						color = "red";
					break;
					case 5: // L
						piecePositions = [[0,4] , [0,5] , [0,6] , [1,4]];
						color = "blue";
					break;
					case 6: // L
						piecePositions = [[0,4] , [0,5] , [0,6] , [1,6]];
						color = "orange";
					break;
				}
				
				for (let k in piecePositions) {
					let i = piecePositions[k][0];
					let j = piecePositions[k][1];

					this.gridArr[i][j].color = color;
					this.gridArr[i][j].using = true;
				}

				// console.log(this.gridArr);

				this.repaintBoard();
			},
			handleMovement(keyPressed){
				if(this.curr_piece != null){
					// alert(keyPressed);
					switch(keyPressed.toLowerCase() ){
						case "arrowdown": 	this.movePieceDown();	break;
						case "arrowup": 	this.dropPiece();		break;
						case "arrowleft": 	this.movePieceLeft();	break;
						case "arrowright": 	this.movePieceRight();	break;
						case "shift": 		this.savePiece();		break;
					}
				}
			},
			movePieceDown(){
				let canMove = true;
				let tempColor = null;

				for (let k in this.curr_positions) {
					let i = this.curr_positions[k][0];
					let j = this.curr_positions[k][1];

					tempColor = this.gridArr[i][j].color;

					canMove = canMove && i+1 < this.gridArr.length && (
						( this.gridArr[i+1][j].using) ||
						(!this.gridArr[i+1][j].using && !this.gridArr[i+1][j].locked)
					);
		
					// console.log("Can move ("+i+" , "+j+") to ("+(i+1)+" , "+j+") ? " + canMove);
				}
				
				if(canMove){
					// primero borra
					for (let k in this.curr_positions) {
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j].using = false;
						this.gridArr[i][j].color = "#1a1a1a";
						this.gridArr[i][j].locked = false;
					}
					// luego repinta
					for (let k in this.curr_positions) {
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i+1][j].using = true;
						this.gridArr[i+1][j].color = tempColor;
						this.gridArr[i+1][j].locked = false;
					}
				} else {
					for (let k in this.curr_positions) {
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j].using = false;
						this.gridArr[i][j].locked = true;
					}

					bus.$emit("notMovingPiece", function(){});
				}

				this.repaintBoard();
			},
			movePieceLeft(){
				let canMove = true;
				let tempColor = null;

				for (let k in this.curr_positions) {
					let i = this.curr_positions[k][0];
					let j = this.curr_positions[k][1];

					tempColor = this.gridArr[i][j].color;

					canMove = canMove && j-1 >= 0 && j-1 < this.gridArr[i].length && (
						( this.gridArr[i][j-1].using) ||
						(!this.gridArr[i][j-1].using && !this.gridArr[i][j-1].locked)
					);
					
					// console.log("Can move ("+i+" , "+j+") to ("+(i)+" , "+(j-1)+") ? " + canMove);
				}
				
				if(canMove){
					// primero borra
					for(let k = 0; k < this.curr_positions.length; k++){
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j].using = false;
						this.gridArr[i][j].color = "#1a1a1a";
						this.gridArr[i][j].locked = false;
					}
					// luego repinta
					for(let k = 0; k < this.curr_positions.length; k++){
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j-1].using = true;
						this.gridArr[i][j-1].color = tempColor;
						this.gridArr[i][j-1].locked = false;
					}
				} else if (this.stickymode) {
					for(let k = 0; k < this.curr_positions.length; k++){
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j].using = false;
						this.gridArr[i][j].locked = true;
					}

					bus.$emit("notMovingPiece", function(){});
				}

				this.repaintBoard();
			},
			movePieceRight(){
				let canMove = true;
				let tempColor = null;

				for (let k in this.curr_positions) {
					let i = this.curr_positions[k][0];
					let j = this.curr_positions[k][1];

					tempColor = this.gridArr[i][j].color;

					canMove = canMove && j+1 >= 0 && j+1 < this.gridArr[i].length && (
						( this.gridArr[i][j+1].using) ||
						(!this.gridArr[i][j+1].using && !this.gridArr[i][j+1].locked)
					);
					
					//console.log("Can move ("+i+" , "+j+") to ("+(i)+" , "+(j+1)+") ? " + canMove);
				}
				
				if(canMove){
					// primero borra
					for(let k = 0; k < this.curr_positions.length; k++){
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j].using = false;
						this.gridArr[i][j].color = "#1a1a1a";
						this.gridArr[i][j].locked = false;
					}
					// luego repinta
					for(let k = 0; k < this.curr_positions.length; k++){
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j+1].using = true;
						this.gridArr[i][j+1].color = tempColor;
						this.gridArr[i][j+1].locked = false;
					}
				} else if (this.stickymode) {
					for(let k = 0; k < this.curr_positions.length; k++){
						let i = this.curr_positions[k][0];
						let j = this.curr_positions[k][1];
						this.gridArr[i][j].using = false;
						this.gridArr[i][j].locked = true;
					}

					bus.$emit("notMovingPiece", function(){});
				}

				this.repaintBoard();
			},
			
			dropPiece(){

			},

			savePiece(){

			}

		},

		created(){
			// Crea estructura de tablero
			this.resetBoard();

			// Mete un listener para ver que botones se pulsan
			window.addEventListener('keydown', (e) => {
			    this.handleMovement(e.key);
			});

			// Escucha el bus
			bus.$on("paintPiece",(piece) => {  
				this.curr_piece = piece;
				this.paintNewPiece(); 
			});
			
			bus.$on("resetBoard",(piece) => {  
				this.resetBoard(); 
			});
			bus.$on("movePieceDown",(piece) => {  
				this.movePieceDown();
			});

			this.repaintBoard();
		},
		beforeMount(){ this.repaintBoard(); },
		mounted(){ this.repaintBoard(); },
		updated(){ this.repaintBoard(); },


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
		
		

		margin: 1px !important;
		padding: 0px !important;
	}
</style>