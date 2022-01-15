function eliminar(id){
    swal({
        title: "¿Está seguro que desea eliminarlo?",
        text: "esta acción no se puede revertir",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                        url:"/eliminar/"+id,
                        success: function (response){
                            console.log(response);
                        }
                });
                swal("El ova ha sido eliminado satisfactoriamente", {
                    icon: "success",
                }).then((ok)=>{
                    if (ok){
                        location.href="/listar";
                    }
                });
            } else {
                swal("Operación cancelada");
            }
        });
}