const colors = [
    '#FF0000', '#FF7F00', '#FFFF00', '#7FFF00', '#00FF00',
    '#00FF7F', '#00FFFF', '#007FFF', '#0000FF', '#7F00FF',
    '#FF00FF', '#FF007F', '#FFFFFF', '#000000', '#808080',
    '#C0C0C0', '#FFD700', '#FF4500', '#FF1493', '#00FA9A',
    '#8A2BE2', '#FF69B4', '#ADFF2F', '#B22222', '#5F9EA0',
    '#FF6347', '#4682B4', '#D2691E', '#A52A2A', '#9932CC',
    '#FF8C00', '#FFDAB9', '#FFE4E1', '#E6E6FA', '#FFF0F5',
    '#F0E68C', '#FFD700', '#F5FFFA', '#FFF5EE', '#DDA0DD',
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
