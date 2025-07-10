# Image Toolbox

Image Toolbox is a client-side, single-page web application designed for various image manipulation tasks. It provides a fast, private, and user-friendly set of tools, with all processing happening directly within your browser – no image uploads to a server are required.

## Features

- **Resize**: Adjust image dimensions by pixels or percentage, maintaining aspect ratio. Includes a live preview of the resized image.
- **Convert**: Change image formats between JPEG, PNG, and WEBP.
- **Crop**: Interactively crop images using a selection tool.
- **Rotate & Flip**: Rotate images in 90-degree increments and flip them horizontally or vertically.
- **Filters**: Apply common image filters such as Grayscale, Sepia, and Invert.
- **Text Overlay**: Add custom text to images with options for font size, color, and position.
- **Color Adjustments**: Fine-tune image brightness, contrast, saturation, and hue.
- **Bulk Resize**: Process and resize multiple images simultaneously.

## Getting Started

### Running Locally (without Docker)

1.  **Clone or download** this repository to your local machine.
2.  **Open the `index.html` file** in your preferred web browser. All processing is done client-side, so no web server is strictly required for basic functionality.

### Running with Docker (Recommended)

For a more consistent environment, you can use Docker and Docker Compose.

1.  **Ensure Docker is installed:** If you don't have Docker, download and install Docker Desktop from [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop).
2.  **Navigate to the project root** in your terminal or command prompt (where `docker-compose.yml` is located).
3.  **Build and run the application** using Docker Compose:
    ```bash
    docker-compose up --build
    ```
    This command will build the Docker image (if it doesn't exist or has changed) and start the Nginx web server inside a container, exposing the application on port `8080`.
4.  **Access the application:** Open your web browser and go to `http://localhost:8080`.

To stop the application, press `Ctrl+C` in the terminal where `docker-compose up` is running. To remove the containers and associated resources, run `docker-compose down`.

## Project Structure

```
/
├── index.html               # Main application file, contains the layout and navigation.
├── css/
│   └── style.css            # Custom styles to complement Bootstrap.
├── js/
│   ├── app.js               # Main script for navigation and tool switching.
│   ├── resizer.js           # Logic for the image resizing tool.
│   ├── converter.js         # Logic for the image format conversion tool.
│   ├── cropper.js           # Logic for the image cropping tool.
│   ├── rotate.js            # Logic for the image rotation and flipping tool.
│   ├── filters.js           # Logic for applying image filters.
│   ├── text-overlay.js      # Logic for adding text overlays/watermarks.
│   ├── color-adjustments.js # Logic for adjusting image colors.
│   ├── bulk-resize.js       # Logic for bulk resizing images.
│   └── drag-and-drop.js     # Handles drag-and-drop functionality for file inputs.
├── Dockerfile               # Docker configuration for containerization.
├── docker-compose.yml       # Docker Compose configuration for easy setup.
├── .gitignore               # Specifies intentionally untracked files to ignore.
├── gemini.md                # Project context and guidelines (ignored by Git).
└── LICENSE                  # Project license.
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the WTFPL. See the [LICENSE](LICENSE) file for details.
