
export const RotateTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-rotate');
        this.rotateLeftBtn = document.getElementById('rotate-left-btn');
        this.rotateRightBtn = document.getElementById('rotate-right-btn');
        this.flipHorizontalBtn = document.getElementById('flip-horizontal-btn');
        this.flipVerticalBtn = document.getElementById('flip-vertical-btn');
        this.downloadBtn = document.getElementById('download-btn-rotate');
        this.canvas = document.getElementById('canvas-rotate');
        this.ctx = this.canvas.getContext('2d');

        this.image = null;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;

        this.drawImage = () => {
            if (!this.image) return;

            const w = this.image.width;
            const h = this.image.height;

            // When rotating by 90 or 270, swap dimensions
            if (this.rotation % 180 !== 0) {
                this.canvas.width = h;
                this.canvas.height = w;
            } else {
                this.canvas.width = w;
                this.canvas.height = h;
            }

            this.ctx.save();
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.rotate(this.rotation * Math.PI / 180);
            this.ctx.scale(this.scaleX, this.scaleY);
            this.ctx.drawImage(this.image, -w / 2, -h / 2);
            this.ctx.restore();

            this.downloadBtn.href = this.canvas.toDataURL('image/png');
            this.downloadBtn.download = 'rotated-image.png';
        };

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.image = new Image();
                this.image.onload = () => {
                    this.rotation = 0;
                    this.scaleX = 1;
                    this.scaleY = 1;
                    this.drawImage();
                    this.downloadBtn.style.display = 'inline-block';
                };
                this.image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        this.handleRotateLeft = () => {
            this.rotation = (this.rotation - 90) % 360;
            this.drawImage();
        };

        this.handleRotateRight = () => {
            this.rotation = (this.rotation + 90) % 360;
            this.drawImage();
        };

        this.handleFlipHorizontal = () => {
            this.scaleX *= -1;
            this.drawImage();
        };

        this.handleFlipVertical = () => {
            this.scaleY *= -1;
            this.drawImage();
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.rotateLeftBtn.addEventListener('click', this.handleRotateLeft);
        this.rotateRightBtn.addEventListener('click', this.handleRotateRight);
        this.flipHorizontalBtn.addEventListener('click', this.handleFlipHorizontal);
        this.flipVerticalBtn.addEventListener('click', this.handleFlipVertical);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.rotateLeftBtn) this.rotateLeftBtn.removeEventListener('click', this.handleRotateLeft);
        if (this.rotateRightBtn) this.rotateRightBtn.removeEventListener('click', this.handleRotateRight);
        if (this.flipHorizontalBtn) this.flipHorizontalBtn.removeEventListener('click', this.handleFlipHorizontal);
        if (this.flipVerticalBtn) this.flipVerticalBtn.removeEventListener('click', this.handleFlipVertical);

        this.image = null;
        this.rotation = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';
    }
};
