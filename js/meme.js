
export const MemeTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-meme');
        this.canvas = document.getElementById('canvas-meme');
        this.ctx = this.canvas.getContext('2d');
        this.topTextInput = document.getElementById('meme-top-text');
        this.topColorInput = document.getElementById('meme-top-color');
        this.bottomTextInput = document.getElementById('meme-bottom-text');
        this.bottomColorInput = document.getElementById('meme-bottom-color');
        this.fontSizeInput = document.getElementById('meme-font-size');
        this.generateBtn = document.getElementById('generate-meme-btn');
        this.downloadBtn = document.getElementById('download-btn-meme');

        this.image = null;

        this.drawMeme = () => {
            if (!this.image) return;

            // Clear and draw image
            this.canvas.width = this.image.width;
            this.canvas.height = this.image.height;
            this.ctx.drawImage(this.image, 0, 0);

            // Settings
            const fontSize = parseInt(this.fontSizeInput.value);
            this.ctx.font = `${fontSize}px Impact`; // Classic meme font
            this.ctx.strokeStyle = 'black';
            this.ctx.lineWidth = Math.floor(fontSize / 15);
            this.ctx.textAlign = 'center';

            // Top Text
            const topText = this.topTextInput.value.toUpperCase();
            if (topText) {
                this.ctx.fillStyle = this.topColorInput.value;
                this.ctx.textBaseline = 'top';
                this.ctx.fillText(topText, this.canvas.width / 2, 20);
                this.ctx.strokeText(topText, this.canvas.width / 2, 20);
            }

            // Bottom Text
            const bottomText = this.bottomTextInput.value.toUpperCase();
            if (bottomText) {
                this.ctx.fillStyle = this.bottomColorInput.value;
                this.ctx.textBaseline = 'bottom';
                this.ctx.fillText(bottomText, this.canvas.width / 2, this.canvas.height - 20);
                this.ctx.strokeText(bottomText, this.canvas.width / 2, this.canvas.height - 20);
            }

            this.downloadBtn.href = this.canvas.toDataURL('image/png');
            this.downloadBtn.download = 'meme.png';
            this.downloadBtn.style.display = 'inline-block';
        };

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.image = new Image();
                this.image.onload = () => {
                    this.drawMeme();
                };
                this.image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        if (this.fileInput) this.fileInput.addEventListener('change', this.handleFileChange);
        if (this.generateBtn) this.generateBtn.addEventListener('click', this.drawMeme);
        if (this.topTextInput) this.topTextInput.addEventListener('input', this.drawMeme);
        if (this.topColorInput) this.topColorInput.addEventListener('input', this.drawMeme);
        if (this.bottomTextInput) this.bottomTextInput.addEventListener('input', this.drawMeme);
        if (this.bottomColorInput) this.bottomColorInput.addEventListener('input', this.drawMeme);
        if (this.fontSizeInput) this.fontSizeInput.addEventListener('input', this.drawMeme);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.value = '';
            this.fileInput.removeEventListener('change', this.handleFileChange);
        }
        if (this.generateBtn) this.generateBtn.removeEventListener('click', this.drawMeme);

        if (this.topTextInput) {
            this.topTextInput.removeEventListener('input', this.drawMeme);
            this.topTextInput.value = '';
        }
        if (this.topColorInput) {
            this.topColorInput.removeEventListener('input', this.drawMeme);
            this.topColorInput.value = '#ffffff';
        }

        if (this.bottomTextInput) {
            this.bottomTextInput.removeEventListener('input', this.drawMeme);
            this.bottomTextInput.value = '';
        }
        if (this.bottomColorInput) {
            this.bottomColorInput.removeEventListener('input', this.drawMeme);
            this.bottomColorInput.value = '#ffffff';
        }

        if (this.fontSizeInput) {
            this.fontSizeInput.removeEventListener('input', this.drawMeme);
            this.fontSizeInput.value = 40;
        }

        this.image = null;
        if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';

    }
};
