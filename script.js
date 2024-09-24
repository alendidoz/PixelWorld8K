const colors = [
    '#FF0000', // Rouge
    '#FF7F00', // Orange
    '#FFFF00', // Jaune
    '#7FFF00', // Vert
    '#00FF00', // Vert clair
    '#00FFFF', // Cyan
    '#0000FF', // Bleu
    '#4B0082', // Indigo
    '#9400D3'  // Violet
];


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
const canvas = document.getElementById('canvas');
canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (selectedColor) {
        const pixelDiv = document.createElement('div');
        pixelDiv.style.position = 'absolute';
        pixelDiv.style.width = '10px'; // Taille du pixel
        pixelDiv.style.height = '10px';
        pixelDiv.style.backgroundColor = selectedColor;
        pixelDiv.style.left = `${x}px`;
        pixelDiv.style.top = `${y}px`;

        const confirmPlacement = confirm("Confirmez-vous l'achat du pixel de couleur " + selectedColor + " ?");
        if (confirmPlacement) {
            canvas.appendChild(pixelDiv);
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
