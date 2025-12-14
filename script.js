document.addEventListener('DOMContentLoaded', () => {
    
    const textContainer = document.getElementById('typewriter-text');
    const buttons = document.querySelectorAll('.rpg-btn');
    
    // Texto de introducción
    const introText = "* Titan Pepe bloquea el paso, parece listo para la batalla";
    
    let typingInterval;

    function typeText(text) {
        textContainer.innerHTML = ''; 
        clearInterval(typingInterval);
        
        let i = 0;
        let currentHTML = "";
        
        typingInterval = setInterval(() => {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') {
                    currentHTML += '<br>';
                } else {
                    currentHTML += char;
                }
                textContainer.innerHTML = currentHTML;
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); 
    }

    // Iniciar
    typeText(introText);

    // Eventos
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const description = btn.getAttribute('data-desc');
            if (description) typeText(description);
        });

        btn.addEventListener('mouseleave', () => {
            typeText(introText);
        });
    });
});