window.addEventListener('DOMContentLoaded', async () => {
    const buildingObjectsContainer = document.querySelector('.building-objects');

    // Fetch the SVG file (adjust the path as needed)
    const response = await fetch('/images/buildings.svg');
    const svgText = await response.text();

    // Create a temporary container to parse the SVG
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    // Add interactivity to the paths
    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.setAttribute('fill', 'gray'); // Adjust the color as needed
        path.addEventListener('mouseover', (e) => {
            e.target.style.fill = '#ff0000';
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.fill = 'gray'; // Adjust the color as needed
        });
    });

    // Append the SVG to the building objects container
    buildingObjectsContainer.appendChild(svgElement);
});
