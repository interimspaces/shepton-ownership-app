window.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const zoomingArea = document.querySelector('.zooming-area');
  const zoomInButton = document.getElementById('zoomIn');
  const zoomOutButton = document.getElementById('zoomOut');
  const mapContainer = document.querySelector('.building-objects');
  const editButton = document.getElementById('editProperty');
  const saveButton = document.getElementById('saveProperty');
  const fields = document.querySelectorAll('.field');

  // State variables
  let zoomLevel = 1;
  let zoomInInterval, zoomOutInterval;
  let isDragging = false;
  let prevX, prevY;
  let activePolygon; // Added variable to keep track of the active polygon

  // Zoom and drag functionalities remain the same
  // ... (Your original zooming and dragging code)

  // Fetch SVG and add event listeners
  const response = await fetch('./data/buildings.svg');
  if (!response.ok) {
    console.error(`Error fetching the SVG: ${response.status}, ${response.statusText}`);
    return;
  }

  const svgText = await response.text();
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = svgText;
  const svgElement = tempContainer.querySelector('svg');

  const propertyDataResponse = await fetch('/properties');
  const allProperties = await propertyDataResponse.json();

  svgElement.querySelectorAll('polygon').forEach((polygon) => {
    const correspondingProperty = allProperties.find((property) => property.SVGID === polygon.id);
    if (correspondingProperty) {
      polygon.dataset.propertyId = correspondingProperty.PropertyID;
    }

    polygon.addEventListener('click', async (e) => {
      // Remove active state from previously active polygon
      if (activePolygon) {
        activePolygon.classList.remove('active');
      }
      
      // Mark the clicked polygon as active
      activePolygon = e.target;
      activePolygon.classList.add('active');

      const propertyId = activePolygon.dataset.propertyId;
      if (!propertyId) return;

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
    fields.forEach(field => field.disabled = false);
    editButton.disabled = true;
    saveButton.disabled = false;
  });

  saveButton.addEventListener('click', async () => {
    const propertyId = activePolygon.dataset.propertyId;
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
