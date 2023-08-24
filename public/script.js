window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.map-container'); // Target the whole map container for zooming
    const buildingObjects = document.querySelector('.building-objects');
    const response = await fetch('/data/buildings.svg');
    const svgText = await response.text();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.classList.add('building-object');
        path.addEventListener('mouseover', (e) => {
            e.target.style.stroke = '#ff6600';
            e.target.style.strokeWidth = '6px';
            const modal = document.getElementById('buildingModal');
            modal.style.display = 'block';
            modal.style.left = e.clientX + 'px';
            modal.style.top = e.clientY + 'px';
            document.getElementById('buildingAddress').innerText = 'Address here';
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.stroke = '';
            e.target.style.strokeWidth = '';
            document.getElementById('buildingModal').style.display = 'none';
        });
    });

    buildingObjects.appendChild(svgElement); // Appending SVG to the building objects container

    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    let zoomLevel = 1;

    zoomInButton.addEventListener('click', () => {
        zoomLevel += 0.1;
        if (zoomLevel > 2) zoomLevel = 2;
        mapContainer.style.transform = `scale(${zoomLevel})`; // Applying zoom to the entire map container
    });

    zoomOutButton.addEventListener('click', () => {
        zoomLevel -= 0.1;
        if (zoomLevel < 1) zoomLevel = 1;
        mapContainer.style.transform = `scale(${zoomLevel})`; // Applying zoom to the entire map container
    });
});
