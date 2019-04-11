<template>
	<div id="vuetris" class="container p-0">
		<cabecera></cabecera>
		<router-view></router-view>
	</div>
</template>

<script>
	import Cabecera from "./components/Cabecera.vue"
	import Game from "./components/Game.vue"

	export default {
		name: 'vuetris',
		
		components:{
			cabecera : Cabecera,
			game : Game,
		},

		data () {
			return {
			}
		},

		created : function(){
		},

	}
</script>

<style type="text/css">
	body{
		background-color: var(--primary);

	}
</style>