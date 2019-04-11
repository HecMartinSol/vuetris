<template>
	<div>
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">VUETRIS</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Games
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdown">
							<router-link to="/games" class="nav-link" active-class="active" exact>Overview</router-link>
							
							<div class="dropdown-divider"></div>

							<router-link to="/games/marathon" class="nav-link" active-class="active" exact>Marathon</router-link>

						</div>
					</li>
				</ul>
				<!-- 
				<form class="form-inline my-2 my-lg-0">
					<input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
					<button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
				-->
			</div>
		</nav>


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