window.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const zoomingArea = document.querySelector('.zooming-area');
  const zoomInButton = document.getElementById('zoomIn');
  const zoomOutButton = document.getElementById('zoomOut');
  const mapContainer = document.querySelector('.building-objects');
  const editButton = document.getElementById('editProperty');
  const saveButton = document.getElementById('saveProperty');
  const fields = document.querySelectorAll('.field');
  const propertysvgidField = document.getElementById('propertysvgid'); // Added

  // State variables
  let zoomLevel = 1;
  let zoomInInterval, zoomOutInterval;
  let isDragging = false;
  let prevX, prevY;
  let activePolygon;

  // Zoom functionality
  const zoomIn = () => {
    zoomLevel += 0.1;
    zoomingArea.style.transform = `scale(${zoomLevel})`;
  };

  const zoomOut = () => {
    if (zoomLevel > 0.1) {
      zoomLevel -= 0.1;
      zoomingArea.style.transform = `scale(${zoomLevel})`;
    }
  };

  zoomInButton.addEventListener('mousedown', () => {
    zoomIn();
    zoomInInterval = setInterval(zoomIn, 100);
  });

  zoomInButton.addEventListener('mouseup', () => {
    clearInterval(zoomInInterval);
  });

  zoomOutButton.addEventListener('mousedown', () => {
    zoomOut();
    zoomOutInterval = setInterval(zoomOut, 100);
  });

  zoomOutButton.addEventListener('mouseup', () => {
    clearInterval(zoomOutInterval);
  });

  // Drag functionality
  zoomingArea.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      let dx = e.clientX - prevX;
      let dy = e.clientY - prevY;
      zoomingArea.scrollLeft -= dx;
      zoomingArea.scrollTop -= dy;
      prevX = e.clientX;
      prevY = e.clientY;
    }
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Fetch SVG and add event listeners
  const response = await fetch('./data/buildings.svg');
  const svgText = await response.text();
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = svgText;
  const svgElement = tempContainer.querySelector('svg');

  const propertyDataResponse = await fetch('/properties');
  const allProperties = await propertyDataResponse.json();

  svgElement.querySelectorAll('polygon').forEach((polygon) => {
    polygon.classList.add('building-object');

    const correspondingProperty = allProperties.find((property) => property.propertyid === polygon.id);
    if (correspondingProperty) {
      polygon.dataset.propertyId = correspondingProperty.propertyid;
      polygon.dataset.propertysvgid = correspondingProperty.propertysvgid; // Added
    }

    polygon.addEventListener('click', async (e) => {
      if (activePolygon) {
        activePolygon.classList.remove('active');
      }

      activePolygon = e.target;
      activePolygon.classList.add('active');

      const propertyId = activePolygon.dataset.propertyId;
      if (!propertyId) return;

      document.getElementById('PropertyID').value = activePolygon.id;
      propertysvgidField.value = activePolygon.dataset.propertysvgid; // Added

      const propertyResponse = await fetch(`/properties/${propertyId}`);
      const propertyData = await propertyResponse.json();
      
      fields.forEach((field) => {
        const key = field.getAttribute('data-key');
        field.value = propertyData[key] || '';
        field.disabled = true;
      });

      editButton.disabled = false;
      saveButton.disabled = true;
    });
  });

  mapContainer.appendChild(svgElement);

  // Edit and Save functionalities
  editButton.addEventListener('click', () => {
    fields.forEach((field) => {
      field.disabled = false;
    });
    editButton.disabled = true;
    saveButton.disabled = false;
  });

  saveButton.addEventListener('click', async () => {
    const propertyId = activePolygon.dataset.propertyId;
    const propertyData = {};

    fields.forEach((field) => {
      const key = field.getAttribute('data-key');
      propertyData[key] = field.value;
    });

    const response = await fetch(`/properties/${propertyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(propertyData)
    });

    const result = await response.json();
    console.log(result.message);

    fields.forEach((field) => {
      field.disabled = true;
    });
    editButton.disabled = false;
    saveButton.disabled = true;
  });
});