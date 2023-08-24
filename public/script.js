window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.map-container');

    // Fetch the SVG file
    const response = await fetch('/data/buildings.svg');
    const svgText = await response.text();

    // Create a temporary container to parse the SVG
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    // Add interactivity to the polygons
    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.classList.add('building-object');
        path.addEventListener('mouseover', (e) => {
            e.target.style.stroke = '#ff6600';
            e.target.style.strokeWidth = '6px';
            e.target.style.filter = 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))';
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.stroke = '#999999';
            e.target.style.strokeWidth = '0px';
            e.target.style.filter = 'drop-shadow(0 0px 0px rgba(0, 0, 0, 0))';
        });
    });

    // Append the SVG to the building objects container
    mapContainer.appendChild(svgElement);

    // Map zoom
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    let zoomLevel = 1;

    zoomInButton.addEventListener('click', () => {
        zoomLevel += 0.1;
        if (zoomLevel > 2) zoomLevel = 2;
        mapContainer.style.transformOrigin = '0 0';
        mapContainer.style.transform = `scale(${zoomLevel})`;
    });

    zoomOutButton.addEventListener('click', () => {
        zoomLevel -= 0.1;
        if (zoomLevel < 1) zoomLevel = 1;
        mapContainer.style.transformOrigin = '0 0';
        mapContainer.style.transform = `scale(${zoomLevel})`;
    });
});
