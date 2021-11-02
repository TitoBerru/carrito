
validarCompra = window.addEventListener('load', function () {
    let boton = document.querySelector('.btn-primary');
    boton.addEventListener('click', function () {
       Swal.fire({
           type: "succes",
           title: "¡Muchas Gracias por su compra!",
           text: "¡Les deseamos una buena vida nueva en su nueva casa!"
       });

        let settings = {
            "method": "post",
            "headers": {
                "content-type": "application/json",

            },
            
        }
        // fetch("http://localhost:3000/products/compra", settings)
        fetch("mysql-proyectointegrador.alwaysdata.net/products/compra", settings)
            .then(function (response) {
                return response.json()
            })
            .then(function (info) {
                console.log(info)
            })
            .catch(function (e) {
                // console.log(e);
            });




    })
})

