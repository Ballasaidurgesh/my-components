import "./styles.scss";
import { useEffect, useRef, useState } from "react";
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
import toast from "react-hot-toast";

const fileTypes = [
  {
    extension: "pdf",
    mimeType: "application/pdf",
    icon: ImFilePdf,
    color: "#F51340",
  },
  {
    extension: "jpeg",
    mimeType: "image/jpeg",
    icon: ImFilePicture,
    color: "#3E54AC",
  },
  {
    extension: "jpg",
    mimeType: "image/jpg",
    icon: ImFilePicture,
    color: "#3E54AC",
  },
  {
    extension: "png",
    mimeType: "image/png",
    icon: ImFilePicture,
    color: "#3E54AC",
  },
  {
    extension: "doc",
    mimeType: "application/msword",
    icon: ImFileWord,
    color: "#185ABD",
  },
  {
    extension: "docx",
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    icon: ImFileWord,
    color: "#185ABD",
  },
  {
    extension: "csv",
    mimeType: "text/csv",
    icon: ImFileExcel,
    color: "#107C41",
  },
  {
    extension: "xls",
    mimeType: "application/vnd.ms-excel",
    icon: ImFileExcel,
    color: "#107C41",
  },
  {
    extension: "xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    icon: ImFileExcel,
    color: "#107C41",
  },
  {
    extension: "zip",
    mimeType: "application/x-zip-compressed",
    icon: ImFileZip,
    color: "#FFC224",
  },
  {
    extension: "txt",
    mimeType: "text/plain",
    icon: ImFileText2,
    color: "#758694",
  },
] as const;

type TFileExtensions = (typeof fileTypes)[number]["extension"];

type TFileUploadProps = {
  label?: string;
  description?: string;
  allowFiles?: TFileExtensions[];
  maxSize?: number;
  maxLimit?: number;
  onChange?: (files: File[]) => void;
  onlyImage?: boolean;
  value?: File[];
};

function FileUpload({
  label,
  description,
  allowFiles = [],
  maxSize,
  maxLimit,
  onChange = () => null,
  onlyImage = false,
  value = [],
}: Readonly<TFileUploadProps>) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const dragCounter = useRef(0);

  useEffect(() => {
    onChange(files);
  }, [JSON.stringify(files)]);

  useEffect(() => {
    setFiles(value);
  }, [JSON.stringify(value)]);

  function validateFile(selectedFiles: File[]) {
    toast.dismiss();

    const filesLength = files?.length;
    const totalFiles =
      maxLimit && maxLimit > 0 ? selectedFiles.slice(0, maxLimit - filesLength) : selectedFiles;

    totalFiles?.forEach((file) => {
      if (files.some((item) => item.name === file.name)) {
        return;
      }

      const fileType = fileTypes.find((item) => item.mimeType === file.type)?.extension;

      if (allowFiles.length !== 0 && !allowFiles.includes(fileType as TFileExtensions)) {
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
    e.stopPropagation();
    dragCounter.current = 0;
    setDragActive(false);
    const newFiles = [...e.dataTransfer.files];
    validateFile(newFiles);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function onDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragActive(true);
    }
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragActive(false);
    }
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
    const uploadedFileType = fileTypes.find((item) => item.mimeType === fileType);
    const Icon = uploadedFileType?.icon;
    const color = uploadedFileType?.color;

    return Icon ? <Icon size={25} color={color} /> : <ImFileEmpty size={25} color="#526D82" />;
  }

  return (
    <div className="file-upload input-container">
      {label && <label>{label}</label>}
      <div
        className="file-upload__choose-file-container"
        onDragOver={onDragOver}
        onDragEnter={onDragEnter}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
        style={{ borderColor: isDragActive ? "var(--color-primary)" : "" }}
      >
        {isDragActive ? (
          <h3 className="drag-active"> Drop your files here! </h3>
        ) : (
          <>
            <input
              ref={inputRef}
              type="file"
              hidden
              onChange={handleChange}
              multiple
              accept={allowFiles.join(",")}
            />
            <h3>Drop files here</h3>
            <p>{description}</p>
            <p style={{ fontWeight: 600 }}>OR</p>
            <a onClick={() => inputRef.current?.click()}>Browse files</a>
          </>
        )}
      </div>

      {/* image preview */}
      {onlyImage && (
        <div className="file-upload__image-preview-list">
          {files.map((file, index) => (
            <div key={index} className="file-upload__image-preview-container">
              <img src={URL.createObjectURL(file)} alt={file.name} />
              <RiCloseLargeFill className="cancel-icon" onClick={() => handleDelete(file)} />
            </div>
          ))}
        </div>
      )}

      {/* file preview */}
      {!onlyImage && (
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

              <RiCloseLargeFill
                size={18}
                className="cancel-icon"
                onClick={() => handleDelete(file)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
