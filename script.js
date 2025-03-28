const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
let img = new Image();

// Adjust canvas size dynamically
function resizeCanvas() {
    const maxWidth = window.innerWidth > 600 ? 500 : window.innerWidth * 0.9;
    canvas.width = maxWidth;
    canvas.height = maxWidth; // Keep it square
    drawPlaceholder(); // Redraw placeholder on resize
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initial call

// Draw placeholder text on the canvas
function drawPlaceholder() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${canvas.width * 0.06}px Arial`;
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Your Meme Will Appear Here!', canvas.width / 2, canvas.height / 2);
}

// Draw the placeholder initially
drawPlaceholder();

function generateMeme() {
    const topText = document.getElementById('topText').value.toUpperCase();
    const bottomText = document.getElementById('bottomText').value.toUpperCase();
    const file = document.getElementById('imageUpload').files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            img.src = event.target.result;
            img.onload = function() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                ctx.font = `${canvas.width * 0.06}px Impact`;
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.lineWidth = canvas.width * 0.004;
                ctx.textAlign = 'center';

                ctx.fillText(topText, canvas.width / 2, canvas.height * 0.1);
                ctx.strokeText(topText, canvas.width / 2, canvas.height * 0.1);

                ctx.fillText(bottomText, canvas.width / 2, canvas.height * 0.95);
                ctx.strokeText(bottomText, canvas.width / 2, canvas.height * 0.95);
            };
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image first!');
    }
}

function downloadMeme() {
    const dataUrl = canvas.toDataURL('image/png');
    
    // Detect if the user is on a mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        // On mobile: Open the image in a new tab for saving to Photos
        const newTab = window.open();
        newTab.document.write(`
            <html>
            <body style="margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background: #000; padding: 20px; box-sizing: border-box;">
                <img src="${dataUrl}" style="width: 100%; max-width: 600px; height: auto; margin-bottom: 20px;">
                <p style="color: white; text-align: center; font-family: Arial, sans-serif; font-size: 1rem; max-width: 600px;">Long-press the image and select "Save to Photos" to save it to your gallery.</p>
            </body>
            </html>
        `);
    } else {
        // On PC: Trigger a direct download
        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = dataUrl;
        link.click();
    }
}
