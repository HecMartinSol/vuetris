<template>

	<div class="container m-2">

		<h2>MARATHON</h2>
		<board></board>
		<nextpiece></nextpiece>



		<button class="btn btn-sm btn-primary float-right" data-toggle="modal" :data-target="'#'+this.id_modal" @click="startMarathon()">Start</button>
		<countdownmodal :id_modal="this.id_modal" :countdownvalue="4"></countdownmodal>

	</div>
</template>

<script>
	import Board from "../Board.vue"
	import CountDownModal from "../CountDownModal.vue"
	import NextPiece from "../NextPiece.vue"
	import {bus} from "../../main.js"

	export default {
		name: 'app',
		components:{
			board : Board,
			countdownmodal : CountDownModal,
			nextpiece : NextPiece,
		},

		data () {
			return {
				id_modal : "countDownModal"
			}
		},

		methods : {

			startMarathon(){
				// Manda el evento al hijo CountDownModal
				bus.$emit("makeCountdown", function(){
					
					console.log("go")

				});
			},
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