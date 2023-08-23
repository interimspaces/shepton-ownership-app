window.addEventListener('DOMContentLoaded', async () => {
    // Path to your SVG file
    const svgPath = 'images/buildings.svg';
    
    // Select the container where you want to place the SVG
    const buildingObjectsContainer = document.querySelector('.building-objects');

    // Fetch the SVG file
    const response = await fetch(svgPath);
    const svgText = await response.text();

    // Parse the fetched SVG text
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

    // Append the parsed SVG to the container
    buildingObjectsContainer.appendChild(svgDoc.documentElement);
    
    // Optionally, you can now add event listeners or manipulate the SVG as needed
});
