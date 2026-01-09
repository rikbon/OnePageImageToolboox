import { calculateTargetDimensions } from './utils.js';

export const ResizerTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-resize');
        this.widthInput = document.getElementById('width-input');
        this.heightInput = document.getElementById('height-input');
        this.aspectRatioCheck = document.getElementById('aspect-ratio-check');
        this.resizeBtn = document.getElementById('resize-btn');
        this.downloadBtn = document.getElementById('download-btn-resize');
        this.imagePreview = document.getElementById('image-preview-resize');
        this.resizePreviewCanvas = document.getElementById('resize-preview-canvas');
        this.resizePreviewCtx = this.resizePreviewCanvas.getContext('2d');

        this.originalImage = null;
        this.originalWidth = 0;
        this.originalHeight = 0;
        this.aspectRatio = 1;

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    this.originalImage = img;
                    this.originalWidth = img.width;
                    this.originalHeight = img.height;
                    this.aspectRatio = this.originalWidth / this.originalHeight;
                    this.widthInput.value = this.originalWidth;
                    this.heightInput.value = this.originalHeight;
                    this.imagePreview.src = event.target.result;
                    this.downloadBtn.style.display = 'none';
                    this.resizePreviewCanvas.style.display = 'none';
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        this.handleWidthInput = () => {
            if (this.aspectRatioCheck.checked) {
                const { height } = calculateTargetDimensions(this.widthInput.value, this.heightInput.value, this.aspectRatio, 'width');
                this.heightInput.value = height;
            }
        };

        this.handleHeightInput = () => {
            if (this.aspectRatioCheck.checked) {
                const { width } = calculateTargetDimensions(this.widthInput.value, this.heightInput.value, this.aspectRatio, 'height');
                this.widthInput.value = width;
            }
        };

        this.handleResize = () => {
            if (!this.originalImage) return;

            const width = parseInt(this.widthInput.value);
            const height = parseInt(this.heightInput.value);

            if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                alert('Please enter valid dimensions.');
                return;
            }

            this.resizePreviewCanvas.width = width;
            this.resizePreviewCanvas.height = height;
            this.resizePreviewCtx.drawImage(this.originalImage, 0, 0, width, height);
            this.resizePreviewCanvas.style.display = 'block';

            this.resizePreviewCanvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                this.downloadBtn.href = url;
                this.downloadBtn.download = 'resized-image.png';
                this.downloadBtn.style.display = 'inline-block';
            }, 'image/png');
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.widthInput.addEventListener('input', this.handleWidthInput);
        this.heightInput.addEventListener('input', this.handleHeightInput);
        this.resizeBtn.addEventListener('click', this.handleResize);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.widthInput) {
            this.widthInput.removeEventListener('input', this.handleWidthInput);
            this.widthInput.value = '';
        }
        if (this.heightInput) {
            this.heightInput.removeEventListener('input', this.handleHeightInput);
            this.heightInput.value = '';
        }
        if (this.resizeBtn) this.resizeBtn.removeEventListener('click', this.handleResize);

        if (this.imagePreview) this.imagePreview.src = '';
        if (this.resizePreviewCanvas) this.resizePreviewCanvas.style.display = 'none';
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';

        this.originalImage = null;
    }
};