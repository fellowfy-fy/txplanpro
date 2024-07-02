import React, { useRef, useState, useCallback, useEffect } from "react";
import { Stage, Layer, Line, Image as KonvaImage } from "react-konva";
import useImage from "../components/useImage";

const ScribbleCanvas = ({ imageUrl, setImageData }) => {
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [image] = useImage(imageUrl);
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [imageProps, setImageProps] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (image) {
      const canvasWidth = window.innerWidth * 0.8;
      const canvasHeight = window.innerHeight * 0.8;
      const imageAspectRatio = image.width / image.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;

      let width, height;
      if (canvasAspectRatio > imageAspectRatio) {
        // Canvas is wider than the image aspect ratio
        height = canvasHeight;
        width = height * imageAspectRatio;
      } else {
        // Canvas is taller than the image aspect ratio
        width = canvasWidth;
        height = width / imageAspectRatio;
      }

      const x = (canvasWidth - width) / 2;
      const y = (canvasHeight - height) / 2;

      setStageSize({ width: canvasWidth, height: canvasHeight });
      setImageProps({ x, y, width, height });
    }
  }, [image]);

  const handleMouseDown = useCallback((e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines((prevLines) => [...prevLines, { points: [pos.x, pos.y] }]);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setLines((prevLines) => {
      const lastLine = prevLines[prevLines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      return [...prevLines.slice(0, -1), lastLine];
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  useEffect(() => {
    if (setImageData && stageRef.current) {
      const uri = stageRef.current.toDataURL();
      setImageData(uri);
    }
  }, [lines, setImageData]);

  return (
    <div className="scribble-container">
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        className="scribble-stage"
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              x={imageProps.x}
              y={imageProps.y}
              width={imageProps.width}
              height={imageProps.height}
            />
          )}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="black"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ScribbleCanvas;
