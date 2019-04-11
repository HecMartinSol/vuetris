<template>
	<div class="modal fade" id="countDownModal" tabindex="-1" role="dialog" aria-labelledby="countDownModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content m-5">
				<div class="modal-body text-center">
					<h3>Starting in...</h3>
					<h4>{{this.counter}}</h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {bus} from "../main.js"
	
	export default {
		name: 'app',
		data () {
			return {
				counter : this.$props.countdownvalue
			}
		},
		props:{
			id_modal : String,
			countdownvalue : Number
		},
		methods:{
			makeCountdown(__callback) {
				this.counter = this.$props.countdownvalue

				var vm = this;
				var downloadTimer = setInterval(function(){
					vm.counter -= 1;
					if(vm.counter <= 0){
						vm.counter = "Go!"
						$('#countDownModal').modal('hide');
						
						clearInterval(downloadTimer);
						
						return __callback();
					}
				}, 1050);
			}

		},

		created(){
			// Escucha el bus
			bus.$on("makeCountdown", (__callback) => {
				this.makeCountdown(function(){
					return __callback();
				});
			});
		}
	}
</script>