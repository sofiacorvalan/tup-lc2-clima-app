const ciudades = JSON.parse(localStorage.getItem("CIUDADES"));
const selectCiudades = document.getElementById("SeleccionarCiudad");
const seccionFormulario = document.getElementById("form-city-list");
const botonConsultar = document.getElementById("Consultar");

window.onload = listaStorageSelect()

function listaStorageSelect() {
    if (ciudades) {
        for (let i=0; i < ciudades.length; i++) {
            var option = document.createElement("option");
            option.value = ciudades[i];
            option.text = ciudades[i];
            selectCiudades.appendChild(option);
        }
    }
    else {
        var newP = document.createElement("p");
        var newCont = document.createTextNode("Aun no hay ciudades cargadas.");
        newP.appendChild(newCont);
        newP.style.color = "white";
        newP.style.marginTop = "50px";
        newP.style.width = "400px";
        newP.style.textAlign = "center";
        newP.style.padding = "10px";
        newP.style.backgroundColor = "#04957d";
        newP.style.borderRadius = "10px";
        seccionFormulario.appendChild(newP);
    }
}


// Solicitud GET (Request).
function consultarCiudad() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+selectCiudades.value+'&appid=c2175e7292294a8a624f2d44ac9fe691')
        // Exito
        .then(response => response.json())  // convertir a json
        .then(data => {
            console.log(data)
            document.getElementById("nombreCiudad").innerHTML = data.name;
            document.getElementById("temp").innerHTML = "Temperatura: " + data.main.temp + "°";
            document.getElementById("feels_like").innerHTML = "Sensación térmica: " + data.main.feels_like + "°";
            document.getElementById("humidity").innerHTML = "Humedad: " + data.main.humidity + "%";
            document.getElementById("wind_speed").innerHTML = "Velocidad del viento: " + data.wind.speed + "km/h";
            document.getElementById("pressure").innerHTML = "Presión: " + data.main.pressure + " P";
        })   //imprimir los datos 
        .catch(err => alert('La ciudad ingresada es inexistente.', err)); // Capturar errores
}

//FALTA CAMBIAR ICONO
//FALTA MENSAJE DE ERROR SI LA CIUDAD NO EXISTE
//FALTA HACER APARECER/DESAPARECER LA CARD CUANDO SE PRESIONA EL BOTON CONSULTAR


botonConsultar.addEventListener("click", consultarCiudad)




