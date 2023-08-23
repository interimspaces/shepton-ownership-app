window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.building-objects');

    // Fetch the SVG file
    const response = await fetch('../data/buildings.svg');
    const svgText = await response.text();

    // Create a temporary container to parse the SVG
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    // Add interactivity to the paths
    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.addEventListener('mouseover', (e) => {
            e.target.style.fill = '#ff0000';
            e.target.style.filter = 'drop-shadow(3px 3px 2px rgba(0,0,0,0.3))';
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.fill = '#808080';
            e.target.style.filter = 'none';
        });
    });

    // Append the SVG to the map container
    mapContainer.appendChild(svgElement);
});
