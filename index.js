const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const texto = document.getElementById('texto');

if (!('webkitSpeechRecognition' in window)) {
    alert('Lo sentimos, necesitas usar la API en Chrome')
}

let recognition = new webkitSpeechRecognition();

recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
    const results = event.results;
    var frase = results[results.length - 1][0].transcript;
    console.log('frase: ' +frase.charAt(0).toUpperCase());
   
   //Primera letra en mayúscula
    frase = frase.charAt(0).toUpperCase() + frase.slice(1);

    var textoString = '';
   


    let ultimaPalabra = frase.substr(-19);
    let palabraClave = ultimaPalabra.toLowerCase();
    /* console.log('palabra clave: ' +palabraClave); */
      

    if (palabraClave.includes('nueva línea')) {
     texto.innerHTML  += '\r\n';
    }
    else if(palabraClave.includes('nuevo párrafo')){
        texto.innerHTML  += '\r\n \r\n';
    }
    else if(palabraClave.includes('punto')){
        texto.innerHTML  += '.';
    }
    else if(palabraClave.includes('coma')){
        texto.innerHTML  += ',';
    }
    else if(palabraClave.includes('abre interrogante')){
        texto.innerHTML  += '¿';
    }
    else if(palabraClave.includes('cierra interrogante')){
        texto.innerHTML  += '?';
    }
    else if(palabraClave.includes('abre paréntesis')){
        texto.innerHTML  += ' (';
    }
    else if(palabraClave.includes('cierra paréntesis')){
        texto.innerHTML  += ')';
    }
    else{
        
     texto.innerHTML  +=  frase;
    }
    
    textoString = texto.innerHTML;

    console.log('El texto del area es: '+texto.innerHTML)
    console.log('El texto de textoString: '+textoString)

    for (let index = 0; index < textoString.length; index++) {
        console.log(textoString.charAt(index));

        if (textoString.charAt(index) == '.') {
            console.log('HE ENCONTRADO UN PUNTO');
            console.log('EN LA POSICION: '+ index);
            console.log('Y DOS POSICIONES MAS ES: ');

            console.log(textoString.charAt(index + 2)) 
        }
        
    }


}



btnStartRecord.addEventListener('click', function () {
    recognition.start();
    console.log('start')
});

btnStopRecord.addEventListener('click', function () {
    recognition.abort();
    console.log('stop')
})