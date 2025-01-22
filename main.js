document.addEventListener('DOMContentLoaded', function () {
    let trilho = document.getElementById('trilho');
    
    if (!trilho) {
        console.error('Elemento "trilho" não encontrado');
        return; // Se não encontrar, sai da função
    }

    let body = document.querySelector('body');
    let header = document.querySelector('.header');
    let footer = document.querySelector('.footer');
    let tooltips = document.querySelectorAll('.tooltip');

    // Verificar se o modo light foi salvo no localStorage e aplicar
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light');
        header.classList.add('light');
        trilho.classList.add('light');
        
        tooltips.forEach(function(tooltip) {
            tooltip.classList.add('light');
        });
    }

    // Alterna entre o modo normal e o modo light
    trilho.addEventListener('click', function () {
        trilho.classList.toggle('light');
        body.classList.toggle('light');
        header.classList.toggle('light');
        
        tooltips.forEach(function(tooltip) {
            tooltip.classList.toggle('light');
        });

        // Salva a preferência no localStorage (modo light ou normal)
        if (body.classList.contains('light')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.removeItem('theme');
        }
    });
});



document.getElementById('botao').addEventListener('click', function() {
    let audio = document.getElementById('audio');
    let words = document.querySelectorAll('.highlight-word');
    let currentWordIndex = 0;
    let totalWords = words.length;

    // Inicia o áudio
    audio.play();

    // Calcula o tempo que cada palavra deve durar
    let wordDuration = audio.duration / totalWords; // Tempo para cada palavra
    let highlightInterval; // Variável para armazenar o intervalo de destaque

    // Função para aplicar o destaque em uma palavra
    function highlightWord() {
        if (currentWordIndex < words.length) {
            // Remove a classe 'highlighted' da palavra anterior
            if (currentWordIndex > 0) {
                words[currentWordIndex - 1].classList.remove('highlighted');
            }
            // Adiciona a classe 'highlighted' à palavra atual
            words[currentWordIndex].classList.add('highlighted');
            currentWordIndex++;
        } else {
            // Se todas as palavras foram destacadas, interrompa o intervalo
            clearInterval(highlightInterval);
        }
    }

    // Quando o áudio começar a tocar, iniciamos o destaque imediatamente
    audio.onplay = function() {
        // Aplica o destaque imediatamente na primeira palavra
        highlightWord();

        // Usamos o evento timeupdate para sincronizar com o tempo do áudio
        audio.ontimeupdate = function() {
            let currentTime = audio.currentTime; // Obtém o tempo atual do áudio

            // Calcular o tempo esperado para a próxima palavra
            if (currentWordIndex < words.length && currentTime >= currentWordIndex * wordDuration) {
                highlightWord(); // Aplica o destaque na próxima palavra
            }
        };
    };

    // Interrompe o intervalo quando o áudio terminar
    audio.onended = function() {
        // Garante que a última palavra perca o destaque após o áudio terminar
        if (words.length > 0) {
            words[words.length - 1].classList.remove('highlighted');
        }
    };
});
