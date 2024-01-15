import { fabric } from "fabric";

function drawGuide(canvas, rect, side, axis) {
  let newLine;
  const lineOptions = {
    left: 0,
    top: 0,
    stroke: "rgb(178, 207, 255)",
    selectable: false,
    opacity: 0,
  };
  switch (side) {
    case "top":
      newLine = new fabric.Line(
        [0, 0, canvas.width, 0],
        Object.assign(lineOptions, {
          left: 0,
          top: axis,
        }),
      );
      break;
    case "bottom":
      newLine = new fabric.Line(
        [0, 0, canvas.width, 0],
        Object.assign(lineOptions, {
          left: 0,
          top: axis,
        }),
      );
      break;

    case "centerY":
      newLine = new fabric.Line(
        [0, 0, canvas.width, 0],
        Object.assign(lineOptions, {
          left: 0,
          top: axis,
        }),
      );
      break;

    case "left":
      newLine = new fabric.Line(
        [0, canvas.height, 0, 0],
        Object.assign(lineOptions, {
          left: axis,
          top: 0,
        }),
      );
      break;
    case "right":
      newLine = new fabric.Line(
        [0, canvas.height, 0, 0],
        Object.assign(lineOptions, {
          left: axis,
          top: 0,
        }),
      );
      break;
    case "centerX":
      newLine = new fabric.Line(
        [0, canvas.height, 0, 0],
        Object.assign(lineOptions, {
          left: axis,
          top: 0,
        }),
      );
      break;
  }

  if (rect.guides[side] instanceof fabric.Line) {
    canvas.remove(rect.guides[side]);
    delete rect.guides[side];
  }
  rect.guides[side] = newLine;
  canvas.add(newLine).renderAll();
}

export function drawRectGuides(canvas, rect) {
  const width = rect.getScaledWidth();
  const height = rect.getScaledHeight();
  drawGuide(canvas, rect, "top", rect.top);
  drawGuide(canvas, rect, "left", rect.left);
  drawGuide(canvas, rect, "centerX", rect.left + width / 2);
  drawGuide(canvas, rect, "centerY", rect.top + height / 2);
  drawGuide(canvas, rect, "right", rect.left + width);
  drawGuide(canvas, rect, "bottom", rect.top + height);
  rect.setCoords();
}
