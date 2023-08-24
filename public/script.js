window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.building-objects');

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

// modal window for building mouseover
svgElement.querySelectorAll('polygon').forEach((path) => {
    path.addEventListener('mouseover', (e) => {
        e.target.style.fill = '#ff6600';

        // Get the modal element
        const modal = document.getElementById('buildingModal');

        // Show the modal
        modal.style.display = 'block';

        // Set the position based on the cursor
        modal.style.left = e.clientX + 'px';
        modal.style.top = e.clientY + 'px';

        // Set the address (this will be dynamic later)
        document.getElementById('buildingAddress').innerText = 'Address here';
    });

    path.addEventListener('mouseout', (e) => {
        e.target.style.fill = '#999999';

        // Hide the modal
        document.getElementById('buildingModal').style.display = 'none';
    });
});


// map zoom
window.addEventListener('DOMContentLoaded', async () => {
    // ... rest of your existing code ...

    // map zoom
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    const mapContainer = document.querySelector('.map-container');
    let zoomLevel = 1;

    zoomInButton.addEventListener('click', () => {
        zoomLevel += 0.1;
        if (zoomLevel > 2) zoomLevel = 2; // Set max zoom level
        mapContainer.style.transformOrigin = '0 0'; // Anchor the zoom to the top left
        mapContainer.style.transform = `scale(${zoomLevel})`;
    });

    zoomOutButton.addEventListener('click', () => {
        zoomLevel -= 0.1;
        if (zoomLevel < 1) zoomLevel = 1; // Set min zoom level
        mapContainer.style.transformOrigin = '0 0'; // Anchor the zoom to the top left
        mapContainer.style.transform = `scale(${zoomLevel})`;
    });
});
