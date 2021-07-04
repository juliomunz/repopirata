const Usuario={}
const User=require('../model/user.model')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

Usuario.crearUser = async(req, res)=>{
    const {nombre,correo,contrasena}=req.body
    const NuevoUser = new User({
        nombre,correo,contrasena
    })

    const correouser = await User.findOne({correo:correo})
    if (correouser){
        res.json({
            mensaje:'El correo ya existe'
        })
    }else {
        NuevoUser.contrasena = await bcrypt.hash(contrasena,10)
        const token = jwt.sign({_id:NuevoUser._id},'secreta')
        await NuevoUser.save()
        res.json({
            mensaje:'Bienvenido',
            id:NuevoUser._id,
            nombre:NuevoUser.nombre,
            token
        })
    }
}

Usuario.login = async(req, res)=>{
    const {correo,contrasena} = req.body
    const user = await User.findOne({correo:correo})
    if(!user){
        return res.json({
            mensaje:'Correo incorrecto'
        })
    }
    const match = await bcrypt.compare(contrasena, user.contrasena)
    if (match){
        const token = jwt.sign({_id:user._id}, 'secreta')
        res.json({
            mensaje:'Bienvenido',
            id:user._id,
            nombre:user.nombre,
            token
        })
    }else{
        res.json({
            mensaje:'Contraseña incorrecta'
        })
    }
}

module.exports = Usuario