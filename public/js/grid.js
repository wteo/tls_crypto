// Function to set the visibility of containers
const setContainerVisibility = (containers, numberOfContainers) => {
    containers.forEach((container, index) => {
        container.style.display = index >= numberOfContainers ? 'none' : 'block';
    });
};

// Function to add a "See More" button
const addSeeMoreButton = (grid) => {

    const container = document.createElement('div');
    container.className = 'region__location-button-container';
    
    const span = document.createElement('span');
    span.textContent = '...';
    span.className = 'region__location-more'
    container.appendChild(span);
    
    const button = document.createElement('button');
    button.textContent = 'See More';
    button.className = 'region__location-button'
    container.appendChild(button);

    grid.appendChild(container);

};

// Configuration object for screen widths and container limits
const screenConfig = [
    { maxWidth: 750, limit: 5 },
    { maxWidth: 1200, limit: 7 },
    { maxWidth: Infinity, limit: 9 }
];

// Main function to handle grids
const handleGrids = () => {
    const grids = document.querySelectorAll('.region__location-grid');

    for (let grid of grids) {
        const containers = grid.querySelectorAll('.region__location-container');
        const button = grid.querySelectorAll('.region__location-button-container');
        const width = window.innerWidth;

        // Find the appropriate configuration for the current screen width
        const { limit } = screenConfig.find(config => width <= config.maxWidth);

        // Set container visibility and add "See More" button if needed
        setContainerVisibility(containers, limit);
        if (containers.length > limit && button.length < 1) {
            addSeeMoreButton(grid);
        }
        
    }
};

handleGrids();

window.addEventListener('resize', handleGrids);

