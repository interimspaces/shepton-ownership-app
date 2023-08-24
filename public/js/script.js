window.addEventListener('DOMContentLoaded', async () => {
    const zoomingArea = document.querySelector('.zooming-area');
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    const mapContainer = document.querySelector('.building-objects');
    let zoomLevel = 1;
    let zoomInInterval, zoomOutInterval;

    // Drag functionality
    let isDragging = false;
    let prevX, prevY;

    zoomingArea.addEventListener('mousedown', (e) => {
        if (zoomLevel <= 1) return; // Only allow dragging if zoomed in
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    zoomingArea.addEventListener('mousemove', (e) => {
        if (!isDragging || zoomLevel <= 1) return; // Only allow dragging if zoomed in
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        zoomingArea.style.left = `${parseInt(zoomingArea.style.left || 0) + dx}px`;
        zoomingArea.style.top = `${parseInt(zoomingArea.style.top || 0) + dy}px`;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    zoomingArea.addEventListener('mouseup', () => {
        isDragging = false;
    });

    zoomingArea.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    const zoomIn = () => {
        zoomLevel += 0.1;
        if (zoomLevel > 2) zoomLevel = 2;
        zoomingArea.style.transform = `scale(${zoomLevel})`;
    };

    const zoomOut = () => {
        zoomLevel -= 0.1;
        if (zoomLevel < 1) zoomLevel = 1;
        zoomingArea.style.transform = `scale(${zoomLevel})`;
        if (zoomLevel === 1) {
            zoomingArea.style.left = '1px';
            zoomingArea.style.top = '2px';
        }
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

    // Mouse wheel zooming
    zoomingArea.addEventListener('wheel', (e) => {
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    });

    // Fetch the SVG file
    const response = await fetch('../public/data/buildings.svg'); // Updated the path
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
        });
        path.addEventListener('mouseout', (e) => {
            e.target.style.stroke = '';
            e.target.style.strokeWidth = '';
        });
    });

    // Append the SVG to the building objects container
    mapContainer.appendChild(svgElement);
});
