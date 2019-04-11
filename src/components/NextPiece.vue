<template>
		<div id="nextPiece" class="text-center">
			<h5>NEXT</h5>
			<img src="https://picsum.photos/100/100?random" alt="..." class="img-thumbnail rounded-circle">
		</div>


</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
			}
		}
	}
</script>

<style type="text/css" scoped>
	#nextPiece{
		max-height: 130px;
		min-height: 130px;
		max-width: 130px;
		min-width: 130px;


	}
	#nextPiece img{
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