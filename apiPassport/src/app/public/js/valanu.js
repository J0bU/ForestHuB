$(function() {
    var $anunForm = $("#form-anun");
    $.validator.addMethod("noSpace", function(value, element) {
        return value == '' || value.trim().length != 0
    }, "Los espacios no estan permitidos.")
    if ($anunForm.length) {
        $anunForm.validate({
            rules: {
                Titulo: {
                    required: true,
                    noSpace: true
                },
                Descripcion: {
                    required: true,
                    noSpace: true
                },
                Contacto: {
                    required: true,
                    noSpace: true
                },
                Precio: {
                    required: true,
                    noSpace: true
                },
                Categoria: {
                    required: true,
                    noSpace: true
                },
                imagen: {
                    required: true,
                    noSpace: true
                },
            },
            messages: {
                Titulo: {
                    required: 'El Titulo se requiere'
                },
                Descripcion: {
                    required: 'La Descripción se requiere'
                },
                Contacto: {
                    required: 'El Contacto se requiere',
                },
                Precio: {
                    required: 'El Precio se requiere'
                },
                Categoria: {
                    required: 'La Categoria se requiere'
                },
                codigo: {
                    required: 'El código se requiere'
                },
                semestre: {
                    required: 'El semestre se requiere'
                },
                imagen: {
                    required: 'La imagen se requiere'
                }
            }
        })
    }
})

