document.addEventListener('DOMContentLoaded', () => {
    const toolLinks = document.querySelectorAll('.nav-link[data-tool]');
    const toolContainers = document.querySelectorAll('.tool-container');

    let currentTool = null;

    toolLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tool = link.dataset.tool;

            // Clear previous tool's content if it exists
            if (currentTool) {
                const clearFunctionName = `clear${currentTool.charAt(0).toUpperCase() + currentTool.slice(1)}`;
                console.log(`Attempting to call: ${clearFunctionName}`);
                if (window[clearFunctionName]) {
                    window[clearFunctionName]();
                    console.log(`${clearFunctionName} called successfully.`);
                } else {
                    console.log(`${clearFunctionName} not found.`);
                }
            }

            // Update active link
            toolLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show the selected tool container
            toolContainers.forEach(c => {
                if (c.id === `${tool}-tool`) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });

            currentTool = tool;
        });
    });

    // Show the first tool by default
    document.querySelector('.nav-link[data-tool="resize"]').click();
});
