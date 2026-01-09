import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import 'bootstrap';
import { ResizerTool } from './resizer.js';
import { ConverterTool } from './converter.js';
// import { CropperTool } from './cropper.js';
import { RotateTool } from './rotate.js';
import { FiltersTool } from './filters.js';
import { TextOverlayTool } from './text-overlay.js';
import { ColorAdjustmentsTool } from './color-adjustments.js';
import { BulkResizeTool } from './bulk-resize.js';
import { CompressorTool } from './compressor.js';
import { Base64Tool } from './base64.js';
import { MemeTool } from './meme.js';
import { initDragAndDrop } from './drag-and-drop.js';

document.addEventListener('DOMContentLoaded', () => {
    const toolLinks = document.querySelectorAll('.nav-link[data-tool]');
    const toolContainers = document.querySelectorAll('.tool-container');

    const tools = {
        'resize': ResizerTool,
        'convert': ConverterTool,
        // 'crop': CropperTool,
        'rotate': RotateTool,
        'filters': FiltersTool,
        'text-overlay': TextOverlayTool,
        'color-adjustments': ColorAdjustmentsTool,
        'bulk-resize': BulkResizeTool,
        'compress': CompressorTool,
        'base64': Base64Tool,
        'meme': MemeTool,
        'help': null // Static content, no module needed
    };

    let currentToolName = null;
    let currentToolModule = null;

    toolLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const toolName = link.dataset.tool;

            if (currentToolName === toolName) return;

            // Unmount previous tool
            if (currentToolModule && currentToolModule.unmount) {
                currentToolModule.unmount();
            }

            // Update active link
            toolLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show the selected tool container
            toolContainers.forEach(c => {
                if (c.id === `${toolName}-tool`) {
                    c.classList.add('active');
                } else {
                    c.classList.remove('active');
                }
            });

            currentToolName = toolName;
            currentToolModule = tools[toolName];

            // Mount new tool
            if (currentToolModule && currentToolModule.mount) {
                currentToolModule.mount();
            }
        });
    });

    // Initialize global drag and drop logic
    initDragAndDrop();

    // specific initialization if needed
    // Show the first tool by default
    document.querySelector('.nav-link[data-tool="resize"]').click();
});
