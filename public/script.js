window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.map-container');
    const backgroundMap = document.querySelector('.background-map');
    const buildingObjects = document.querySelector('.building-objects');

    // Fetch the SVG file
    const response = await fetch('/data/buildings.svg');
    const svgText = await response.text();
    buildingObjects.innerHTML = svgText;
    const svgElement = buildingObjects.querySelector('svg');

    // Map zoom
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    let zoomLevel = 1;

    zoomInButton.addEventListener('click', () => {
        zoomLevel += 0.1;
        if (zoomLevel > 2) zoomLevel = 2;
        svgElement.style.transformOrigin = '0 0';
        backgroundMap.style.transformOrigin = '0 0';
        svgElement.style.transform = `scale(${zoomLevel})`;
        backgroundMap.style.transform = `scale(${zoomLevel})`;
    });

    zoomOutButton.addEventListener('click', () => {
        zoomLevel -= 0.1;
        if (zoomLevel < 1) zoomLevel = 1;
        svgElement.style.transformOrigin = '0 0';
        backgroundMap.style.transformOrigin = '0 0';
        svgElement.style.transform = `scale(${zoomLevel})`;
        backgroundMap.style.transform = `scale(${zoomLevel})`;
    });

    // Add interactivity to the polygons
    svgElement.querySelectorAll('polygon').forEach((path) => {
       
