document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-crop');
    const cropBtn = document.getElementById('crop-btn');
    const downloadBtn = document.getElementById('download-btn-crop');
    const imagePreview = document.getElementById('image-preview-crop');

    let cropper = null;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            cropBtn.style.display = 'inline-block';
            downloadBtn.style.display = 'none';

            if (cropper) {
                cropper.destroy();
            }

            // Initialize cropper after image is loaded and displayed
            imagePreview.onload = () => {
                cropper = new Cropper(imagePreview, {
                    aspectRatio: NaN, // Free crop
                    viewMode: 1,
                });
            };
        };
        reader.readAsDataURL(file);
    });

    cropBtn.addEventListener('click', () => {
        if (!cropper) return;

        const canvas = cropper.getCroppedCanvas();
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            downloadBtn.href = url;
            downloadBtn.download = 'cropped-image.png';
            downloadBtn.style.display = 'inline-block';
        });
    });

    window.clearCropper = () => {
        fileInput.value = '';
        imagePreview.src = '';
        imagePreview.style.display = 'none';
        cropBtn.style.display = 'none';
        downloadBtn.style.display = 'none';
        if (cropper) {
            cropper.destroy();
            cropper = null;
        }
    };
});
