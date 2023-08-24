window.addEventListener('DOMContentLoaded', async () => {
    const zoomingArea = document.querySelector('.zooming-area');
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    const mapContainer = document.querySelector('.building-objects');
    let zoomLevel = 1;

    const zoomIn = () => {
        zoomLevel += 0.1;
        if (zoomLevel > 2) zoomLevel = 2;
        zoomingArea.style.transform = `scale(${zoomLevel})`;
    };

    const zoomOut = () => {
        zoomLevel -= 0.1;
        if (zoomLevel < 1) zoomLevel = 1;
        zoomingArea.style.transform = `scale(${zoomLevel})`;
    };

    zoomInButton.addEventListener('mousedown', () => {
        zoomInInterval = setInterval(zoomIn, 100);
    });

    zoomInButton.addEventListener('mouseup', () => {
        clearInterval(zoomInInterval);
    });

    zoomOutButton.addEventListener('mousedown', () => {
        zoomOutInterval = setInterval(zoomOut, 100);
    });

    zoomOutButton.addEventListener('mouseup', () => {
        clearInterval(zoomOutInterval);
    });

    // Fetch the SVG file
    const response = await fetch('/data/buildings.svg');
    const svgText = await response.text();

    // Create a temporary container to parse the SVG
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');

    // Add interactivity to the polygons
    svgElement.querySelectorAll('polygon').forEach((path) => {
        path.classList.add('building-object'); // Adding the class
        path.addEventListener('mouseover', (e) => {
            e.target.style.stroke = '#ff6600';
            e.target.style.strokeWidth = '6px';
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.stroke = '';
            e.target.style.strokeWidth = '';
        });
    });

    // Append the SVG to the building objects container
    mapContainer.appendChild(svgElement);
});
