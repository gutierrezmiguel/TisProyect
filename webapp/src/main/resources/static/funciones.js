function eliminar(id){
    swal({
        title: "esta seguro que desea eliminarlo?",
        text: " no se puede revertir",
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
                swal("Has borrado tu Ova", {
                    icon: "success",
                }).then((ok)=>{
                    if (ok){
                        location.href="/listar";
                    }
                });
            } else {
                swal("tu ova no ha sido borrado");
            }
        });
}