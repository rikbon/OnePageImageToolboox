import { calculateBulktargetDimensions } from './utils.js';

export const BulkResizeTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-bulk-resize');
        this.bulkWidthInput = document.getElementById('bulk-width-input');
        this.bulkHeightInput = document.getElementById('bulk-height-input');
        this.bulkAspectRatioCheck = document.getElementById('bulk-aspect-ratio-check');
        this.bulkResizeBtn = document.getElementById('bulk-resize-btn');
        this.bulkDownloadArea = document.getElementById('bulk-download-area');

        this.handleFileChange = (e) => {
            this.bulkDownloadArea.innerHTML = ''; // Clear previous results
            const files = e.target.files;
            if (files.length === 0) return;

            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const originalWidth = img.width;
                        const originalHeight = img.height;
                        const aspectRatio = originalWidth / originalHeight;

                        const card = document.createElement('div');
                        card.classList.add('col-md-4', 'mb-3');
                        card.innerHTML = `
                            <div class="card">
                                <img src="${event.target.result}" class="card-img-top" alt="${file.name}">
                                <div class="card-body">
                                    <h5 class="card-title">${file.name}</h5>
                                    <p class="card-text">Original: ${originalWidth}x${originalHeight}</p>
                                    <canvas class="bulk-resize-canvas" style="max-width: 100%; display: none;"></canvas>
                                    <a class="btn btn-success mt-2 download-single-btn" style="display: none;">Download</a>
                                </div>
                            </div>
                        `;
                        this.bulkDownloadArea.appendChild(card);

                        // Store original image and aspect ratio for later use
                        card.querySelector('img').originalImage = img;
                        card.querySelector('img').aspectRatio = aspectRatio;
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            });
        };

        this.handleResize = () => {
            const width = parseInt(this.bulkWidthInput.value);
            const height = parseInt(this.bulkHeightInput.value);

            if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
                alert('Please enter valid dimensions for bulk resize.');
                return;
            }

            this.bulkDownloadArea.querySelectorAll('.card').forEach(card => {
                const img = card.querySelector('img').originalImage;
                const aspectRatio = card.querySelector('img').aspectRatio;
                const canvas = card.querySelector('.bulk-resize-canvas');
                const downloadSingleBtn = card.querySelector('.download-single-btn');
                const ctx = canvas.getContext('2d');

                const { width: targetWidth, height: targetHeight } = calculateBulktargetDimensions(
                    img.width, img.height, width, height, this.bulkAspectRatioCheck.checked
                );

                canvas.width = targetWidth;
                canvas.height = targetHeight;
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
                canvas.style.display = 'block';

                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    downloadSingleBtn.href = url;
                    downloadSingleBtn.download = `resized-${card.querySelector('.card-title').textContent}`;
                    downloadSingleBtn.style.display = 'inline-block';
                }, 'image/png');
            });
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.bulkResizeBtn.addEventListener('click', this.handleResize);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.bulkResizeBtn) this.bulkResizeBtn.removeEventListener('click', this.handleResize);

        if (this.bulkDownloadArea) this.bulkDownloadArea.innerHTML = '';
        if (this.bulkWidthInput) this.bulkWidthInput.value = '';
        if (this.bulkHeightInput) this.bulkHeightInput.value = '';
    }
};
