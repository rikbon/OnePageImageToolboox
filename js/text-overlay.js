
export const TextOverlayTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-text-overlay');
        this.overlayText = document.getElementById('overlay-text');
        this.fontSizeInput = document.getElementById('font-size');
        this.fontColorInput = document.getElementById('font-color');
        this.posXInput = document.getElementById('pos-x');
        this.posYInput = document.getElementById('pos-y');
        this.applyTextBtn = document.getElementById('apply-text-overlay-btn');
        this.downloadBtn = document.getElementById('download-btn-text-overlay');
        this.canvas = document.getElementById('canvas-text-overlay');
        this.ctx = this.canvas.getContext('2d');

        this.originalImage = null;

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.originalImage = new Image();
                this.originalImage.onload = () => {
                    this.canvas.width = this.originalImage.width;
                    this.canvas.height = this.originalImage.height;
                    this.ctx.drawImage(this.originalImage, 0, 0);
                    this.downloadBtn.style.display = 'none';
                };
                this.originalImage.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        this.handleApplyText = () => {
            if (!this.originalImage) return;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(this.originalImage, 0, 0);

            const text = this.overlayText.value;
            const fontSize = this.fontSizeInput.value;
            const fontColor = this.fontColorInput.value;
            const posX = parseInt(this.posXInput.value);
            const posY = parseInt(this.posYInput.value);

            this.ctx.font = `${fontSize}px Arial`;
            this.ctx.fillStyle = fontColor;
            this.ctx.fillText(text, posX, posY);

            this.downloadBtn.href = this.canvas.toDataURL('image/png');
            this.downloadBtn.download = 'image-with-text.png';
            this.downloadBtn.style.display = 'inline-block';
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.applyTextBtn.addEventListener('click', this.handleApplyText);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.applyTextBtn) this.applyTextBtn.removeEventListener('click', this.handleApplyText);

        if (this.overlayText) this.overlayText.value = '';
        if (this.fontSizeInput) this.fontSizeInput.value = 30;
        if (this.fontColorInput) this.fontColorInput.value = '#000000';
        if (this.posXInput) this.posXInput.value = 10;
        if (this.posYInput) this.posYInput.value = 50;
        if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';

        this.originalImage = null;
    }
};
