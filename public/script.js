window.addEventListener('DOMContentLoaded', () => {
    const svgObject = document.getElementById('buildings');
    svgObject.addEventListener('load', () => {
        const svgDoc = svgObject.contentDocument;
        const paths = svgDoc.querySelectorAll('path'); // Assuming buildings are represented as path elements

        paths.forEach((path) => {
            path.addEventListener('click', (e) => {
                handleBuildingClick(path, e);
            });
        });
    });
});

function handleBuildingClick(building, e) {
    // Code to handle click event on building, e.g., show a modal to modify data
    alert('Building clicked!'); // Example action
}
