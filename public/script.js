window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.map-container');
    const img = document.createElement('img');
    // img.src = 'images/shepton-background-map.png';
    img.alt = 'Map';
    mapContainer.appendChild(img);

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'buildings';
    mapContainer.appendChild(svg);

    const response = await fetch('/data/buildings.svg');
    const buildingOutlines = await response.json();

    buildingOutlines.forEach((building) => {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', convertToPath(building.coordinates));
        path.setAttribute('fill', 'neutralgray');
        path.setAttribute('class', 'building-object'); // Added line to set CSS class
        path.addEventListener('click', (e) => {
            handleBuildingClick(building, e);
        });
        path.addEventListener('mouseover', (e) => { // Added mouseover event listener
            e.target.style.fill = '#ff0000'; // Change to desired hover color
        });
        path.addEventListener('mouseout', (e) => { // Added mouseout event listener
            e.target.style.fill = 'neutralgray'; // Change back to original color
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
