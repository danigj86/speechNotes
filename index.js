const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const btnPdf = document.getElementById('btnPdf');
const texto = document.getElementById('texto');

if (!('webkitSpeechRecognition' in window)) {
    alert('Lo sentimos, necesitas usar la API en Chrome')
}

//SpeechRecognition
let recognition = new webkitSpeechRecognition();

recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onresult = (event) => {
    const results = event.results;
    var frase = results[results.length - 1][0].transcript;
    /* console.log('frase: ' +frase.charAt(0).toUpperCase()); */
   
     //Primera letra en mayúscula
     frase = frase.charAt(0).toUpperCase() + frase.slice(1);

     let ultimaPalabra = frase.substr(-19);
     let palabraClave = ultimaPalabra.toLowerCase();
     /* console.log('Palabra clave: ' +palabraClave); */


      

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

}
function capitalizeFirstLetter(string) {
    console.log('capitalize:' + string.charAt(0));
    return string.charAt(0).toUpperCase() + string.slice(1);
    
  }
  

btnStartRecord.addEventListener('click', function () {
    recognition.start();
    console.log('start')
});

btnStopRecord.addEventListener('click', function () {
    recognition.abort();
    console.log('stop')
})

/*=========JS PDF ============*/
btnPdf.addEventListener('click', function () {

    /* console.log(textoPdf) */
    var doc = new jsPDF();
    
    //Ancho del documento
    /* var width = doc.getTextWidth(texto.innerHTML);
    console.log(width); */

    doc.text('Texto grabado: '+ texto.innerHTML, 10, 10, { align: 'justify', lineHeightFactor: 1.5, maxWidth: 170 });

    doc.save('mi-documento.pdf');

})




/* test.addEventListener('input', e => {
    log.innerHTML = e.target.value.replace(/([!?.]\s+)([a-z])/g, function(m, $1, $2) {
        return $1+$2.toUpperCase();
    });
}); */