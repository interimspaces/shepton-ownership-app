window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.map-container');
    const img = document.createElement('img');
    img.src = 'images/shepton-background-map.png'; // Re-include the map image src
    img.alt = 'Map';
    mapContainer.appendChild(img);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'buildings';
    svg.setAttribute('viewBox', '0 0 800 600'); // Set viewBox based on your map's dimensions
    mapContainer.appendChild(svg);

    const response = await fetch('/data/building-outlines.json');
    const buildingOutlines = await response.json();

    buildingOutlines.forEach((building) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', convertToPath(building)); // No need for .coordinates
        path.setAttribute('fill', 'neutralgray'); // You can replace 'neutralgray' with an actual color code
        path.addEventListener('click', (e) => {
            handleBuildingClick(building, e);
        });
        svg.appendChild(path);
    });
});

function convertToPath(coordinates) {
    const d = coordinates.map((coord, index) => {
        const command = index === 0 ? 'M' : 'L';
        return `${command} ${coord[0]} ${coord[1]}`;
    }).join(' ');
    return d + ' Z';
}

function handleBuildingClick(building, e) {
    // Code to handle click event on building, e.g., show a modal to modify data
}
