const db = require('../database/models');
const Op = db.Sequelize.Op;

module.exports = {

    lista: (req,res) => {
        db.Usuario_producto.findAll({
            order: [
                ['id','ASC']              
            ],
            where : {
                vendido : 1
            }
            
        })
        .then(pack => {
            var precios = []
           for (let i = 0 ; i<pack.length; i++){
                precios.push(parseInt(pack[i].precioFinal));

           }
           var preciosTotales = precios.reduce(function(a,n){
               return a + n
           })
           
        //    console.log (JSON.stringify(preciosTotales))
            return res.status(200).json ({
                ventaEnPesosTotal : preciosTotales,    
                data: pack,
                total: pack.length,
                status: 200
            })
        })
        .catch(function (e){
            return res.send(e)
        })    
    },

    uno: (req,res) => {

        db.Usuario_producto
            .findByPk(req.params.id)
            .then(pack => {
                return res.status(200).json ({
                    data: pack,
                    status: 200
                })
            })
            .catch(function (e){
                return res.send(e)
            })
    }
}
