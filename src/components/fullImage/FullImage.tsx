interface DetectedImage {
  src: string;
}

export const FullImage: React.FC<DetectedImage> = ({ src }) => {
  return <div className={"absolute z-20 w-full h-full"} style={{ backgroundImage: src }} />;
};
