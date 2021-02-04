// const express = require('express')
// const path = require('path')

// const app = express()

// app.get('/*', (req, res) => {
//     res.sendFile(path.resolve("frontend", "index.html"))
// });

// app.listen(process.env.PORT || 5060, () => console.log('Server running...'));


const express = require('express');
const path = require('path');
const app = express();

// Definir el root de la aplicación
app.use(express.static(path.join(__dirname, 'frontend')));

// Cuando se acceda al root enviar el fichero del proyecto
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Escuchar en el puerto 9000
// app.listen(9000);
app.listen(process.env.PORT || 3000, () => console.log('Server running...'));




// const express = require('express');
// const path = require('path');
// const app = express();

// // Definir el root de la aplicación
// app.use(express.static(path.join(__dirname, 'build')));

// // Cuando se acceda al root enviar el fichero del proyecto
// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// // Escuchar en el puerto 9000
// app.listen(9000);
