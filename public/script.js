// Load the building outlines from JSON
fetch("../data/buildings-outlines.json")
  .then((response) => response.json())
  .then((buildings) => {
    // Add buildings to the map
    const mapContainer = document.querySelector('.map-container');
    buildings.forEach((building, index) => {
      const buildingElement = document.createElement('div');
      buildingElement.classList.add('building');
      buildingElement.style.left = building.x + 'px';
      buildingElement.style.top = building.y + 'px';
      buildingElement.style.width = building.width + 'px';
      buildingElement.style.height = building.height + 'px';
      
      // Event listener to handle building click
      buildingElement.addEventListener('click', () => handleBuildingClick(building, index));
      
      mapContainer.appendChild(buildingElement);
    });
  })
  .catch((error) => console.error("An error occurred while loading buildings:", error));

// Function to handle building click
function handleBuildingClick(building, index) {
  // You can define what happens when a building is clicked
  // For example, show building details, etc.
  console.log("Building clicked:", building, index);
}
