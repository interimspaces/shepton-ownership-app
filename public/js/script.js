window.addEventListener('DOMContentLoaded', async () => {
    const zoomingArea = document.querySelector('.zooming-area');
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    const mapContainer = document.querySelector('.building-objects');
    const editButton = document.getElementById('editProperty');
    const saveButton = document.getElementById('saveProperty');    
    const fields = document.querySelectorAll('.field');

    let zoomLevel = 1;
    let zoomInInterval, zoomOutInterval;
    let isDragging = false;
    let prevX, prevY;

    // Drag functionality
    zoomingArea.addEventListener('mousedown', (e) => {
        if (zoomLevel <= 1) return;
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
    });

    zoomingArea.addEventListener('mousemove', (e) => {
        if (!isDragging || zoomLevel <= 1) return;
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
    const response = await fetch('./data/buildings.svg');
    if (!response.ok) {
        console.error('Error fetching the SVG file:', response.status, response.statusText);
        return;
    }
    
    const svgText = await response.text();
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
        path.addEventListener('click', (e) => {
            // Populate fields here based on the clicked building object
            fields.forEach(field => {
                field.value = "Sample Value"; // Replace with the actual value
                field.disabled = true;
            });
            editButton.disabled = false;
            saveButton.disabled = true;
        });
    });

    // Append the SVG to the building objects container
    mapContainer.appendChild(svgElement);

    editButton.addEventListener('click', () => {
        fields.forEach(field => {
            field.disabled = false;
        });
        editButton.disabled = true;
        saveButton.disabled = false;
    });

    saveButton.addEventListener('click', () => {
        fields.forEach(field => {
            field.disabled = true;
            // Save logic here for the fields
        });
        editButton.disabled = false;
        saveButton.disabled = true;
    });
});
