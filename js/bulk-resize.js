document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-bulk-resize');
    const bulkWidthInput = document.getElementById('bulk-width-input');
    const bulkHeightInput = document.getElementById('bulk-height-input');
    const bulkAspectRatioCheck = document.getElementById('bulk-aspect-ratio-check');
    const bulkResizeBtn = document.getElementById('bulk-resize-btn');
    const bulkDownloadArea = document.getElementById('bulk-download-area');

    fileInput.addEventListener('change', (e) => {
        bulkDownloadArea.innerHTML = ''; // Clear previous results
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
                    bulkDownloadArea.appendChild(card);

                    // Store original image and aspect ratio for later use
                    card.querySelector('img').originalImage = img;
                    card.querySelector('img').aspectRatio = aspectRatio;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    });

    bulkResizeBtn.addEventListener('click', () => {
        const width = parseInt(bulkWidthInput.value);
        const height = parseInt(bulkHeightInput.value);

        if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
            alert('Please enter valid dimensions for bulk resize.');
            return;
        }

        bulkDownloadArea.querySelectorAll('.card').forEach(card => {
            const img = card.querySelector('img').originalImage;
            const aspectRatio = card.querySelector('img').aspectRatio;
            const canvas = card.querySelector('.bulk-resize-canvas');
            const downloadSingleBtn = card.querySelector('.download-single-btn');
            const ctx = canvas.getContext('2d');

            let targetWidth = width;
            let targetHeight = height;

            if (bulkAspectRatioCheck.checked) {
                if (width / height > aspectRatio) {
                    targetWidth = height * aspectRatio;
                } else {
                    targetHeight = width / aspectRatio;
                }
            }

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
    });

    window.clearBulkResize = () => {
        fileInput.value = '';
        bulkDownloadArea.innerHTML = '';
        bulkWidthInput.value = '';
        bulkHeightInput.value = '';
    };
});
