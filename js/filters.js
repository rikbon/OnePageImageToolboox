
export const FiltersTool = {
    mount() {
        this.fileInput = document.getElementById('file-input-filters');
        this.filterButtons = document.getElementById('filter-buttons');
        this.downloadBtn = document.getElementById('download-btn-filters');
        this.canvas = document.getElementById('canvas-filters');
        this.ctx = this.canvas.getContext('2d');

        this.image = null;

        this.applyFilter = (filter) => {
            if (!this.image) return;

            this.ctx.filter = 'none';
            switch (filter) {
                case 'grayscale':
                    this.ctx.filter = 'grayscale(100%)';
                    break;
                case 'sepia':
                    this.ctx.filter = 'sepia(100%)';
                    break;
                case 'invert':
                    this.ctx.filter = 'invert(100%)';
                    break;
            }

            this.ctx.drawImage(this.image, 0, 0);

            this.downloadBtn.href = this.canvas.toDataURL('image/png');
            this.downloadBtn.download = `filtered-image-${filter}.png`;
        };

        this.handleFileChange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                this.image = new Image();
                this.image.onload = () => {
                    this.canvas.width = this.image.width;
                    this.canvas.height = this.image.height;
                    this.applyFilter('none');
                    this.downloadBtn.style.display = 'inline-block';
                };
                this.image.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };

        this.handleFilterClick = (e) => {
            if (e.target.classList.contains('filter-btn')) {
                const filter = e.target.dataset.filter;
                this.applyFilter(filter);
            }
        };

        this.fileInput.addEventListener('change', this.handleFileChange);
        this.filterButtons.addEventListener('click', this.handleFilterClick);
    },

    unmount() {
        if (this.fileInput) {
            this.fileInput.removeEventListener('change', this.handleFileChange);
            this.fileInput.value = '';
        }
        if (this.filterButtons) this.filterButtons.removeEventListener('click', this.handleFilterClick);

        this.image = null;
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.filter = 'none';
        }
        if (this.downloadBtn) this.downloadBtn.style.display = 'none';
    }
};
