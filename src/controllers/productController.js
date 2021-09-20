const db = require('../database/models');
const { send } = require('process');
const { localsName } = require('ejs');
const { body } = require('express-validator');
const { time, timeStamp, timeLog } = require('console');
const productController = {

    //Para mostrar todo el listado de productos
    // listado: (req,res) => {
    //     db.Pack.findAll({include:[{association:'servicio_adicional'}]},{
    //         order: [
    //             ['numeroPack','ASC']

    //         ]
    //     })
    //              then(function(productos){

    //                 let precioSer = [];

    //                 for (producto of productos){
    //                     let objaux = {
    //                         cajas: producto.servicio_adicional[0].cajas,
    //                         gomaEspuma: producto.servicio_adicional[0].gomaEspuma
    //                 }
    //             precioSer.push(objaux);
    //             }
    //             res.render ('products/producto',{products:productos});
    //         // res.render ('products/producto',{products:productos}, {precioSer});
    //     //    return res.send({productos}) 
    //         }
    //     )
    // },
    listado: (req, res) => {
        db.Pack.findAll({
            order: [
                ['numeroPack', 'ASC']

            ]
        })
            .then(function (productos) {
                res.render('products/producto', { products: productos });
            }
            )
    },

    carrito: async (req, res) => {
        db.Pack.findAll({ include: [{ association: 'servicio_adicional' }] }, {
            order: [
                        ['numeroPack', 'ASC']
                    ]
        })
            .then(function (productos) {

            let precioSer = [];

            for (producto of productos) {
                let objaux = {
                    trasladoDiaFeriado: producto.servicio_adicional[0].trasladoDiaFeriado,
                    asistente: producto.servicio_adicional[0].asistente,
                    embalaje: producto.servicio_adicional[0].embalaje,
                    cajas: producto.servicio_adicional[0].cajas,
                    adhesivo: producto.servicio_adicional[0].adhesivo,
                    gomaEspuma: producto.servicio_adicional[0].gomaEspuma,
                    depositoTemporal: producto.servicio_adicional[0].depositoTemporal,
                    pack_id: producto.servicio_adicional[0].pack_id,
                    fecha_actualizacion: producto.servicio_adicional[0].fecha_actualizacion,
                }
                    precioSer.push(objaux);
            }
                // //Estas 2 lineas funcionan ok, ahora las comento para ver q trae el form
            let packBuscado = productos[req.params.id - 1] ;
            //res.send(req.params.id); Este dato Llega!!!!!!
                res.render('products/carritoConfirm', { packBuscado });
                // // Hasta aca funciona! 

                // res.send(productos)
                // console.log(objaux.asistente)
                // res.render ('products/producto',{products:productos}, {precioSer});
                //  res.send({packBuscado}) 
                //   res.send({idServices}) 
        })
            // .then(function(req, res){
            //     db.Usuario_producto.findAll(usuario_producto)({
            //         order: [
            //                 ['numeroPack', 'ASC']
            //                 ]
            //     })
            //     return console.log(usuario_producto.id)

            // })
        // .then(function(){
        //     db.Usuario_producto.update({

        //     servicio_adicional_id: req.params.id
        // }, {
        //     where: {
        //         id: req.params.id
        //     }
        // })
    },    

    carrito_ok: (req, res) => {
        db.Pack.findByPk(req.params.id)
        // aca deberia buscar el id del pack e incluirlo en la BD
        
            .then (function (producto) {
                res.render('products/carrito', { packBuscado: producto });
                // res.send(producto)
            })
            // await(function(){
            //     console.log("llego")
            // })
    },
    carga: (req, res) => {     //create
        res.render('products/cargaProducto');
    },

    edicion: (req, res) => {
        db.Pack.findByPk(req.params.id)
            .then(function (producto) {

                res.render('products/edicionProducto', { productoEncontrado: producto });
            })
        // *********  Dejo la forma de editar con JSON por si implementamos forma OFFLINE *****
        // let idProductoEditado = req.params;	
        // for(let i=0;i<products.length;i++){
        //     if (products[i].id==idProductoEditado.id){
        //         var productoEncontrado = products[i];
        //     break  
        //     }  
        // }  
        // res.render('products/edicionProducto',{productoEncontrado: productoEncontrado});

    },

    actualizar: (req, res) => {
        // res.send(req.file.filename)
        // if (req.file == null){
        //       products[i].imagen = products[i].imagen;
        //                 }else {
        //                  products[i].imagen =req.file.filename;
        //                }


        // res.send(req.file.filename)  
        if (req.file == null) {
            var nombreImagen = 'avatar.jpg'
        } else {
            var nombreImagen = req.file.filename
        }

        db.Pack.update({

            numeroPack: req.body.numeroPack,  //nombre del campo en BD: "name" del Form
            radio: req.body.radio,
            precio: req.body.precio,
            superficie: req.body.superficie,
            imagen: nombreImagen

        }, {
            where: {
                id: req.params.id
            }
        })
            .then(function (update) {

                res.redirect('/products/producto');
            })
    },

    // res.render('products/producto', {products:Pack})

    // let idParaCambiar = req.params.id;
    // let ProductoAModificar = req.body;    
    // for(let i=0;i<products.length;i++){
    //     if (products[i].id == idParaCambiar){
    //   	    products[i].numeroDePack = ProductoAModificar.numeroDePack;
    //   	    products[i].radio = ProductoAModificar.radio;
    //         products[i].superficie = ProductoAModificar.superficie;
    //         products[i].precio = ProductoAModificar.precio;
    //         products[i].superficie = ProductoAModificar.superficie;
    //         if (req.file == null){
    //                 products[i].imagen = products[i].imagen;
    //             }else {
    //                 products[i].imagen =req.file.filename;
    //             }
    //         break;  
    //     }       
    // }
    //  fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
    //  res.render('products/producto', {products:products,users:users})

    store: (req, res) => {
        if (req.file == null) {
            var nombreImagen = 'avatar.jpg'
        } else {
            var nombreImagen = req.file.filename
        }
        db.Pack.create({
            numeroPack: req.body.numeroDePack,
            radio: req.body.radio,
            imagen: nombreImagen,
            superficie: req.body.superficie,
            precio: req.body.precio
        })
            .then(function (create) {

                res.redirect('/products/producto');
            })


        // if (req.file == null){
        //    var nombreImagen = 'avatar.jpg'
        // }else {
        //     var nombreImagen = req.file.filename
        // }

        // let idNuevo = products[products.length-1].id + 1;
        // let nuevoObjeto =  Object.assign({id: idNuevo},req.body,{imagen:nombreImagen});
        // products.push(nuevoObjeto);
        // fs.writeFileSync(productsFilePath, JSON.stringify(products,null, ' '));
        //     res.render('products/producto', {products:products,users:users})
    },

    destroy: (req, res) => {
        db.Pack.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (update) {

                res.redirect('/products/producto');
            })
    },

    preCompra: async (req, res) => {
        // res.send(req.body)
        // var serviciosSolicitados = req.body;
    //    console.log(serviciosSolicitados);
        //  let datosGeneral = req.params.id;
         let datosUsuario = req.session.userLogged;

         let services = await db.Seleccion.create({
            trasladoDiaFeriado: req.body.traslado,
            cajas: req.body.cajas,
            gomaEspuma: req.body.espuma,
            depositoTemporario : req.body.depoT,
            embalaje : req.body.embalaje,
            adhesivo : req.body.cintas,
            depositoPermanente: req.body.depoP,
            asistente:req.body.asistente,
            trasladoDiaFeriado: req.body.traslado            
        });
        let idServices = await db.Usuario_producto.create({
            usuario_id: datosUsuario.id,
            servicio_adicional_id: 1,
            fechaVenta: 2021/9/20,
            vendido:0,
            precioFinal: 1000,
            seleccion_id: services.id          
        });
        
        console.log("El numero de serie de esta nueva seleccion es: " + JSON.stringify(idServices));
        console.log("LOs datos de usuario que hay almacenados son: " + JSON.stringify(datosUsuario));
        // console.log("Los datos generales deberian ser" + JSON.stringify(datosGeneral));
             
           res.render('/products/carritoConfirm')
           
            // Tomar el dato con valor.id --> En este ejemplo seria s.id

    }

};

module.exports = productController;
