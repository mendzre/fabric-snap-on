import { fabric } from "fabric";
import { drawRectGuides } from "./guides";

fabric.SnapOnRect = fabric.util.createClass(fabric.Rect, {
  type: "snapOnRect",
  initialize(options) {
    this.callSuper("initialize", options);
    this.set("guides", {});
  },
  _render(ctx) {
    this.callSuper("_render", ctx);
  },
  _onObjectAdded(event, canvas) {
    const target = event.target;
    if (!(target instanceof fabric.SnapOnRect)) return;
    drawRectGuides(canvas, target);
  },
  _onObjectMoving(event, canvas) {
    const target = event.target;
    if (!(target instanceof fabric.SnapOnRect)) return;
    drawRectGuides(canvas, target);

    const filteredSnapOnRects = canvas
      .getObjects()
      .filter((rect) => rect.type !== "line" && rect !== target);
    const matches = new Set();

    filteredSnapOnRects.forEach((rect) => {
      for (const side in target.guides) {
        let axis, newPos;

        switch (side) {
          case "right":
            axis = "left";
            newPos = rect.guides[side][axis] - target.getScaledWidth();
            break;
          case "bottom":
            axis = "top";
            newPos = rect.guides[side][axis] - target.getScaledHeight();
            break;
          case "centerX":
            axis = "left";
            newPos = rect.guides[side][axis] - target.getScaledWidth() / 2;
            break;
          case "centerY":
            axis = "top";
            newPos = rect.guides[side][axis] - target.getScaledHeight() / 2;
            break;
          default:
            axis = side;
            newPos = rect.guides[side][axis];
            break;
        }

        if (this._inRange(target.guides[side][axis], rect.guides[side][axis])) {
          matches.add(side);
          this._snapObject(target, axis, newPos);
        }

        if (side === "left") {
          if (
            this._inRange(
              target.guides["left"][axis],
              rect.guides["right"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(target, axis, rect.guides["right"][axis]);
          }
        }

        if (side === "right") {
          if (
            this._inRange(
              target.guides["right"][axis],
              rect.guides["left"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(
              target,
              axis,
              rect.guides["left"][axis] - target.getScaledWidth()
            );
          }
        }

        if (side === "top") {
          if (
            this._inRange(
              target.guides["top"][axis],
              rect.guides["bottom"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(target, axis, rect.guides["bottom"][axis]);
          }
        }
        if (side === "bottom") {
          if (
            this._inRange(
              target.guides["bottom"][axis],
              rect.guides["top"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(
              target,
              axis,
              rect.guides["top"][axis] - target.getScaledHeight()
            );
          }
        }

        if (side === "centerX") {
          if (
            this._inRange(
              target.guides["centerX"][axis],
              rect.guides["left"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(
              target,
              axis,
              rect.guides["left"][axis] - target.getScaledWidth() / 2
            );
          } else if (
            this._inRange(
              target.guides["centerX"][axis],
              rect.guides["right"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(
              target,
              axis,
              rect.guides["right"][axis] - target.getScaledWidth() / 2
            );
          }
        }

        if (side === "centerY") {
          if (
            this._inRange(
              target.guides["centerY"][axis],
              rect.guides["top"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(
              target,
              axis,
              rect.guides["top"][axis] - target.getScaledHeight() / 2
            );
          } else if (
            this._inRange(
              target.guides["centerY"][axis],
              rect.guides["bottom"][axis]
            )
          ) {
            matches.add(side);
            this._snapObject(
              target,
              axis,
              rect.guides["bottom"][axis] - target.getScaledHeight() / 2
            );
          }
        }
      }
    });

    matches.forEach((match) => {
      target.guides[match].set("opacity", 1);
    });
  },
  _onObjectMoved(event, canvas) {
    const target = event.target;
    if (!(target instanceof fabric.SnapOnRect)) return;
    drawRectGuides(canvas, target);
  },
  bindEvents: function () {
    this.canvas.on("object:added", (event) =>
      this._onObjectAdded(event, this.canvas)
    );
    this.canvas.on("object:moving", (event) => {
      this._onObjectMoving(event, this.canvas);
    });
  },
  _inRange(a, b) {
    return Math.abs(a - b) <= 10;
  },
  _snapObject(obj, side, pos) {
    obj.set(side, pos);
    obj.setCoords();
    drawRectGuides(this.canvas, obj);
  },
});
