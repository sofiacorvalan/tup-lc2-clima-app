const botonAgregar = document.getElementById("botonAgregar");
const nombreCiudad = document.getElementById("IngresarCiudad");
const mensajeExito = document.getElementById("message-success");
const mensajeError = document.getElementById("message-error");
const mensajeRepetido = document.getElementById("message-repeat");
const loaderAgregar = document.getElementById("loaderAgregar");


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

    loaderAgregar.style.display = "block";
    setTimeout(function myfunction() { loaderAgregar.style.display = "none" }, 1000);

    if (nuevaCiudad != 1) {
        ciudades.push(nuevaCiudad);
        localStorage.setItem("CIUDADES", JSON.stringify(ciudades));
        setTimeout(function myfunction() { mensajeExito.style.display = "block" }, 1200);
        setTimeout(function myfunction() { mensajeExito.style.display = "none" }, 2000);
    }
    limpiarInput()
}

function validarInput() {
    let ciudades = obtenerCiudadLocalStorage();
    let resultadoValidacion = true;
    let nuevaCiudad;

    if (nombreCiudad.value == "") {
        resultadoValidacion = false;
        alert("Debe ingresar el nombre de la ciudad.");
    }
    if (ciudades.includes(nombreCiudad.value)) {
        resultadoValidacion = false;
        setTimeout(function myfunction() { mensajeRepetido.style.display = "block" }, 1200);
        setTimeout(function myfunction() { mensajeRepetido.style.display = "none" }, 2000);
    }

    if (resultadoValidacion) {
        nuevaCiudad = nombreCiudad.value;
        return nuevaCiudad
    }
    else {
        nuevaCiudad = 1;
        return nuevaCiudad
    }
}

function limpiarInput() {
    nombreCiudad.value = "";
}


botonAgregar.addEventListener("click", agregarCiudadLocalStorage);

//Falta validar ciudad existente en la API

/* async function validarAPI() {
    try {
        const respuesta = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + nombreCiudad.value + '&appid=c2175e7292294a8a624f2d44ac9fe691');
        const datos = await respuesta.json()
        console.log(datos)
        console.log(datos.cod)
    }
    catch (error) {
        console.log(error)
    }
} */



