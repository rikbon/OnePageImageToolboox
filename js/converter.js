
export const ConverterTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-convert');
        this.formatSelect = document.getElementById('format-select');
        this.convertBtn = document.getElementById('convert-btn');
        this.downloadBtn = document.getElementById('download-btn-convert');
        this.imagePreview = document.getElementById('image-preview-convert');

        this.originalImage = null;

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.imagePreview.src = event.target.result;
                this.originalImage = new Image();
                this.originalImage.src = event.target.result;
                this.downloadBtn.style.display = 'none';
            };
            reader.readAsDataURL(file);
        };

        this.handleConvert = () => {
            if (!this.originalImage) return;

            const format = this.formatSelect.value;
            const mimeType = `image/${format}`;
            const filename = `converted-image.${format}`;

            const canvas = document.createElement('canvas');
            canvas.width = this.originalImage.width;
            canvas.height = this.originalImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.originalImage, 0, 0);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                this.downloadBtn.href = url;
                this.downloadBtn.download = filename;
                this.downloadBtn.style.display = 'inline-block';
            }, mimeType);
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.convertBtn.addEventListener('click', this.handleConvert);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.convertBtn) this.convertBtn.removeEventListener('click', this.handleConvert);

        if (this.imagePreview) this.imagePreview.src = '';
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';

        this.originalImage = null;
    }
};
