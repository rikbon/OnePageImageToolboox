document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-rotate');
    const rotateLeftBtn = document.getElementById('rotate-left-btn');
    const rotateRightBtn = document.getElementById('rotate-right-btn');
    const flipHorizontalBtn = document.getElementById('flip-horizontal-btn');
    const flipVerticalBtn = document.getElementById('flip-vertical-btn');
    const downloadBtn = document.getElementById('download-btn-rotate');
    const canvas = document.getElementById('canvas-rotate');
    const ctx = canvas.getContext('2d');

    let image = null;
    let rotation = 0;
    let scaleX = 1;
    let scaleY = 1;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            image = new Image();
            image.onload = () => {
                rotation = 0;
                scaleX = 1;
                scaleY = 1;
                drawImage();
                downloadBtn.style.display = 'inline-block';
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    function drawImage() {
        if (!image) return;

        const w = image.width;
        const h = image.height;

        // When rotating by 90 or 270, swap dimensions
        if (rotation % 180 !== 0) {
            canvas.width = h;
            canvas.height = w;
        } else {
            canvas.width = w;
            canvas.height = h;
        }

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.scale(scaleX, scaleY);
        ctx.drawImage(image, -w / 2, -h / 2);
        ctx.restore();

        downloadBtn.href = canvas.toDataURL('image/png');
        downloadBtn.download = 'rotated-image.png';
    }

    rotateLeftBtn.addEventListener('click', () => {
        rotation = (rotation - 90) % 360;
        drawImage();
    });

    rotateRightBtn.addEventListener('click', () => {
        rotation = (rotation + 90) % 360;
        drawImage();
    });

    flipHorizontalBtn.addEventListener('click', () => {
        scaleX *= -1;
        drawImage();
    });

    flipVerticalBtn.addEventListener('click', () => {
        scaleY *= -1;
        drawImage();
    });

    window.clearRotate = () => {
        fileInput.value = '';
        image = null;
        rotation = 0;
        scaleX = 1;
        scaleY = 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        downloadBtn.style.display = 'none';
    };
});
