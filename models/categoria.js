const {Schema, model} = require('mongoose')

const CategoriaSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El campo nombre es requerido']
    },

    estado:{
        type: Boolean,
        default: true,
        required:[true, 'El campo estado es requerido']
    },
    observaciones:{
        type: String,

    }
    ,
    observacion:{
        type: String
    }
})

;

module.exports = model('Categoria', CategoriaSchema)