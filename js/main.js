if ('serviceWorker' in navigator){
    window.addEventListener('load', async ()=>{
        try {
            let reg;
            reg = await navigator.serviceWorker.register('/sw.ja', {type: "module"});
            console.log ('Service worker registrada!', reg);
        } catch (err){
            console.log('Service worker resgitrado falhou: ', err);
        }
    });
}

let posicaoInicial;//variavel para capturar a posição
const capturarLocalizacao  = document.getElementById('lacalizacao');
const latitude = document.getElementById('latitude');
const longitude = document.getElementById('longitude');

const sucesso = (posicao) => {//callback de sucesso para captura da posição
    posicaoInicial = posicao;
    latitude.innerHTML = posicaoInicial.coords.latitude;
    longitude.innerHTML = posicaoInicial.coords.longitude;
};

const erro = (error)=> {//callback de error (falha para captura de localização)
    let errorMessage;
    switch(error.code){
        case 0:
            errorMessage = "Erro desconhecido"
        break;
        case 1:
            errorMessage = "Penmissão negada!"
        break;
        case 2: 
            errorMessage = "Captura de posição indisponível!"
        break;
    }    
    console.log('Ocorreu um erro: ' + errorMessage);
};

capturarLocalizacao.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
})