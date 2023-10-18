// Function to set the visibility of containers
const setContainerVisibility = (containers, numberOfContainers) => {
    containers.forEach((container, index) => {
        container.style.display = index >= numberOfContainers ? 'none' : 'block';
    });
};

// Function to add a "See More" button
const addSeeMoreButton = (grid) => {

    const container = document.createElement('a');
    container.className = 'group__coin-button-container';
    
    const span = document.createElement('span');
    span.textContent = '...';
    span.className = 'group__coin-more'
    container.appendChild(span);
    
    const button = document.createElement('button');
    button.textContent = 'See More';
    button.className = 'group__coin-button'
    container.appendChild(button);

    grid.appendChild(container);

};

// Function to add link to each of "See More" Button depending on group
const addLink = () => {
    const buttons = document.querySelectorAll('.group__coin-button-container');
    const isAdmin = window.location.href.includes('admin');
    console.log(isAdmin);
    for (let button of buttons) {
        const group = button.parentElement.dataset.group;
        if (isAdmin) {
            button.href = `/${encodeURIComponent(group)}/admin`;
        } else {
            button.href = `/${encodeURIComponent(group)}`;
        }
    }
}

// Configuration object for screen widths and container limits
const screenConfig = [
    { maxWidth: 750, limit: 5 },
    { maxWidth: 1200, limit: 7 },
    { maxWidth: Infinity, limit: 9 }
];

// Main function to handle grids
const handleGrids = () => {
    const grids = document.querySelectorAll('.group__coin-grid');

    for (let grid of grids) {
        const containers = grid.querySelectorAll('.group__coin-container');
        const buttonContainer = grid.querySelector('.group__coin-button-container');
        const width = window.innerWidth;

        // Find the appropriate configuration for the current screen width
        const { limit } = screenConfig.find(config => width <= config.maxWidth);

        // Set container visibility and add "See More" button if needed
        setContainerVisibility(containers, limit);
        if (containers.length > limit && !buttonContainer) {
            addSeeMoreButton(grid);
            addLink();
        } else if (containers.length <= limit && buttonContainer) {
            buttonContainer.remove();
        }
    }
};

handleGrids();

window.addEventListener('resize', handleGrids);

