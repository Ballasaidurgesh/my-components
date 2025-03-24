import { useEffect, useRef, useState } from "react";
import "./styles.scss";
import { PiCloudArrowUp } from "react-icons/pi";
import { RiCloseLargeFill } from "react-icons/ri";
import {
  ImFileExcel,
  ImFilePicture,
  ImFilePdf,
  ImFileWord,
  ImFileEmpty,
  ImFileZip,
  ImFileText2,
} from "react-icons/im";
import { IconType } from "react-icons";
import toast from "react-hot-toast";

type fileExtensions =
  | ".png"
  | ".jpeg"
  | ".jpg"
  | ".pdf"
  | ".doc"
  | ".docx"
  | ".csv"
  | ".xls"
  | ".xlsx"
  | ".txt"
  | ".zip";

type fileUploadProps = {
  description?: string;
  allowFiles?: fileExtensions[];
  maxSize?: number;
  maxLimit?: number;
  onChange?: (files: File[]) => void;
};

function FileUpload({
  description,
  allowFiles = [],
  maxSize,
  maxLimit,
  onChange = () => null,
}: fileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    onChange(files);
  }, [JSON.stringify(files)]);

  function validateFile(selectedFiles: File[]) {
    const filesLength = files?.length;
    const totalFiles =
      maxLimit && maxLimit > 0 ? selectedFiles.slice(0, maxLimit - filesLength) : selectedFiles;

    totalFiles?.forEach((file) => {
      const fileType = fileTypes.find((item) => item.mimeType === file.type)?.extension;

      if (allowFiles.length !== 0 && !allowFiles.includes(fileType as fileExtensions)) {
        toast.error("Invalid file type!");
      } else if (maxSize && file.size > maxSize * 1000000) {
        toast.error(`File size must be less than ${maxSize}MB!`);
      } else {
        setFiles((prevData) => [...prevData, file]);
      }
    });
  }

  function handleDelete(file: File) {
    const updatedList = files.filter((item) => item !== file);
    setFiles(updatedList);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newFiles = e.target.files !== null ? [...e.target.files] : [];
    validateFile(newFiles);
    e.target.value = "";
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const newFiles = [...e.dataTransfer.files];
    validateFile(newFiles);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  }

  function formatSize(size: number) {
    if (size > Math.pow(1024, 3)) {
      return (size / Math.pow(1024, 3)).toFixed(2) + "GB";
    } else if (size > Math.pow(1024, 2)) {
      return (size / Math.pow(1024, 2)).toFixed(2) + "MB";
    } else {
      return (size / 1024).toFixed(0) + "KB";
    }
  }

  function renderFileIcon(fileType: string) {
    const fileExtension = fileTypes.find((item) => item.mimeType === fileType)?.extension;
    let Icon: IconType;
    let color: string;

    switch (fileExtension) {
      case ".png":
      case ".jpeg":
        Icon = ImFilePicture;
        color = "#3E54AC";
        break;
      case ".pdf":
        Icon = ImFilePdf;
        color = "#F51340";
        break;
      case ".doc":
      case ".docx":
        Icon = ImFileWord;
        color = "#185ABD";
        break;
      case ".csv":
      case ".xlsx":
      case ".xls":
        Icon = ImFileExcel;
        color = "#107C41";
        break;
      case ".zip":
        Icon = ImFileZip;
        color = "#FFC224";
        break;
      case ".txt":
        Icon = ImFileText2;
        color = "#758694";
        break;
      default:
        Icon = ImFileEmpty;
        color = "#526D82";
    }

    return <Icon size={25} color={color} />;
  }

  return (
    <div className="file-upload">
      <div
        className="file-upload__choose-file-container"
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        style={{ borderColor: isDragActive ? "var(--color-primary)" : "" }}
      >
        {isDragActive ? (
          <h3 className="drag-active"> Drop your files here! </h3>
        ) : (
          <>
            <div>
              <PiCloudArrowUp color="#243a6e" size={30} />
            </div>
            <div>
              <input
                ref={inputRef}
                type="file"
                hidden
                onChange={handleChange}
                multiple
                accept={allowFiles.join(",")}
              />
              <h3>
                <a onClick={() => inputRef.current?.click()}>Choose file</a> or drag & drop it here.
              </h3>
              <p>{description}</p>
            </div>
          </>
        )}
      </div>

      {/* file preview */}
      <div className="file-upload__preview-list">
        {files.map((file, index) => (
          <div key={index} className="file-upload__preview-container">
            <div className="left-section">
              {renderFileIcon(file.type)}
              <div style={{ width: "90%" }}>
                <h3>{file.name}</h3>
                <p>{formatSize(file.size)}</p>
              </div>
            </div>
            <RiCloseLargeFill size={18} className="close-icon" onClick={() => handleDelete(file)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;

const fileTypes = [
  {
    extension: ".pdf",
    mimeType: "application/pdf",
  },
  {
    extension: ".jpeg",
    mimeType: "image/jpeg",
  },
  {
    extension: ".jpg",
    mimeType: "image/jpg",
  },
  {
    extension: ".png",
    mimeType: "image/png",
  },
  {
    extension: ".doc",
    mimeType: "application/msword",
  },
  {
    extension: ".docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    extension: ".csv",
    mimeType: "text/csv",
  },
  {
    extension: ".xls",
    mimeType: "application/vnd.ms-excel",
  },
  {
    extension: ".xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    extension: ".zip",
    mimeType: "application/x-zip-compressed",
  },
  {
    extension: ".txt",
    mimeType: "text/plain",
  },
];
