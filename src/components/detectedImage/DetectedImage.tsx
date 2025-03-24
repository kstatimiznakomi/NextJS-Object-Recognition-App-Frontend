import { useState } from "react";
import { FullImage } from "../fullImage/FullImage";

interface DetectedImage {
  src: string;
}

export const DetectedImage: React.FC<DetectedImage> = ({ src }) => {
  const [visible, setIsVisible] = useState(false);

  return (
    <>
      {visible && <FullImage src={src} />}
      <div className="relative p-2">
        <div>
          <img
            onClick={() => setIsVisible(true)}
            className={"z-1 load__img gap-2 cursor-pointer"}
            title="Открыть полностью"
            src={src}
            alt="изображение"
          />
        </div>
      </div>
    </>
  );
};
