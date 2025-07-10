document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-text-overlay');
    const overlayText = document.getElementById('overlay-text');
    const fontSizeInput = document.getElementById('font-size');
    const fontColorInput = document.getElementById('font-color');
    const posXInput = document.getElementById('pos-x');
    const posYInput = document.getElementById('pos-y');
    const applyTextBtn = document.getElementById('apply-text-overlay-btn');
    const downloadBtn = document.getElementById('download-btn-text-overlay');
    const canvas = document.getElementById('canvas-text-overlay');
    const ctx = canvas.getContext('2d');

    let originalImage = null;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            originalImage = new Image();
            originalImage.onload = () => {
                canvas.width = originalImage.width;
                canvas.height = originalImage.height;
                ctx.drawImage(originalImage, 0, 0);
                downloadBtn.style.display = 'none';
            };
            originalImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    applyTextBtn.addEventListener('click', () => {
        if (!originalImage) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(originalImage, 0, 0);

        const text = overlayText.value;
        const fontSize = fontSizeInput.value;
        const fontColor = fontColorInput.value;
        const posX = parseInt(posXInput.value);
        const posY = parseInt(posYInput.value);

        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = fontColor;
        ctx.fillText(text, posX, posY);

        downloadBtn.href = canvas.toDataURL('image/png');
        downloadBtn.download = 'image-with-text.png';
        downloadBtn.style.display = 'inline-block';
    });

    window.clearTextOverlay = () => {
        fileInput.value = '';
        overlayText.value = '';
        fontSizeInput.value = 30;
        fontColorInput.value = '#000000';
        posXInput.value = 10;
        posYInput.value = 50;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        downloadBtn.style.display = 'none';
        originalImage = null;
    };
});
