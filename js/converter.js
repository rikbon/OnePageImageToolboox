document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-convert');
    const formatSelect = document.getElementById('format-select');
    const convertBtn = document.getElementById('convert-btn');
    const downloadBtn = document.getElementById('download-btn-convert');
    const imagePreview = document.getElementById('image-preview-convert');

    let originalImage = null;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            originalImage = new Image();
            originalImage.src = event.target.result;
            downloadBtn.style.display = 'none';
        };
        reader.readAsDataURL(file);
    });

    convertBtn.addEventListener('click', () => {
        if (!originalImage) return;

        const format = formatSelect.value;
        const mimeType = `image/${format}`;
        const filename = `converted-image.${format}`;

        const canvas = document.createElement('canvas');
        canvas.width = originalImage.width;
        canvas.height = originalImage.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(originalImage, 0, 0);

        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            downloadBtn.href = url;
            downloadBtn.download = filename;
            downloadBtn.style.display = 'inline-block';
        }, mimeType);
    });

    window.clearConverter = () => {
        fileInput.value = '';
        imagePreview.src = '';
        downloadBtn.style.display = 'none';
        originalImage = null;
    };
});
