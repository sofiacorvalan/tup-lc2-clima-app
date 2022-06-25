const botonAgregar = document.getElementById("botonAgregar");
const nombreCiudad = document.getElementById("IngresarCiudad");
const mensajeExito = document.getElementById("message-success");
const mensajeError = document.getElementById("message-error");
const mensajeRepetido = document.getElementById("message-repeat");


function obtenerCiudadLocalStorage() {
    let ciudades = localStorage.getItem("CIUDADES");
    
    if (ciudades) {
        ciudades = JSON.parse(ciudades);
    } else {
        ciudades = [];
    }
    return ciudades;   
}

function agregarCiudadLocalStorage() {
    let ciudades = obtenerCiudadLocalStorage();
    let nuevaCiudad = validarInput()

    if (nuevaCiudad != 1) {
        ciudades.push(nuevaCiudad);
        localStorage.setItem("CIUDADES", JSON.stringify(ciudades));
        mensajeExito.style.display = "block";
        setTimeout(function myfunction() { mensajeExito.style.display = "none" }, 2000)
    }
    limpiarInput()
}

function validarInput() {
    let ciudades = obtenerCiudadLocalStorage();
    let resultadoValidacion = true
    let nuevaCiudad

    if (nombreCiudad.value == "") {
        resultadoValidacion = false
        alert("Debe ingresar el nombre de la ciudad.");
    }
    if (ciudades.includes(nombreCiudad.value)){
        resultadoValidacion = false
        mensajeRepetido.style.display = "block"
        setTimeout(function myfunction() { mensajeRepetido.style.display = "none" }, 2000)
    }
    
    if (resultadoValidacion) {
        nuevaCiudad=nombreCiudad.value
        return nuevaCiudad
    }
    else {
        nuevaCiudad = 1
        return nuevaCiudad
    }
    
   // FALTA MOSTRAR LOS MENSAJE DE ERROR
}

function limpiarInput() {
    nombreCiudad.value = ""
}


botonAgregar.addEventListener("click", agregarCiudadLocalStorage)





