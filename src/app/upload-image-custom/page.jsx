"use client";
import { useUploadThing } from "@/utils/generateReactHelpers";
import { useCallback, useState } from "react";
// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "react-dropzone";

export default function MultiUploader() {
  const [files, setFiles] = useState([]);
  console.log({ files });
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (file) => {
      console.log({ file });
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        Drop files here!
      </div>
      <div>
        {files.length > 0 && (
          <button
            disabled={isUploading}
            className="p-2 bg-sky-800 disabled:bg-opacity-30"
            onClick={() => startUpload(files)}
          >
            Upload {files.length} files
          </button>
        )}
      </div>
    </>
  );
}
