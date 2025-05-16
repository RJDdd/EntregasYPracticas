document.addEventListener('DOMContentLoaded', function() {
    // Scroll suave para el botón de flecha
    document.querySelector('.scroll-btn').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });

    // Menú responsivo (si lo necesitas)
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger mobile-only';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.main-nav .container').prepend(hamburger);
    
    hamburger.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('show');
    });

    function handleResize() {
        const navLinks = document.querySelector('.nav-links');
        if (window.innerWidth > 768) {
            navLinks.classList.remove('show');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // View more buttons functionality
    document.querySelectorAll('.view-more').forEach(button => {
        button.addEventListener('click', function() {
            alert('Más productos serán mostrados próximamente!');
        });
    });
});
