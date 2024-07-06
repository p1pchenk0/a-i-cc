export type VideoStreamOptions = {
  videoEl: HTMLVideoElement;
  canvasEl: HTMLCanvasElement;
  mirrorFlagGetter: () => boolean;
  textGetter: () => string;
  fontGetter: () => string;
};

export type ApplyTextOptions = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  text: string;
  isMirrored: boolean;
  font: string;
};
