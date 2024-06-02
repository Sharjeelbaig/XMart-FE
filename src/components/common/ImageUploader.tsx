import ReactImagePickerEditor, {
  ImagePickerConf,
} from "react-image-picker-editor";

interface ImageUploaderProps {
  imageSrc: string;
  setImageSrc: (src: string) => void;
  config?: ImagePickerConf;
  width?: string;
  height?: string;
  containerClassName?: string;
  id: string;
}

const defaultConfig: ImagePickerConf = {
  language: "en",
  width: "100px",
  height: "100px",
  objectFit: "revert",
  aspectRatio: 4,
  compressInitial: null,
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  imageSrc,
  setImageSrc,
  config = defaultConfig,
  width,
  height,
  containerClassName = "",
  id,
}) => {
  return (
    <div
      id={id}
      className={`flex bg-[gray] w-full h-full justify-center relative items-center ${containerClassName} cursor-pointer`}
      onClick={() => {
        const parentEl = document.getElementById(id) as HTMLElement;
        const el = parentEl.querySelector(
          'button[title="Upload a image"] > span.material-icons'
        ) as HTMLElement;
        el.click();
      }}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width,
        height,
      }}
    >
      <i className="fa fa-camera text-white text-2xl "></i>
      <div className="absolute -z-10 overflow-hidden" style={{ width, height }}>
        <ReactImagePickerEditor
          config={config}
          imageSrcProp={imageSrc}
          imageChanged={(newDataUri: any) => {
            setImageSrc(newDataUri);
          }}
        />
      </div>
    </div>
  );
};

export default ImageUploader;
