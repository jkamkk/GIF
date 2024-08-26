document.getElementById('generateGif').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;

    if (files.length === 0) {
        alert('Please upload at least one image.');
        return;
    }

    const gif = new GIF({
        workers: 2,
        quality: 10
    });

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                gif.addFrame(img, { delay: 500, dispose: -1 });
            };
        };
        reader.readAsDataURL(file);
    });

    gif.on('finished', (blob) => {
        const gifContainer = document.getElementById('gifContainer');
        gifContainer.innerHTML = `<img src="${URL.createObjectURL(blob)}" alt="Generated GIF">`;
    });

    gif.render();
});
