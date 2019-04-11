<template>	
	<div class="board_grid container-fluid rounded">
		<div v-for="i in grid.height" class="board_row row">
			<!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 m-0 d-none"><div class="dummy">&nbsp;</div></div> -->
			<div v-for="j in grid.width" class="col-xs-1 col-sm-1 col-md-1 col-lg-1 rounded board_cell" :id="'cell_'+i+'_'+j">
					<!-- <div class="dummy">&nbsp;</div> -->
			</div>			
			<!-- <div class="col-xs-1 col-sm-1 col-md-1 col-lg-1 m-0 d-none"><div class="dummy">&nbsp;</div></div> -->
		</div>
	</div>

</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				grid : {
					height : 20,
					width  : 10
				}
			}
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