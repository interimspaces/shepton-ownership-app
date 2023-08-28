async function fetchSVG(svgPath) {
    const response = await fetch(svgPath);
    const svgText = await response.text();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    return tempContainer.querySelector('svg');
  }
  
  async function fetchPropertyData(apiUrl) {
    const response = await fetch(apiUrl);
    return await response.json();
  }
  
  function addInteractivity(svgElement, propertyData) {
    const polygons = svgElement.querySelectorAll('polygon');
    polygons.forEach((polygon, index) => {
      polygon.classList.add('building');
      const data = propertyData[index];
      for (const [key, value] of Object.entries(data)) {
        polygon.dataset[key] = value;
      }
      polygon.addEventListener('click', function() {
        document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        polygon.classList.add('active');
        populateFields(data);
        disableFields();
        enableEditButton();
      });
    });
  }
  
  function populateFields(data) {
    // Populate specific fields with property data
  }
  
  function disableFields() {
    // Disable the fields
  }
  
  function enableEditButton() {
    // Enable the edit button
  }
  
  async function initMap(svgPath, apiUrl, mapContainerId) {
    const svgElement = await fetchSVG(svgPath);
    const propertyData = await fetchPropertyData(apiUrl);
    addInteractivity(svgElement, propertyData);
    document.getElementById(mapContainerId).appendChild(svgElement);
  }