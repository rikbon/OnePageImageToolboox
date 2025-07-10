document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-resize');
    const widthInput = document.getElementById('width-input');
    const heightInput = document.getElementById('height-input');
    const aspectRatioCheck = document.getElementById('aspect-ratio-check');
    const resizeBtn = document.getElementById('resize-btn');
    const downloadBtn = document.getElementById('download-btn-resize');
    const imagePreview = document.getElementById('image-preview-resize');
    const resizePreviewCanvas = document.getElementById('resize-preview-canvas');
    const resizePreviewCtx = resizePreviewCanvas.getContext('2d');

    let originalImage = null;
    let originalWidth = 0;
    let originalHeight = 0;
    let aspectRatio = 1;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                originalImage = img;
                originalWidth = img.width;
                originalHeight = img.height;
                aspectRatio = originalWidth / originalHeight;
                widthInput.value = originalWidth;
                heightInput.value = originalHeight;
                imagePreview.src = event.target.result;
                downloadBtn.style.display = 'none';
                resizePreviewCanvas.style.display = 'none';
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    widthInput.addEventListener('input', () => {
        if (aspectRatioCheck.checked) {
            heightInput.value = Math.round(widthInput.value / aspectRatio);
        }
    });

    heightInput.addEventListener('input', () => {
        if (aspectRatioCheck.checked) {
            widthInput.value = Math.round(heightInput.value * aspectRatio);
        }
    });

    resizeBtn.addEventListener('click', () => {
        if (!originalImage) return;

        const width = parseInt(widthInput.value);
        const height = parseInt(heightInput.value);

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            alert('Please enter valid dimensions.');
            return;
        }

        resizePreviewCanvas.width = width;
        resizePreviewCanvas.height = height;
        resizePreviewCtx.drawImage(originalImage, 0, 0, width, height);
        resizePreviewCanvas.style.display = 'block';

        resizePreviewCanvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            downloadBtn.href = url;
            downloadBtn.download = 'resized-image.png';
            downloadBtn.style.display = 'inline-block';
        }, 'image/png');
    });

    window.clearResizer = () => {
        fileInput.value = '';
        imagePreview.src = '';
        resizePreviewCanvas.style.display = 'none';
        downloadBtn.style.display = 'none';
        widthInput.value = '';
        heightInput.value = '';
        originalImage = null;
    };
});