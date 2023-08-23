window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.building-objects');

    // Fetch the SVG file
    const response = await fetch('../data/buildings.svg');
    const svgText = await response.text();

    // Create a temporary container to parse the SVG
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    // Add a class to the polygons
    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.classList.add('building-object');
    });

    // Append the SVG to the map container
    mapContainer.appendChild(svgElement);
});
