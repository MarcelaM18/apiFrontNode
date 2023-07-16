
const {Schema, model} = require('mongoose')


const CompraSchema = Schema({
    proveedor:{
        type: String,
        required:[true, 'El campo proveedor es requerido']
    },

    numFactura:{
      type: Number,
      unique:true,
      required:[true, 'El campo numFactura es requirido']
    },

    fechaCompra:{
        type: Date,
        required:[true, 'El campo fechaCompra es requerido']
    },

    fechaRegistro:{
        type:Date,
        required:[true, 'El campo fechaRegistro es requerido']
    },
    observacion:{
        type: String
    },    

    detalleCompra: [{
        producto: {
          type: String,
          required: [true, 'El campo producto es requerido'],
        },
        categoria:{
            type: String,
            required:[true, 'El campo Categoria es requerido']
    
        } ,
        precioCompra: {
          type: Number,
          required: [true, 'El campo precioCompra es requerido'],
        },
        cantidad:{
          type:Number,
          required: [true, 'El campo cantidad es requerido'],
        },
        precioVenta: {
          type: Number,
          required: [true, 'El campo precioVenta es requerido'],
        },
        iva:{
          type: Number,
          required: [true, 'El campo iva es requerido'],

        }
      }],
      totalCompra:{
        type: Number
    },
    estado: {
      type: String,
      enum: ['Activa', 'Anulada'],
      default: 'Activa'
    }
    ,
    foto: {
      type: String  // Ruta o URL de la imagen adjunta
    }
})

CompraSchema.pre('save', function (next) {
  let total = 0;
  for (let i = 0; i < this.detalleCompra.length; i++) {
    const detalle = this.detalleCompra[i];
    const subtotal = (detalle.precioCompra + detalle.iva) * detalle.cantidad;
    total += subtotal;
  }
  this.totalCompra = total;
  next();
});
 



module.exports = model('Compra', CompraSchema)
