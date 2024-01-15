import { fabric } from "fabric";

export const DEFAULT_RECTS = [
  new fabric.SnapOnRect({
    width: 100,
    height: 100,
    fill: "black",
    top: 200,
    left: 400,
  }),
  new fabric.SnapOnRect({
    width: 100,
    height: 100,
    fill: "green",
    top: 400,
    left: 200,
  }),
  new fabric.SnapOnRect({
    width: 150,
    height: 150,
    fill: "yellow",
    top: 100,
    left: 100,
  }),
];
