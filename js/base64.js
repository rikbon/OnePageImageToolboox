
export const Base64Tool = {
    mount() {
        // Tab 1: Image to Base64
        this.fileInput = document.getElementById('file-input-base64');
        this.outputArea = document.getElementById('base64-output');
        this.copyBtn = document.getElementById('copy-base64-btn');

        // Tab 2: Base64 to Image
        this.inputArea = document.getElementById('base64-input');
        this.showImageBtn = document.getElementById('show-image-btn');
        this.imagePreview = document.getElementById('image-preview-base64');
        this.downloadBtn = document.getElementById('download-btn-base64');

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.outputArea.value = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        this.handleCopy = () => {
            this.outputArea.select();
            document.execCommand('copy'); // Fallback or use Clipboard API
            // navigator.clipboard.writeText(this.outputArea.value); // Modern way

            const originalText = this.copyBtn.textContent;
            this.copyBtn.textContent = 'Copied!';
            setTimeout(() => this.copyBtn.textContent = originalText, 2000);
        };

        this.handleShowImage = () => {
            const base64Str = this.inputArea.value.trim();
            if (!base64Str) return;

            this.imagePreview.src = base64Str;
            this.downloadBtn.href = base64Str;
            // Try to guess extension
            let ext = 'png';
            if (base64Str.startsWith('data:image/jpeg')) ext = 'jpg';
            else if (base64Str.startsWith('data:image/webp')) ext = 'webp';
            else if (base64Str.startsWith('data:image/gif')) ext = 'gif';

            this.downloadBtn.download = `image-from-base64.${ext}`;
            this.downloadBtn.style.display = 'inline-block';
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.copyBtn.addEventListener('click', this.handleCopy);
        this.showImageBtn.addEventListener('click', this.handleShowImage);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.value = '';
            this.fileInput.removeEventListener('change', this.handleFileChange);
        }
        if (this.outputArea) this.outputArea.value = '';
        if (this.copyBtn) this.copyBtn.removeEventListener('click', this.handleCopy);

        if (this.inputArea) this.inputArea.value = '';
        if (this.showImageBtn) this.showImageBtn.removeEventListener('click', this.handleShowImage);
        if (this.imagePreview) this.imagePreview.src = '';
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';
    }
};
