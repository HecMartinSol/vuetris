<template>
	<div class="container-fluid" id="nextPiecesColumn">
		<div class="row">
			<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 rounded board_cell">
				<div id="nextPiece" class="text-center">
					<h5>NEXT</h5>
					<img src="https://picsum.photos/100/100?random" alt="..." class="img-thumbnail">
				</div>
			</div>
		</div>

		<div v-for="i in (this.num_next_pieces - 1)" class="row">
			<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 rounded board_cell">
				<div  id="nextPiece_mini">			
					<img src="https://picsum.photos/100/100?random" alt="..." class="img-thumbnail">
				</div>
			</div>
		</div>

		<br>

		<div class="row">
			<div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 rounded board_cell">
				<div id="nextPiece" class="text-center">
					<h5>SAVED</h5>
					<img src="https://picsum.photos/100/100?random" alt="..." class="img-thumbnail">
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
			}
		},
		props : {
			num_next_pieces : Number
		}
	}
</script>

<style type="text/css" scoped>
	#nextPiecesColumn{
		width: 150px;
	}
	#nextPiece{
		max-height: 130px;
		min-height: 130px;
		max-width: 130px;
		min-width: 130px;
		margin-bottom: 10px;
	}
	#nextPiece_mini{
		max-height: 80px;
		min-height: 80px;
		max-width: 80px;
		min-width: 80px;
		
		margin-top:    5px;
		margin-left:  25px;
		margin-right: 25px;
	}
	#nextPiece img, #nextPiece_mini img{
		border: 3px solid #1a1a1a;
		overflow: hidden;
	}
	#nextPiece h5{
		position: relative;
		top: 1em;
		font-weight: bolder;

		color : var(--danger);
		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	}
</style>