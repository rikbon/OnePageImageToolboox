# Image Toolbox

Image Toolbox is a client-side, single-page web application designed for various image manipulation tasks. It provides a fast, private, and user-friendly set of tools, with all processing happening directly within your browser – no image uploads to a server are required.

## Features

- **Resize**: Adjust image dimensions by pixels or percentage, maintaining aspect ratio. Includes a live preview.
- **Convert**: Change image formats between JPEG, PNG, and WEBP.
- **Crop**: Interactively crop images using a selection tool.
- **Rotate & Flip**: Rotate images in 90-degree increments and flip them horizontally or vertically.
- **Filters**: Apply common image filters such as Grayscale, Sepia, and Invert.
- **Text Overlay**: Add custom text to images with options for font size, color, and position.
- **Color Adjustments**: Fine-tune image brightness, contrast, saturation, and hue.
- **Bulk Resize**: Process and resize multiple images simultaneously.
- **Meme Generator**: Create memes by adding custom top and bottom text to your images with adjustable styling.
- **Image Compressor**: Compress images to reduce file size while maintaining visual quality.
- **Base64 Encoder/Decoder**: Convert images to Base64 strings for embedding and decode Base64 strings back to images.

## Technologies Used

- **Vite**: Fast frontend build tool and development server.
- **Bootstrap 5**: Responsive CSS framework for UI components.
- **Cropper.js**: JavaScript library for image cropping.
- **Vitest**: Unit testing framework.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- npm (usually included with Node.js) or yarn/pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rikbon/OnePageImageToolboox.git
    cd 1ps
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running Locally (Development)

Start the development server with hot-reload:
```bash
npm run dev
```
Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`).

### Building for Production

To build the application for deployment:
```bash
npm run build
```
This will generate the production-ready files in the `dist` directory.

You can preview the production build locally using:
```bash
npm run preview
```

### Running Tests

Run the automated test suite:
```bash
npm test
```

### Running with Docker

For a consistent environment without installing Node.js locally, you can use Docker.

1.  **Build and run the application:**
    ```bash
    docker-compose up --build
    ```
    This command builds the Docker image and starts an Nginx server in a container.

2.  **Access the application:**
    Open your web browser and go to `http://localhost:8080`.

To stop the application, press `Ctrl+C` or run `docker-compose down`.

## Project Structure

```
/
├── index.html               # Main entry point.
├── vite.config.js           # Vite configuration.
├── package.json             # Project dependencies and scripts.
├── css/
│   └── style.css            # Custom styles.
├── js/
│   ├── app.js               # Main application logic and routing.
│   ├── resizer.js           # Image resizing logic.
│   ├── converter.js         # Image format conversion.
│   ├── cropper.js           # Image cropping wrapper.
│   ├── rotate.js            # Rotation and flipping.
│   ├── filters.js           # Image filters.
│   ├── text-overlay.js      # Text overlay tool.
│   ├── color-adjustments.js # Color correction tools.
│   ├── bulk-resize.js       # Bulk processing logic.
│   ├── meme.js              # Meme generator logic.
│   ├── compressor.js        # Image compression logic.
│   ├── base64.js            # Base64 encoding/decoding.
│   ├── utils.js             # Shared utility functions.
│   └── drag-and-drop.js     # Drag-and-drop file handling.
├── tests/                   # Unit tests.
├── Dockerfile               # Docker build definition.
└── docker-compose.yml       # Docker Compose configuration.
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the ISC License.
