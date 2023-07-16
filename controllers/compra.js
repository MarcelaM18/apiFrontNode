const { response } = require('express');
const Compra = require('../models/compra');
const multer = require('multer');

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán las fotos adjuntas (debes asegurarte de que el directorio existe)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  }
});

// Crear el middleware de Multer
const upload = multer({ storage: storage });

const compraGet = async (req, res = response) => {
  const _id = req.query.id;

  if (_id !== undefined) {
    try {
      const compra = await Compra.findOne({ _id });

      if (compra) {
        res.json({
          compras: compra
        });
      } else {
        res.json({
          msg: 'La compra no fue encontrada'
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        msg: 'Error al obtener la compra'
      });
    }
    return;
  }

  try {
    const compras = await Compra.find();

    res.json({
      compras
    });
  } catch (error) {
    console.error(error);
    res.json({
      msg: 'Error al obtener las compras'
    });
  }
};

const compraGetFoto = async (req, res = response) => {
  const _id = req.query.id;

  if (_id !== undefined) {
    try {
      const compra = await Compra.findOne({ _id }).select('foto');

      if (compra) {
        res.json({
          foto: compra.foto
        });
      } else {
        res.json({
          msg: 'La compra no fue encontrada'
        });
      }
    } catch (error) {
      console.error(error);
      res.json({
        msg: 'Error al obtener la compra'
      });
    }
    return;
  }

  try {
    const compras = await Compra.find();

    res.json({
      compras
    });
  } catch (error) {
    console.error(error);
    res.json({
      msg: 'Error al obtener las compras'
    });
  }
};

const compraPut = async (req, res = response) => {
  const id = req.params.id;
  const { estado, observacion } = req.body;
  let mensaje = "";

  try {
    const compra = await Compra.findByIdAndUpdate(
      id,
      { estado, observacion },
      { new: true }
    );

    if (compra) {
      mensaje = "El estado de la compra se actualizó correctamente";
    } else {
      mensaje = "La compra no fue encontrada";
    }
  } catch (error) {
    console.error(error);
    mensaje = error.message;
  }

  res.json({
    msg: mensaje,
  });
};

const compraPost = async (req, res = response) => {
  const { proveedor, numFactura, fechaCompra, fechaRegistro, estado, observacion, detalleCompra } = req.body;
  const fechaActual = new Date();

  if (Date.parse(fechaCompra) > Date.parse(fechaActual)) {
    res.json({
      msg: 'La fecha de compra no puede ser mayor a la fecha actual'
    });
  }
  if (fechaCompra > fechaRegistro) {
    res.json({
      msg: 'La fecha de registro no puede ser menor a la fecha de compra'
    });
  }
  let totalCompra = 0;
  detalleCompra.forEach((detalle) => {
    totalCompra += detalle.precioCompra;
  });

  try {
    const compras = new Compra({
      proveedor,
      numFactura,
      fechaCompra,
      fechaRegistro,
      observacion,
      detalleCompra,
      totalCompra,
      estado
   
    });

    await compras.save();
    console.log('Se agregó con éxito');

    res.json({
      msg: 'La inserción se efectuó correctamente'
    });
  } catch (error) {
    console.error(error);
    res.json({
      msg: 'La inserción no fue exitosa, ocurrió un error'
    });
  }
};

const compraDelete = async (req, res = response) => {
  const { _id } = req.body;
  let mensaje = '';

  try {
    const compra = await Compra.deleteOne({ _id });
    mensaje = 'La eliminación se efectuó exitosamente.';
  } catch (error) {
    mensaje = 'Se presentaron problemas en la eliminación.';
  }

  res.json({
    msg: mensaje
  });
};

module.exports = {
  compraGet,
  compraGetFoto,
  compraPost,
  compraPut,
  compraDelete 
};
