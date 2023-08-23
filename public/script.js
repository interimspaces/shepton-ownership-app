window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.map-container');

    // Fetch the SVG file
    const response = await fetch('/data/buildings.svg');
    const svgText = await response.text();

    // Create a temporary container to parse the SVG
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    // Add interactivity to the paths
    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.setAttribute('fill', 'neutralgray');
        path.addEventListener('mouseover', (e) => {
            e.target.style.fill = '#ff0000';
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.fill = 'neutralgray';
        });
    });

    // Append the SVG to the map container
    mapContainer.appendChild(svgElement);
});
