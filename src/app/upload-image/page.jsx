"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { useState } from "react";
import Link from "next/link";

export default function UploadImagePage() {
  const [images, setImages] = useState([]);

  const title = images.length ? (
    <>
      <p>Upload Complete!</p>
      <p className="mt-2">{images.length} files</p>
    </>
  ) : null;

  const imgList = (
    <>
      {title}
      <ul>
        {images.map((image) => (
          <li key={image.fileUrl} className="mt-2">
            <Link href={image.fileUrl} target="_blank">
              {image.fileUrl}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          setImages(res);
        }}
        onUploadError={(error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />

      {imgList}
    </main>
  );
}
