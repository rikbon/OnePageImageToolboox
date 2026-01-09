
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

export const CropperTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-crop');
        this.cropBtn = document.getElementById('crop-btn');
        this.downloadBtn = document.getElementById('download-btn-crop');
        this.imagePreview = document.getElementById('image-preview-crop');

        this.cropper = null;

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.imagePreview.src = event.target.result;
                this.imagePreview.style.display = 'block';
                this.cropBtn.style.display = 'inline-block';
                this.downloadBtn.style.display = 'none';

                if (this.cropper) {
                    this.cropper.destroy();
                }

                // Initialize cropper after image is loaded and displayed
                this.imagePreview.onload = () => {
                    this.cropper = new Cropper(this.imagePreview, {
                        aspectRatio: NaN, // Free crop
                        viewMode: 1,
                    });
                };
            };
            reader.readAsDataURL(file);
        };

        this.handleCrop = () => {
            if (!this.cropper) return;

            const canvas = this.cropper.getCroppedCanvas();
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                this.downloadBtn.href = url;
                this.downloadBtn.download = 'cropped-image.png';
                this.downloadBtn.style.display = 'inline-block';
            });
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.cropBtn.addEventListener('click', this.handleCrop);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.cropBtn) {
            this.cropBtn.removeEventListener('click', this.handleCrop);
            this.cropBtn.style.display = 'none';
        }

        if (this.imagePreview) {
            this.imagePreview.src = '';
            this.imagePreview.style.display = 'none';
        }
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';

        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    }
};
