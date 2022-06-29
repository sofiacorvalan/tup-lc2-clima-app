const ciudades = JSON.parse(localStorage.getItem("CIUDADES"));
const selectCiudades = document.getElementById("SeleccionarCiudad");
const seccionFormulario = document.getElementById("form-city-list");
const botonConsultar = document.getElementById("Consultar");
const card = document.getElementById("card");
const ciudadInexistente = document.getElementById("ciudadInexistente");
const loaderCard = document.getElementById("loaderCard");
const imagen = document.getElementById("iconoClima");

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

async function consultarCiudad() {
   try { 
        const respuesta = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+selectCiudades.value+'&appid=c2175e7292294a8a624f2d44ac9fe691&units=metric&lang=es');
        console.log(respuesta)
        const datos = await respuesta.json()
        console.log(datos)
        
        loaderCard.style.display = "block" 
        setTimeout(function myfunction() { loaderCard.style.display = "none" }, 1000)

        switch (respuesta.status){
            case 200:
                card.style.display = "none";
                ciudadInexistente.style.display = "none";  
                setTimeout(function myfunction() {   
                    card.style.display = "block";
                    imagen.src = "http://openweathermap.org/img/wn/"+datos.weather[0].icon+"@2x.png"
                    document.getElementById("nombreCiudad").innerHTML = datos.name;
                    document.getElementById("temp").innerHTML = "Temperatura: " + datos.main.temp + "°";
                    document.getElementById("feels_like").innerHTML = "Sensación térmica: " + datos.main.feels_like + "°";
                    document.getElementById("humidity").innerHTML = "Humedad: " + datos.main.humidity + "%";
                    document.getElementById("wind_speed").innerHTML = "Velocidad del viento: " + datos.wind.speed + "km/h";
                    document.getElementById("pressure").innerHTML = "Presión: " + datos.main.pressure + " P";
                }, 1200);
                break;
            case 404:
                card.style.display = "none";
                ciudadInexistente.style.display = "none"; 
                setTimeout(function myfunction() {
                ciudadInexistente.style.display = "block";   
                }, 1200);             
                break;
            default:
                card.style.display = "none";
                ciudadInexistente.style.display = "none";
                alert("Error.Vuelva a intentarlo.")
                break;
        } 
        
    } catch(error) {
        console.log(error);
        }   
}

botonConsultar.addEventListener("click", consultarCiudad);
