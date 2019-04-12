<template>

	<div class="container m-2">

		<h2>MARATHON</h2>
		<board :num_next_pieces="num_next_pieces"></board>


		<button class="btn btn-sm btn-primary float-right" data-toggle="modal" :data-target="'#'+this.id_modal" @click="startMarathon()">Start</button>
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
				next_pieces : []

			}
		},

		methods : {

			startMarathon(){
				// Manda el evento al hijo CountDownModal
				var marathon = this;

				bus.$emit("makeCountdown", function(){
					console.log("go");

					marathon.in_game = true;
					marathon.fillNextPieces();
					
					marathon.getNextPiece();

					var clock = setInterval(function(){

						if (!marathon.moving_piece) {
							marathon.getNextPiece();
						}
						
						marathon.fillNextPieces();

						console.log("move");



					}, 1500);
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
		}
	}
</script>

<style type="text/css" scoped>
	h2{
		font-weight: bolder;

		color : var(--white);
		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	}
</style>