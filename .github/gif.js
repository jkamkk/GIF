function generateGIF() {
    const fileInput = document.getElementById('fileInput');
    const gifPreview = document.getElementById('gifPreview');
    gifPreview.innerHTML = ''; // Clear previous preview

    if (fileInput.files.length === 0) {
        alert('Please select some images.');
        return;
    }

    const gif = new GIF({
        workers: 2,
        quality: 10
    });

    Array.from(fileInput.files).forEach(file => {
        const reader = new FileReader();

        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                gif.addFrame(img, { delay: 500 });
                if (fileInput.files[fileInput.files.length - 1] === file) {
                    gif.on('finished', function(blob) {
                        const gifURL = URL.createObjectURL(blob);
                        const gifImage = document.createElement('img');
                        gifImage.src = gifURL;
                        gifPreview.appendChild(gifImage);
                    });
                    gif.render();
                }
            };
            img.src = event.target.result;
        };
        
        reader.readAsDataURL(file);
    });
}
