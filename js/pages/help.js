const nombre = document.getElementById("user_name");
const email = document.getElementById("user_email");
const mensaje = document.getElementById("message");
const error = document.getElementById("help-error")
const enviar = document.getElementById("Enviar");
const limpiar = document.getElementById("Limpiar");
const formulario = document.getElementById("form-help");


window.onload = function () {
    
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();

        let validacion = validarInputs();

        if(validacion) {
        this.contact_number.value = Math.random() * 100000 | 0;

            emailjs.sendForm('contact_service', 'contact_form', this)
            .then(function () {
                alert('Enviado!');
            }, function (error) {
                error.style.display = "block";
                alert('ERROR...', error);
            });
        };
    });
}

function validarInputs() {
    let validacion = true;

    if (nombre.value == "") {
        validacion = false;
    }
    if (email.value == "") {
        validacion = false;
    }
    if (mensaje.value == "") {
        validacion = false;
    }

    if (validacion) {
        return validacion
    }
    else {
        alert("Complete todos los campos.");
    }
}

function limpiarInputs() {
    nombre.value = "";
    email.value = "";
    mensaje.value = "";
}

limpiar.addEventListener("click", limpiarInputs);

