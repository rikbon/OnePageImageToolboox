document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-color-adjustments');
    const canvas = document.getElementById('canvas-color-adjustments');
    const ctx = canvas.getContext('2d');
    const brightnessRange = document.getElementById('brightness-range');
    const contrastRange = document.getElementById('contrast-range');
    const saturationRange = document.getElementById('saturation-range');
    const hueRotateRange = document.getElementById('hue-rotate-range');
    const brightnessValue = document.getElementById('brightness-value');
    const contrastValue = document.getElementById('contrast-value');
    const saturationValue = document.getElementById('saturation-value');
    const hueRotateValue = document.getElementById('hue-rotate-value');
    const resetBtn = document.getElementById('reset-color-adjustments-btn');
    const downloadBtn = document.getElementById('download-btn-color-adjustments');

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
                resetAdjustments();
                downloadBtn.style.display = 'none';
            };
            originalImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    function applyAdjustments() {
        if (!originalImage) return;

        const brightness = brightnessRange.value;
        const contrast = contrastRange.value;
        const saturation = saturationRange.value;
        const hueRotate = hueRotateRange.value;

        ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hueRotate}deg)`;
        ctx.drawImage(originalImage, 0, 0);

        brightnessValue.textContent = `${brightness}%`;
        contrastValue.textContent = `${contrast}%`;
        saturationValue.textContent = `${saturation}%`;
        hueRotateValue.textContent = `${hueRotate}deg`;

        downloadBtn.href = canvas.toDataURL('image/png');
        downloadBtn.download = 'adjusted-image.png';
        downloadBtn.style.display = 'inline-block';
    }

    function resetAdjustments() {
        brightnessRange.value = 100;
        contrastRange.value = 100;
        saturationRange.value = 100;
        hueRotateRange.value = 0;
        applyAdjustments();
    }

    brightnessRange.addEventListener('input', applyAdjustments);
    contrastRange.addEventListener('input', applyAdjustments);
    saturationRange.addEventListener('input', applyAdjustments);
    hueRotateRange.addEventListener('input', applyAdjustments);
    resetBtn.addEventListener('click', resetAdjustments);

    window.clearColorAdjustments = () => {
        fileInput.value = '';
        originalImage = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        downloadBtn.style.display = 'none';
        resetAdjustments(); // Reset sliders and values
    };
});
