const colors = [
    '#FF0000', // Rouge
    '#FF4D4D', // Rouge clair
    '#B30000', // Rouge sombre
    '#FF7F00', // Orange
    '#FFAA00', // Orange clair
    '#B36D00', // Orange sombre
    '#FFFF00', // Jaune
    '#FFFF4D', // Jaune clair
    '#B3B300', // Jaune sombre
    '#7FFF00', // Vert
    '#A8FF00', // Vert clair
    '#4CAF50', // Vert sombre
    '#00FF00', // Vert clair
    '#00FFFF', // Cyan
    '#00B2B2', // Cyan sombre
    '#009999', // Cyan plus sombre
    '#0000FF', // Bleu
    '#4D4DFF', // Bleu clair
    '#0000B2', // Bleu sombre
    '#4B0082', // Indigo
    '#7A3E8E', // Indigo clair
    '#320A56', // Indigo sombre
    '#9400D3', // Violet
    '#AA3D99', // Violet clair
    '#5D004F'  // Violet sombre
];

// Récupère la référence de la toile
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajuster la taille de la toile
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Événement pour ajuster la taille de la toile lors du redimensionnement de la fenêtre
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Sélectionner la palette de couleurs
const colorPalette = document.getElementById('color-palette');
colors.forEach(color => {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('color');
    colorDiv.style.backgroundColor = color;
    colorDiv.addEventListener('click', () => selectColor(colorDiv));
    colorPalette.appendChild(colorDiv);
});

let selectedColor = null;
function selectColor(colorDiv) {
    const previouslySelected = document.querySelector('.color.selected');
    if (previouslySelected) {
        previouslySelected.classList.remove('selected');
    }
    colorDiv.classList.add('selected');
    selectedColor = colorDiv.style.backgroundColor;
}

// Fonction plein écran
const fullscreenBtn = document.getElementById('fullscreen-btn');
fullscreenBtn.addEventListener('click', () => {
    if (canvas.requestFullscreen) {
        canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) { // Firefox
        canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) { // Chrome, Safari et Opera
        canvas.webkitRequestFullscreen();
    } else if (canvas.msRequestFullscreen) { // IE/Edge
        canvas.msRequestFullscreen();
    }
});

// Gestion de la toile
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (selectedColor) {
        const confirmPlacement = confirm("Confirmez-vous l'achat du pixel de couleur " + selectedColor + " ?");
        if (confirmPlacement) {
            // Dessine le pixel sur la toile
            ctx.fillStyle = selectedColor;
            ctx.fillRect(x, y, 10, 10); // Taille du pixel 10x10
            alert("Pixel placé avec succès !");
            // Simuler la sauvegarde
            console.log("Pixel enregistré avec la couleur: " + selectedColor + " à la position: (" + x + ", " + y + ")");
        }
    } else {
        alert("Veuillez sélectionner une couleur avant de placer un pixel !");
    }
});

// Zoom fonction
let scale = 1;
canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    scale += event.deltaY * -0.001; // Ajuste le zoom
    scale = Math.min(Math.max(0.5, scale), 2); // Limite le zoom
    canvas.style.transform = `scale(${scale})`;
});
