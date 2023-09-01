window.addEventListener('DOMContentLoaded', async () => {
  // DOM Elements
  const mapContainer = document.querySelector('.building-objects');
  const editButton = document.getElementById('editProperty');
  const saveButton = document.getElementById('saveProperty');
  const fields = document.querySelectorAll('.field');
  const propertysvgidField = document.getElementById('propertysvgid'); // Added

  // State variables
  let activePolygon;

  // Fetch SVG and add event listeners
  const svgResponse = await fetch('./data/buildings.svg');
  const svgText = await svgResponse.text();
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

});