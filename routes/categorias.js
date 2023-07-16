const { Router } = require('express');
const route = Router();

const {
  categoriaGet,
  categoriaPost,
  categoriaPut,
  categoriaDelete,
  categoriaPut2
} = require('../controllers/categoria');



route.get('/:id',  categoriaGet);
route.get('/',  categoriaGet);
route.post('/',  categoriaPost);
route.put('/',  categoriaPut);
route.delete('/',  categoriaDelete);
route.put('/:id/cambiar',  categoriaPut2); // Nueva ruta para cambiar estado y actualizar observación

module.exports = route;
