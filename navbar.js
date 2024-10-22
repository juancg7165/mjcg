fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('navbar').innerHTML = data;
            })
            .catch(error => console.error('Error loading navbar:', error));
function toggleMenu() {
        const menu = document.querySelector('.nav.first');
        // Verificar si el menú está visible o no
        if (menu.style.display === 'block') {
            menu.style.display = 'none';  // Colapsar
        } else {
            menu.style.display = 'block'; // Expandir
        }
    }
