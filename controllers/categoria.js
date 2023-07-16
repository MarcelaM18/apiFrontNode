const { response } = require('express');
const Categoria = require('../models/categoria');

const categoriaGet = async (req, res = response) => {
  const _id = req.query.id;
  if (_id != undefined) {
    const categorias = await Categoria.findById(_id);
    res.json({
      categorias
    });
    return;
  }
  const categorias = await Categoria.find();
  res.json({
    categorias
  });
};

const categoriaPut = async (req, res = response) => {
  let id = null;
  if (req.query != null && req.query.id != null) {
    id = req.query.id;
  }
  const { nombre, estado, observaciones } = req.body;
  let mensaje = '';
  try {
    if (id != null) {
      const update = { nombre: nombre, estado: estado, observaciones: observaciones };
      const categoria = await Categoria.findByIdAndUpdate(
        id,
        update,
        { new: true, runValidators: true }
      );
      if (categoria) {
        mensaje = "La modificación se efectuó correctamente";
      } else {
        mensaje = "La categoría no fue encontrada";
      }
    }

  } catch (error) {
    console.error(error);
    mensaje = error.message;
  }

  res.json({
    msg: mensaje
  });
};

const categoriaPost = async (req, res = response) => {
  const body = req.body; // Captura de atributos
  let mensaje = '';

  console.log(body);
  try {
    const categorias = new Categoria(body); // Instanciar el objeto
    await categorias.save();
    mensaje = 'El registro se realizó exitosamente';
  } catch (error) {
    console.log(error);
    if (error) {
      if (error.name === 'ValidationError') {
        console.error(Object.values(error.errors).map(val => val.message));
        mensaje = Object.values(error.errors).map(val => val.message);
      }

    const {nombre, estado, observacion} = req.body
    let mensaje = ''
    try{
        if(id != null){
            const update = {nombre: nombre, estado:estado, observacion:observacion}
            const categoria = await Categoria.findByIdAndUpdate(
                id,
                update,
                {new: true, runValidators: true}
                )
                if(categoria){
                    mensaje = "La modfificacion se efectuo correctamente"
                }else{
                    mensaje = "La categoria no fue encontrada"
                }
            
        }
    }catch(error){
        console.error(error)
        mensaje = error.message

    }
    console.log(mensaje);
  }

  res.json({
    msg: 'La inserción se efectuó correctamente'
  });
};

}

const categoriaPut2 = async (req, res = response) => {
  const id = req.params.id;
  const { estado, observaciones } = req.body;
  let mensaje = "";

  try {
    const categoria = await Categoria.findByIdAndUpdate(
      id,
      { estado, observaciones },
      { new: true }
    );

    if (categoria) {
      mensaje = "El estado de la categoría se actualizó correctamente";
    } else {
      mensaje = "La categoría no fue encontrada";
    }
  } catch (error) {
    console.error(error);
    mensaje = error.message;
  }

  res.json({
    msg: mensaje,
  });
}


module.exports = {
  categoriaGet,
  categoriaPost,
  categoriaPut,
  categoriaPut2
}
