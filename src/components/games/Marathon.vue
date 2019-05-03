<template>

	<div class="container m-2">

		<h2>MARATHON</h2>
		<board :num_next_pieces="num_next_pieces"></board>


		<button class="btn btn-sm btn-primary float-right" id="btn_start_maraton" data-toggle="modal" :data-target="'#'+this.id_modal" @click="startMarathon()">Start</button>
		<countdownmodal :id_modal="this.id_modal" :countdownvalue="3"></countdownmodal>

	</div>
</template>

<script>
	import Board from "../Board.vue"
	import CountDownModal from "../CountDownModal.vue"
	import {bus} from "../../main.js"

	export default {
		name: 'app',
		components:{
			board : Board,
			countdownmodal : CountDownModal,
		},

		data () {
			return {
				id_modal : "countDownModal",

				num_next_pieces : 3,

				in_game : false,
				moving_piece : false,
				curr_piece : -1,
				next_pieces : [],

				timeInterval : 1500,
				linesToBeat : 50,

				clock : null

			}
		},

		methods : {

			startMarathon(){
				var MTH = this;

				bus.$emit("resetBoard", function(){});


				bus.$emit("makeCountdown", function(){
					console.log("go");

					MTH.in_game = true;
					MTH.fillNextPieces();
					
					MTH.getNextPiece();

					MTH.clock = setInterval(function(){

						if (!MTH.moving_piece) {
							MTH.getNextPiece();
						}
						
						MTH.fillNextPieces();

						console.log("move | " + MTH.curr_piece +" |" + MTH.next_pieces);

						bus.$emit("movePieceDown", function(){

						});

					}, MTH.timeInterval);
				});
			},
			getNextPiece(){
				this.curr_piece = this.next_pieces.shift();
				this.moving_piece = true;

				bus.$emit("paintPiece", this.curr_piece);

			},

			fillNextPieces(){
				while (this.next_pieces.length != this.num_next_pieces) {
					this.addPiece();
				}
				console.log(this.next_pieces);
			},
			addPiece(){
				let rnd = parseInt(Math.random() * (6 - 0) + 0);
				this.next_pieces.push(rnd);
			}
		},

		created(){

			// Escucha el bus
			bus.$on("notMovingPiece",(piece) => {  
				this.getNextPiece();
				this.fillNextPieces();
			});
			bus.$on("gameOver",(piece) => { 
				clearTimeout(this.clock);
			});
		},

	}
</script>

<style type="text/css" scoped>
	h2{
		font-weight: bolder;

		color : var(--white);
		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	}
</style>