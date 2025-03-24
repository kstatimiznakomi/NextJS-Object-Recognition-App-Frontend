import { DetectedImage } from "@/components/detectedImage/DetectedImage";
import { ImageFromInput } from "@/components/ImageFromInput/ImageFromInput";
import { OptionProps } from "@/components/Option";
import { Select } from "@/components/Select";
import { SpanError } from "@/components/SpanError/SpanError";
import { WhatToDetect } from "@/constants/common-objects";
import { IMAGES_COUNT } from "@/constants/constants";
import { uploadImage } from "@/utils/upload";
import React, { useRef, useState } from "react";
import { renderToString } from "react-dom/server";

export const FilesLoaderC: React.FC = () => {
  const inputImagesRef = useRef(null);
  const detectedImagesDiv = useRef(null);
  const [isLoadingImgs, setIsLoadingImgs] = useState(false);
  const [isDjangoErr, setIsDjangoErr] = useState(false);
  const [isImageDetected, setIsImageDetected] = useState(false);
  const renderImageRef = useRef(null);
  // @ts-ignore
  const [images, pushNewImages] = useState<FileList | null[]>([]);
  const [imageComponents, setImageComponents] = useState([]);
  const temporalArr: FileList | null[] = [];
  const modes: OptionProps[] | undefined = [];

  const insertImgIntoDiv = (file: string, imageIndex: number) => {
    renderImageRef.current.innerHTML += renderToString(
      <ImageFromInput image={file} imageIndex={imageIndex} images={images} />
    );
  };

  const placeDetectedImage = async (image: FileList) => {
    setIsImageDetected(true);
    [...image].forEach(async (item) => {
      var linkToImage = await uploadImage(item).then((res) => {
        return res;
      });

      if (linkToImage.status === 500) {
        setIsDjangoErr(true);
        return;
      }

      detectedImagesDiv.current.innerHTML += renderToString(
        <DetectedImage src={linkToImage} />
      );
    });
  };

  const fixObject = (detectObject: string) => {
    localStorage.setItem("detectObject", detectObject);
  };

  Object.values(WhatToDetect).map((item) => {
    modes.push({
      value: item,
      label: item,
    });
  });

  const getImagesFromInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      var isItemExist = false;

      const filesArray: FileList = [...e.target.files].slice(0, 20);

      if (localStorage.getItem("maxFiles")) return;

      if (images.length >= IMAGES_COUNT) {
        localStorage.setItem("maxFiles", "true");
        return;
      }

      [...filesArray].forEach((item: File | null) => {
        [...images].forEach((Item) => {
          if (item?.name === Item.name) isItemExist = true;
        });
        !isItemExist && temporalArr.push(item);
        isItemExist = false;
      });

      for (
        let i = 0;
        i < temporalArr.slice(0, IMAGES_COUNT - images.length).length;
        i++
      ) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setImageComponents(
            ...imageComponents,
            <ImageFromInput image={e.target?.result} imageIndex={i} />
          );
          // insertImgIntoDiv(e.target.result, i);
          i === temporalArr.length - 1 && setIsLoadingImgs(false);
        };
        reader.readAsDataURL(temporalArr[i]);
      }
      pushNewImages(
        ...images,
        temporalArr.slice(0, IMAGES_COUNT - images.length)
      );
      [...images].slice(0, IMAGES_COUNT);
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <>
      <div className={"loader__bg flex content-center justify-center"}>
        <div
          className={
            "loader__files flex m-3 mb-3 flex-col justify-center content-center"
          }
        >
          <div
            className={"loader__title mb-3 flex content-center justify-center"}
          >
            <span className={"white select-none no-text-wrap"}>
              Загрузка изображений
            </span>
          </div>
          <div className={"flex flex-col w-full justify-center items-center"}>
            <label
              className={
                images.length >= 20 || isLoadingImgs
                  ? "cursor-locked white flex file__input w-full justify-center flex-col items-center"
                  : "cursor-pointer white flex file__input w-full justify-center flex-col items-center"
              }
              htmlFor={"file_input"}
            >
              <span className={"whitespace-nowrap select-none"}>
                Загрузите сюда изображения
              </span>
            </label>
            {images.length && (
              <>
                <span className={"white mt-1 select-none"}>
                  Выберите желаемый вариант распознавания
                </span>
                <Select
                  disabled={true}
                  onChange={(e) => fixObject(e.target.value)}
                  className={
                    "min-w-550 rounded-2xl p-2.5 outline-0 mb-2 w-full"
                  }
                  name={"modes"}
                  id={"modes"}
                  options={modes}
                />
              </>
            )}
            {images.length >= 20 ? (
              <>
                <div className={"flex mt-1 mb-1 content-between w-full"}>
                  <span className={"white imgs__count select-none"}>
                    Количество изображений было сокращено до {images.length}
                  </span>
                  <span className={"white imgs__count select-none"}>
                    Загружено изображений: {images.length}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={"flex mt-1 mb-1 content-end w-full"}>
                  <span className={"white imgs__count select-none"}>
                    Загружено изображений:&nbsp;
                    {images.length >= 20 ? IMAGES_COUNT : images.length}
                  </span>
                </div>
              </>
            )}
            <input
              max={20}
              disabled={images.length >= 20 || isLoadingImgs}
              accept={"image/png, image/gif, image/jpeg"}
              onChange={getImagesFromInput}
              ref={inputImagesRef}
              id={"file_input"}
              name={"file_input[]"}
              className={"hidden"}
              type="file"
              multiple={true}
            />
            {images.length && (
              <>
                {console.log(imageComponents)}
                <div
                  ref={renderImageRef}
                  className="relative w-full flex-wrap gap-2 flex justify-center items-center"
                >
                  {imageComponents}
                </div>
                <button
                  onClick={() => placeDetectedImage(images)}
                  className={`${
                    isImageDetected ? "passive " : ""
                  }loader__btn select-none`}
                  disabled={isImageDetected}
                >
                  Распознать объекты на изображени
                  {images.length > 1 ? "ях" : "и"}
                </button>
              </>
            )}
            {isDjangoErr && (
              <div>
                <SpanError error={"Сервис временно недоступен"} />
              </div>
            )}
            {isImageDetected && !isDjangoErr && (
              <>
                <div>
                  <span className="text-white">
                    Изображения с распознанными объектами
                  </span>
                </div>
                <div
                  ref={detectedImagesDiv}
                  className="relative w-full flex-wrap gap-2 flex justify-center items-center"
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
