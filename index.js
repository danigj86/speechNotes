const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const btnPdf = document.getElementById('btnPdf');
const btnCopy = document.getElementById('btnCopy');
const btnEmail = document.getElementById('btnEmail');
const btnNewRecord = document.getElementById('btnNewRecord');
const texto = document.getElementById('texto');
var grabando = false;

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
/*=============================*/


/*========= JS PDF ============*/
btnPdf.addEventListener('click', function () {

    /* console.log(textoPdf) */
    var doc = new jsPDF();
    
    //Ancho del documento
    /* var width = doc.getTextWidth(texto.innerHTML);
    console.log(width); */

    doc.text('Texto grabado: '+ texto.innerHTML, 10, 10, { align: 'justify', lineHeightFactor: 1.5, maxWidth: 170 });
    doc.save('mi-documento.pdf');

})
/*===============================*/
  
/*========= BOTONES ============*/

btnStartRecord.addEventListener('click', function () {
    btnStartRecord.classList.add("grabando")
    recognition.start();
    console.log('start')
    grabando = true;
    btnStartRecord.innerHTML = 'GRABANDO'
    

});

btnStopRecord.addEventListener('click', function () {
    recognition.abort();
    console.log('stop')
    btnStartRecord.innerHTML = 'Empezar a grabar';
    btnStartRecord.classList.remove('grabando')
    
})

btnCopy.addEventListener('click', function(){
    texto.select();
    texto.setSelectionRange(0, 99999);
    document.execCommand('copy');

})

btnEmail.addEventListener('click', function(){
    window.location.href = `mailto:address@dmail.com?body= ${texto.innerHTML}`;
})

btnNewRecord.addEventListener('click', function(){
    location.reload();
})



var btnInstrucciones = document.getElementById('btnInstrucciones');
var modal1 = document.getElementById('modal');
var close = document.getElementById('close');

btnInstrucciones.addEventListener('click', function () {
    modal1.classList.add('show')
})
close.addEventListener('click', function () {
    modal1.classList.remove('show')
})
/* test.addEventListener('input', e => {
    log.innerHTML = e.target.value.replace(/([!?.]\s+)([a-z])/g, function(m, $1, $2) {
        return $1+$2.toUpperCase();
    });
}); */