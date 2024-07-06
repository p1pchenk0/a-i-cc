import type { ApplyTextOptions, VideoStreamOptions } from '@/features/photo/types';
import { FONT_SIZE, FONT_SIZE_SM, THRESHOLD_CANVAS_WIDTH_IN_PX } from '@/features/photo/constants';

async function askForVideoPermission() {
  const constraints = {
    video: true
  };

  return navigator.mediaDevices.getUserMedia(constraints);
}

function getFontSize(width: number): number {
  return width > THRESHOLD_CANVAS_WIDTH_IN_PX ? FONT_SIZE : FONT_SIZE_SM;
}

function applyShadow(ctx: CanvasRenderingContext2D) {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
  ctx.shadowBlur = 5;
}

function drawText({ ctx, width, height, text, isMirrored, font }: ApplyTextOptions) {
  const fontSizeInPx = getFontSize(width);

  ctx.font = `${fontSizeInPx}px ${font}`;
  ctx.fillStyle = 'white';
  const textMetrics = ctx.measureText(text);
  const textX = (width - textMetrics.width) / 2;
  const textY = fontSizeInPx * 1.2;

  if (isMirrored) ctx.translate(-width, 0);

  applyShadow(ctx);

  ctx.fillText(text, textX, textY);
}

export async function streamVideo({
  videoEl,
  canvasEl,
  mirrorFlagGetter,
  textGetter,
  fontGetter
}: VideoStreamOptions) {
  const ctx = canvasEl.getContext('2d')!;

  let stream = await askForVideoPermission();

  videoEl.srcObject = stream;
  videoEl.play();

  let isDrawLoopOn = true;

  function draw() {
    const text = textGetter();
    const isMirrored = mirrorFlagGetter();

    const proportions = videoEl.videoWidth / videoEl.videoHeight;

    const width = (canvasEl.width = videoEl.parentElement?.clientWidth!);
    const height = (canvasEl.height = width / proportions);

    ctx.save();
    ctx.scale(isMirrored ? -1 : 1, 1);
    ctx.drawImage(videoEl, isMirrored ? -width : 0, 0, width, height);

    if (text) drawText({ ctx, width, height, text, isMirrored, font: fontGetter() });

    ctx.restore();

    // Continue the drawing loop
    if (isDrawLoopOn) requestAnimationFrame(draw);
  }

  videoEl.addEventListener('loadeddata', draw);

  return () => {
    videoEl.removeEventListener('loadeddata', draw);

    isDrawLoopOn = false;

    stream.getTracks().forEach((track) => {
      track.stop();
    });
  };
}
