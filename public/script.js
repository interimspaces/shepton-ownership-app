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

    // Modal window for building mouseover
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

    // Map zoom
    const zoomInButton
