window.addEventListener('DOMContentLoaded', async () => {
    const mapContainer = document.querySelector('.building-objects');
    const backgroundMap = document.querySelector('.background-map');
    const response = await fetch('/data/buildings.svg');
    const svgText = await response.text();
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = svgText;
    const svgElement = tempContainer.querySelector('svg');
    mapContainer.appendChild(svgElement);

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

    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    let zoomLevel = 1;

    zoomInButton.addEventListener('click', () => {
        zoomLevel += 0.1;
        if (zoomLevel > 2) zoomLevel = 2;
        mapContainer.style.transform = `scale(${zoomLevel})`;
        backgroundMap.style.transform = `scale(${zoomLevel})`; // Also zoom the background
    });

    zoomOutButton.addEventListener('click', () => {
        zoomLevel -= 0.1;
        if (zoomLevel < 1) zoomLevel = 1;
        mapContainer.style.transform = `scale(${zoomLevel})`;
        backgroundMap.style.transform = `scale(${zoomLevel})`; // Also zoom the background
    });
});
