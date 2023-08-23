window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.map-container');

    // Fetch the SVG file
    const response = await fetch('/images/buildings.svg');
    const svgText = await response.text();

    // Create a temporary container to parse the SVG
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    // Add interactivity to the paths
    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.classList.add('building-object');
        path.addEventListener('mouseover', (e) => {
            e.target.style.filter = 'drop-shadow(3px 3px 3px black)'; // Adds a shadow
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.filter = 'none'; // Removes the shadow
        });
    });

    // Append the SVG to the map container
    mapContainer.appendChild(svgElement);
});
