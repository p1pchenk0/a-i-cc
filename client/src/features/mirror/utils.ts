async function askForVideoPermission() {
  const constraints = {
    video: true
  };

  return navigator.mediaDevices.getUserMedia(constraints);
}

export async function streamVideo({ videoEl, canvas, container, mirrorGetter, textGetter }) {
  const ctx = canvas.getContext('2d');

  let proportions = 0;

  videoEl.srcObject = await askForVideoPermission();
  videoEl.play();

  function draw() {
    const text = textGetter() || '';
    const isMirrored = mirrorGetter();
    proportions = videoEl.videoWidth / videoEl.videoHeight;

    // Set the canvas dimensions to match the video dimensions
    canvas.width = container.clientWidth;
    canvas.height = canvas.width / proportions;

    // TODO: move to const
    const fontSizeInPx = canvas.width > 500 ? 30 : 20;

    // Flip the canvas horizontally
    ctx.save();
    ctx.scale(isMirrored ? -1 : 1, 1);
    ctx.drawImage(videoEl, isMirrored ? -canvas.width : 0, 0, canvas.width, canvas.height);

    if (text) {
      // Add text to the canvas
      ctx.font = `${fontSizeInPx}px Nabla`;
      ctx.fillStyle = 'white';
      const textMetrics = ctx.measureText(text);
      const textX = (canvas.width - textMetrics.width) / 2;
      const textY = canvas.height - fontSizeInPx;

      if (isMirrored) ctx.translate(-canvas.width, 0);

      ctx.shadowColor = 'rgba(0, 0, 0, 0.75)'; // Color of the shadow
      ctx.shadowOffsetX = 0; // Horizontal distance of the shadow
      ctx.shadowOffsetY = 0; // Vertical distance of the shadow
      ctx.shadowBlur = 5;

      ctx.fillText(text, textX, textY); // Position the text at (10, 50)
    }

    ctx.restore();

    // Continue the drawing loop
    requestAnimationFrame(draw);
  }

  videoEl.addEventListener('loadeddata', draw);
}
