
export const CompressorTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-compress');
        this.previewOriginal = document.getElementById('image-preview-compress-original');
        this.previewResult = document.getElementById('image-preview-compress-result');
        this.originalSizeSpan = document.getElementById('compress-original-size');
        this.resultSizeSpan = document.getElementById('compress-result-size');
        this.qualityInput = document.getElementById('compress-quality');
        this.qualityValueSpan = document.getElementById('compress-quality-value');
        this.downloadBtn = document.getElementById('download-btn-compress');

        this.originalFile = null;
        this.originalImage = null;

        this.formatSize = (bytes) => {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        };

        this.compress = () => {
            if (!this.originalImage) return;

            const quality = parseInt(this.qualityInput.value) / 100;
            this.qualityValueSpan.textContent = this.qualityInput.value;

            const canvas = document.createElement('canvas');
            canvas.width = this.originalImage.width;
            canvas.height = this.originalImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(this.originalImage, 0, 0);

            // Determine format from original file type, default to jpeg if not webp/png
            let type = 'image/jpeg';
            if (this.originalFile.type === 'image/webp') type = 'image/webp';
            // PNG compression is lossless in toBlob usually, or uses different params, 
            // but canvas.toBlob supports quality for image/jpeg and image/webp.

            canvas.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                this.previewResult.src = url;
                this.resultSizeSpan.textContent = this.formatSize(blob.size);

                this.downloadBtn.href = url;
                this.downloadBtn.download = `compressed-${this.originalFile.name}`;
                this.downloadBtn.style.display = 'inline-block';
            }, type, quality);
        };

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            this.originalFile = file;
            this.originalSizeSpan.textContent = this.formatSize(file.size);

            const reader = new FileReader();
            reader.onload = (event) => {
                this.originalImage = new Image();
                this.originalImage.onload = () => {
                    this.previewOriginal.src = event.target.result;
                    this.compress(); // Initial compress
                };
                this.originalImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.qualityInput.addEventListener('input', this.compress);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.value = '';
            this.fileInput.removeEventListener('change', this.handleFileChange);
        }
        if (this.qualityInput) {
            this.qualityInput.removeEventListener('input', this.compress);
            this.qualityInput.value = 80;
        }

        if (this.previewOriginal) this.previewOriginal.src = '';
        if (this.previewResult) this.previewResult.src = '';
        if (this.originalSizeSpan) this.originalSizeSpan.textContent = '0 KB';
        if (this.resultSizeSpan) this.resultSizeSpan.textContent = '0 KB';
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';

        this.originalFile = null;
        this.originalImage = null;
    }
};
