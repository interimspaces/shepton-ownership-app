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
      zoomingArea.style.left = '0px';
      zoomingArea.style.top = '0px';
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

  zoomingArea.addEventListener('wheel', (e) => {
    e.deltaY < 0 ? zoomIn() : zoomOut();
  });

  const response = await fetch('/data/buildings.svg');
  if (!response.ok) {
    console.error(`Error fetching the SVG file: ${response.status}, ${response.statusText}`);
    return;
  }

  const svgText = await response.text();
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = svgText;
  const svgElement = tempContainer.querySelector('svg');

  svgElement.querySelectorAll('polygon').forEach(async (path) => {
    path.addEventListener('click', async (e) => {
      const propertyId = e.target.id;
      const property = await fetch(`/properties/${propertyId}`);
      const propertyData = await property.json();
      fields.forEach(field => {
        const key = field.getAttribute('data-key');
        field.value = propertyData.data[key] || ''; // Adjusted to data object from server
        field.disabled = true;
      });
      editButton.disabled = false;
      saveButton.disabled = true;
    });
  });

  mapContainer.appendChild(svgElement);

  editButton.addEventListener('click', () => {
    fields.forEach(field => field.disabled = false);
    editButton.disabled = true;
    saveButton.disabled = false;
  });

  saveButton.addEventListener('click', async () => {
    const propertyId = '123'; // Replace with the correct property ID
    const propertyData = {};
    fields.forEach(field => {
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

    fields.forEach(field => field.disabled = true);
    editButton.disabled = false;
    saveButton.disabled = true;
  });
});
