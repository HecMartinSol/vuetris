import Game from "./components/Game.vue";
import Marathon from "./components/games/Marathon.vue";
/**
import InfoUsuarioComponent from "./components/InfoUsuario.vue";

// import UsuariosComponent from "./components/Usuarios.vue";
//lazy loading (para cargar solo una parte de la aplicacion cuando sea requerido para más rapidez)
const UsuariosComponent = resolve => {
	require.ensure(['./components/Usuarios.vue'], () => {
		resolve(require('./components/Usuarios.vue'));
	})
}
*/

export const rutas = [
	{path : '/', 			component : Game, 	name : "index"},
	{path : '/games', 		component : Game, 	name : "games" , children : [
			// dos puntos para el parametro
			{path : 'marathon', 		component : Marathon, name : "marathon"} // name = alias de ruta
		]
	},
	
	// redirecciones
	{path : '/juegos', 		redirect : {name:"games"}},
	{path : '/marathon', 	redirect : {name:"marathon"}},
	{path : '*', 			redirect : {name:"index"}}
	
	/**
	// children para subrutas
	{path : '/usuarios', 	component : UsuariosComponent, name : "usuarios", children : [
			// dos puntos para el parametro
			{path : ':id', 		component : InfoUsuarioComponent, name : "infousuario"} // name = alias de ruta
		]
	},
	
	*/
];