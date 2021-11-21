const btnStartRecord = document.getElementById('btnStartRecord');
const btnStopRecord = document.getElementById('btnStopRecord');
const texto = document.getElementById('texto');

let recognition = new webkitSpeechRecognition();

recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;

recognition.onresult = (event) => {
    const results = event.results;
    const frase = results[results.length - 1][0].transcript;
    /* console.log(frase); */
    
       let ultimaPalabra = frase.substr(-11);
       let palabraClave = ultimaPalabra.toLowerCase() 
       console.log(palabraClave);
       console.log(frase.length)


       if (palabraClave == 'salta línea') {
        texto.innerHTML  += '\r\n' ;


       }else{
        texto.innerHTML  +=  frase;
       }

       console.log(texto.innerHTML)
    
    
}

btnStartRecord.addEventListener('click', function(){
    recognition.start();
    console.log('start')
});

btnStopRecord.addEventListener('click', function(){
    recognition.abort();
    console.log('stop')
})