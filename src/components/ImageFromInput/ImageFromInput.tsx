import { CircleX } from "lucide-react";
import { useState } from "react";
import { FullImage } from "../fullImage/FullImage";

interface ImageFromInput {
  image: string;
  images?: FileList | null[];
  imageIndex: number;
}

export const ImageFromInput: React.FC<ImageFromInput> = ({
  image,
  imageIndex,
}) => {
  const [visible, setIsVisible] = useState(false);
  return (
    <>
      {visible && <FullImage src={image} />}
      <div className="relative p-2">
        <CircleX
          onClick={() => console.log(imageIndex)}
          className="bg-gray-100 rounded-full hover:bg-white absolute z-10 top-0 right-0 cursor-pointer rounded-full"
        />
        <img
          className={"z-1 load__img gap-2 cursor-pointer"}
          title="Открыть полностью"
          src={image}
          alt="изображение"
        />
      </div>
    </>
  );
};
