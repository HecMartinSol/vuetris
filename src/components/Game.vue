<template>
	<div class="container-fluid p-4" id="gameContainer">
		<div class="container-fluid rounded border border-dark" id="currGame">
			<router-view></router-view>
		</div>
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
	#currGame{
	    background-color: #ffffffa3;
	    min-height: 42em;
	}
</style>