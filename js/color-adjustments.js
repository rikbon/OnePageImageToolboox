
export const ColorAdjustmentsTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-color-adjustments');
        this.canvas = document.getElementById('canvas-color-adjustments');
        this.ctx = this.canvas.getContext('2d');
        this.brightnessRange = document.getElementById('brightness-range');
        this.contrastRange = document.getElementById('contrast-range');
        this.saturationRange = document.getElementById('saturation-range');
        this.hueRotateRange = document.getElementById('hue-rotate-range');
        this.brightnessValue = document.getElementById('brightness-value');
        this.contrastValue = document.getElementById('contrast-value');
        this.saturationValue = document.getElementById('saturation-value');
        this.hueRotateValue = document.getElementById('hue-rotate-value');
        this.resetBtn = document.getElementById('reset-color-adjustments-btn');
        this.downloadBtn = document.getElementById('download-btn-color-adjustments');

        this.originalImage = null;

        this.applyAdjustments = () => {
            if (!this.originalImage) return;

            const brightness = this.brightnessRange.value;
            const contrast = this.contrastRange.value;
            const saturation = this.saturationRange.value;
            const hueRotate = this.hueRotateRange.value;

            this.ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hueRotate}deg)`;
            this.ctx.drawImage(this.originalImage, 0, 0);

            this.brightnessValue.textContent = `${brightness}%`;
            this.contrastValue.textContent = `${contrast}%`;
            this.saturationValue.textContent = `${saturation}%`;
            this.hueRotateValue.textContent = `${hueRotate}deg`;

            this.downloadBtn.href = this.canvas.toDataURL('image/png');
            this.downloadBtn.download = 'adjusted-image.png';
            this.downloadBtn.style.display = 'inline-block';
        };

        this.resetAdjustments = () => {
            this.brightnessRange.value = 100;
            this.contrastRange.value = 100;
            this.saturationRange.value = 100;
            this.hueRotateRange.value = 0;
            this.applyAdjustments();
        };

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.originalImage = new Image();
                this.originalImage.onload = () => {
                    this.canvas.width = this.originalImage.width;
                    this.canvas.height = this.originalImage.height;
                    this.resetAdjustments();
                    this.downloadBtn.style.display = 'none';
                };
                this.originalImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.brightnessRange.addEventListener('input', this.applyAdjustments);
        this.contrastRange.addEventListener('input', this.applyAdjustments);
        this.saturationRange.addEventListener('input', this.applyAdjustments);
        this.hueRotateRange.addEventListener('input', this.applyAdjustments);
        this.resetBtn.addEventListener('click', this.resetAdjustments);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.brightnessRange) this.brightnessRange.removeEventListener('input', this.applyAdjustments);
        if (this.contrastRange) this.contrastRange.removeEventListener('input', this.applyAdjustments);
        if (this.saturationRange) this.saturationRange.removeEventListener('input', this.applyAdjustments);
        if (this.hueRotateRange) this.hueRotateRange.removeEventListener('input', this.applyAdjustments);
        if (this.resetBtn) this.resetBtn.removeEventListener('click', this.resetAdjustments);

        this.originalImage = null;
        if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';

        // Reset sliders but don't call applyAdjustments since canvas is cleared
        if (this.brightnessRange) this.brightnessRange.value = 100;
        if (this.contrastRange) this.contrastRange.value = 100;
        if (this.saturationRange) this.saturationRange.value = 100;
        if (this.hueRotateRange) this.hueRotateRange.value = 0;
        if (this.brightnessValue) this.brightnessValue.textContent = '100%';
        if (this.contrastValue) this.contrastValue.textContent = '100%';
        if (this.saturationValue) this.saturationValue.textContent = '100%';
        if (this.hueRotateValue) this.hueRotateValue.textContent = '0deg';
    }
};
