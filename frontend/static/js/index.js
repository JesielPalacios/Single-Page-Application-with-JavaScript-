import Dashboard from './views/Dashboard.js';
import Posts from './views/Posts.js';
import PostView from './views/PostView.js';
import Settings from './views/Settings.js';

const pathToRegex = path => new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

const getParams = match => {
    const values = match.result.slice(1); // Pasar por la consola del navegador: "/posts/2/4".match(/^\/posts\/(.+)\/(.+)$/);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]); // Esto le da el valor del parámetro que vaya después de la ruta principal.
    // console.log(Array.from(match.route.path.matchAll(/:(\w+)/g))); // Devuelve un array de los valores que tienen las variables de los parámetros de ruta.
    // return {};
    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]]; // Devuelve la llave y el index de la misma.
    }))
};

const navigateTo = url => { // Para navegar entre las rutas desde el navegador
    history.pushState(null, null, url); // Coloca las rutas en el historial de navegaciónd de la página.
    router();
};

const router = async () => {
    // /posts/:id
    // console.log(pathToRegex("/posts/:id"));
    // Pasar por la consola del navegador: "/posts/2".match(/^\/posts\/(.+)$/);
    const routes = [ // Arreglo de rutas
        // { path: "/", view: () => console.log('Viewing Dashboard') },
        // { path: "/posts", view: () => console.log('Viewing Posts') },
        // { path: "/settings", view: () => console.log('Viewing Settings') }
        { path: "/", view: Dashboard },
        { path: "/posts", view: Posts },
        // { path: "/posts/:id", view: Posts }, // Pasar por la ruta: http://localhost:9000/posts/2
        // { path: "/posts/:id/:ejemploTest", view: Posts },  // Pasar por la ruta: http://localhost:9000/posts/2/4
        { path: "/posts/:id", view: PostView },
        // { path: "/posts/:id/:somethingElse", view: PostView },
        { path: "/settings", view: Settings }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            // isMatch: location.pathname === route.path
            result: location.pathname.match(pathToRegex(route.path)) // Van a ser básicamente los resultados de las que coincidan potencialmente.
        };
    });

    // let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch); // Encuentra la ruta que coincida.
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null); // // Pasar por la consola del navegador: "/1posts/2".match(/^\/posts\/(.+)$/); Devolverá null por que ahora tiene que coincidir con la ruta.

    // console.log(potentialMatches);
    // console.log(match);
    if (!match) { // Si la ruta especificada no es una de las rutas que está en el arreglo de rutas entonces crea una nueva ruta que redirecciona a una de las rutas existentes, en este caso la primera.
        match = {
            route: routes[0],
            // isMatch: true
            result: location.pathname  // Pasar por la consola del navegador: "/posts/2/4".match(/^\/posts\/(.+)\/(.+)$/);
        };
    }

    const view = new match.route.view(getParams(match));
    
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