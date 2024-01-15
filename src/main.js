import { fabric } from "fabric";
import "./fabricUtils";
import { DEFAULT_RECTS } from "./mocks";
import "./shared/styles.css";

function init() {
  const canvas = new fabric.Canvas("canvas", {
    width: window.innerWidth,
    height: window.innerHeight,
  });
  DEFAULT_RECTS.forEach((rect) => {
    canvas.add(rect);
    rect.bindEvents();
  });
  canvas.renderAll();
}

init();
