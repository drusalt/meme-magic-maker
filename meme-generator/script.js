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
    ctx.font = `${canvas.width * 0.06}px Arial`; // Slightly larger font for mobile
    ctx.fillStyle = '#999';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'; // Center vertically
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
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}