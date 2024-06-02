import ImageUploader from "../components/common/ImageUploader";
import { ImagePickerConf } from "react-image-picker-editor";

interface AddItemLayoutProps {
  coverImageSrc: string;
  setCoverImageSrc: (src: string) => void;
  imageSrc: string;
  setImageSrc: (src: string) => void;
  children?: React.ReactNode;
}

export default function AddItemLayout({
  coverImageSrc,
  setCoverImageSrc,
  imageSrc,
  setImageSrc,
  children,
}: AddItemLayoutProps) {
  const imageConfig: ImagePickerConf = {
    language: "en",
    width: "100px",
    height: "100px",
    objectFit: "revert",
    aspectRatio: 4,
    compressInitial: null,
  };

  return (
    <div className="h-full">
      <div className="flex sm:flex-row flex-col h-full items-center justify-between gap-6">
        <div className="sm:w-1/2 w-full h-full">
          <ImageUploader
            id="coverImage"
            imageSrc={coverImageSrc}
            setImageSrc={setCoverImageSrc}
            config={imageConfig}
            containerClassName="w-full h-full"
          />
        </div>
        <div className="flex flex-col sm:w-1/2 p-32 justify-center gap-6">
          <ImageUploader
            id="image"
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
            config={imageConfig}
            width="100px"
            height="100px"
            containerClassName="w-24 h-24 m-auto rounded-lg"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
