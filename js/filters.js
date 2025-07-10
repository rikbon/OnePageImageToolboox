document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input-filters');
    const filterButtons = document.getElementById('filter-buttons');
    const downloadBtn = document.getElementById('download-btn-filters');
    const canvas = document.getElementById('canvas-filters');
    const ctx = canvas.getContext('2d');

    let image = null;

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            image = new Image();
            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                applyFilter('none');
                downloadBtn.style.display = 'inline-block';
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });

    filterButtons.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.dataset.filter;
            applyFilter(filter);
        }
    });

    function applyFilter(filter) {
        if (!image) return;

        ctx.filter = 'none';
        switch (filter) {
            case 'grayscale':
                ctx.filter = 'grayscale(100%)';
                break;
            case 'sepia':
                ctx.filter = 'sepia(100%)';
                break;
            case 'invert':
                ctx.filter = 'invert(100%)';
                break;
        }

        ctx.drawImage(image, 0, 0);

        downloadBtn.href = canvas.toDataURL('image/png');
        downloadBtn.download = `filtered-image-${filter}.png`;
    }

    window.clearFilters = () => {
        fileInput.value = '';
        image = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        downloadBtn.style.display = 'none';
        ctx.filter = 'none'; // Reset filter
    };
});
