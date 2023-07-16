const { Router } = require('express');
const route = Router();

const { compraGet, compraPost, compraPut, compraDelete, compraGetFoto } = require('../controllers/compra');




route.get('/:id', compraGet);
route.get('/:id/foto', compraGetFoto);
route.get('/', compraGet);
//route.post('/', compraPost);
route.put('/:id/anular', compraPut);
route.delete('/', compraDelete);
route.post('/',compraPost);

module.exports = route;
