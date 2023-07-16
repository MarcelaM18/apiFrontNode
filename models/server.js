
const express = require('express');
const { dbConnetion } = require('../database/config.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8085;
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(express.json());
    this.compraPath = '/api/compra';
    this.categoriaPath = '/api/categoria';
    this.routes();
    this.middlewares();
    this.conectarDB();
   
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Escuchando por el puerto ${this.port}`);
    });
  }

  middlewares() {
    this.app.use(express.static(path.join(__dirname, 'public')));
  
  }


  routes() {
    this.app.use(this.compraPath, require('../routes/compras'));
    this.app.use(this.categoriaPath, require('../routes/categorias'));
    
  }

  async conectarDB() {
    await dbConnetion();
  }
}

module.exports = Server;
