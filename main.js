// Este código deve ir no arquivo JavaScript principal (main.js ou script.js)
document.addEventListener('DOMContentLoaded', function () {
    // Carregar o header primeiro
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('./header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // Somente após o header ser carregado, inicializamos os outros componentes
                initializeHamburgerMenu();
                initializeThemeSwitcher();
                initializeAudioHighlighter();
            })
            .catch(error => {
                console.error('Erro ao carregar o header:', error);
            });
    } else {
        // Se não houver header placeholder, inicialize os componentes diretamente
        initializeHamburgerMenu();
        initializeThemeSwitcher();
        initializeAudioHighlighter();
    }
});

// Função para inicializar o menu hambúrguer
function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (hamburger && navbar) {
        console.log('Hambúrguer e Navbar encontrados');
        
        // Adicionar evento de clique ao hambúrguer
        hamburger.addEventListener('click', function(event) {
            // Prevenir comportamento padrão
            event.preventDefault();
            event.stopPropagation();
            
            // Alternar classes de ativo
            navbar.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            console.log('Menu toggled:', navbar.classList.contains('active'));
        });
        
        // Fechar o menu ao clicar em um link da navegação
        const navLinks = navbar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Fechar o menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = navbar.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNavbar && !isClickOnHamburger && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    } else {
        console.error('Hambúrguer ou Navbar não encontrado!');
    }
}

// Função para inicializar o switcher de tema (dark/light)
function initializeThemeSwitcher() {
    let trilho = document.getElementById('trilho');
    
    if (trilho) {
        let body = document.querySelector('body');
        let header = document.querySelector('.header');
        let footer = document.querySelector('.footer');
        let tooltips = document.querySelectorAll('.tooltip');

        // Verificar se já existe um listener para evitar duplicação
        const hasClickListener = trilho.getAttribute('data-has-click-listener') === 'true';
        if (hasClickListener) {
            console.log('Theme switcher já inicializado. Ignorando duplicação.');
            return;
        }

        // Verificar se o modo light foi salvo no localStorage e aplicar
        if (localStorage.getItem('theme') === 'light') {
            body.classList.add('light');
            header.classList.add('light');
            trilho.classList.add('light');
            
            if (footer) {
                footer.classList.add('light');
            }
            
            tooltips.forEach(function(tooltip) {
                tooltip.classList.add('light');
            });
        }

        // Alterna entre o modo normal e o modo light
        trilho.addEventListener('click', function (event) {
            // Prevenir propagação do evento para evitar conflito com outros listeners
            event.stopPropagation();
            
            trilho.classList.toggle('light');
            body.classList.toggle('light');
            header.classList.toggle('light');
            
            if (footer) {
                footer.classList.toggle('light');
            }
            
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

        // Marcar que já adicionamos o listener para evitar duplicação
        trilho.setAttribute('data-has-click-listener', 'true');
    } else {
        console.error('Elemento "trilho" não encontrado');
    }
}

// Função para inicializar o destaque de palavras com áudio
function initializeAudioHighlighter() {
    const botao = document.getElementById('botao');
    
    if (botao) {
        botao.addEventListener('click', function(event) {
            // Prevenir propagação do evento para evitar conflito com outros listeners
            event.stopPropagation();
            
            let audio = document.getElementById('audio');
            if (!audio) {
                console.error('Elemento "audio" não encontrado');
                return;
            }
            
            let words = document.querySelectorAll('.highlight-word');
            let currentWordIndex = 0;
            let totalWords = words.length;

            // Inicia o áudio
            audio.play();

            // Calcula o tempo que cada palavra deve durar
            let wordDuration = audio.duration / totalWords; // Tempo para cada palavra

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
                }
            }

            // Quando o áudio começar a tocar, iniciamos o destaque imediatamente
            audio.onplay = function() {
                // Reset da posição atual
                currentWordIndex = 0;
                
                // Remover qualquer destaque anterior
                words.forEach(word => {
                    word.classList.remove('highlighted');
                });
                
                // Aplica o destaque imediatamente na primeira palavra
                highlightWord();

                // Usamos o evento timeupdate para sincronizar com o tempo do áudio
                audio.ontimeupdate = function() {
                    let currentTime = audio.currentTime;
                    
                    // Calcular o tempo esperado para a próxima palavra
                    if (currentWordIndex < words.length && currentTime >= currentWordIndex * wordDuration) {
                        highlightWord();
                    }
                };
            };

            // Interrompe quando o áudio terminar
            audio.onended = function() {
                // Garante que a última palavra perca o destaque após o áudio terminar
                if (words.length > 0) {
                    words[words.length - 1].classList.remove('highlighted');
                }
            };
        });
    } else {
        console.log('Elemento "botao" não encontrado. Ignorando código de áudio.');
    }
}