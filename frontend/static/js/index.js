import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import Settings from './views/Settings.js';

const navigateTo = url => { // Para navegar entre las rutas desde el navegador
    history.pushState(null, null, url); // Coloca las rutas en el historial.
    router();
};

const router = async () => {
    const routes = [ // Arreglo de rutas
        // { path: "/", view: () => console.log('Viewing Dashboard') },
        // { path: "/posts", view: () => console.log('Viewing Posts') },
        // { path: "/settings", view: () => console.log('Viewing Settings') }
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        { path: "/settings", view: Settings }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch); // Encuentra la ruta que coincida.

    // console.log(potentialMatches);
    // console.log(match);
    if (!match) { // Si la ruta especificada no es una de las rutas que está en el arreglo de rutas entonces crea una nueva ruta que redirecciona a una de las rutas existentes, en este caso la primera.
        match = {
            route: routes[0],
            isMatch: true    
        };
    }

    const view = new match.route.view();
    
    // console.log(match)
    // console.log(match.route.view());
    // Revisar por la consola del navegador: location.pathname

    document.querySelector('#app').innerHTML = await view.getHtml();
};

window.addEventListener('popstate', router); // permite que se pueda navegar por medio de los botones de navegación del navegador

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });
    router(); // Llama las rutas.
});