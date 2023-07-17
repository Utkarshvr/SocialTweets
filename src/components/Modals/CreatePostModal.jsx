"use client";
import { MdClose, MdImage } from "react-icons/md";
import Backdrop from "../Layouts/Backdrop/Backdrop";
import {
  useModalAPI,
  useModalData,
} from "@/context/ModalProvider/PostModalProvider";
import { useEffect, useRef, useState } from "react";
import { useUploadThing } from "@/utils/generateReactHelpers";
import { useAddPost } from "@/hooks/posts/RQPosts";
import { useSession } from "next-auth/react";
import HelperText from "../UI/HelperText";

const icon =
  "p-3 cursor-pointer rounded-full transition-all w-max hover:bg-white hover:bg-opacity-30";

export default function CreatePostModal() {
  // Context
  const { openModal } = useModalData();
  const { onClose } = useModalAPI();
  const { data: session } = useSession();
  // console.log({ session });
  // States
  const [images, setImages] = useState([]);
  const [body, setBody] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState(null);

  const resetState = () => {
    setImages([]);
    setBody("");
    setImageURL(null);
    setError(null);
  };

  // For File Uploadation
  const fileInputRef = useRef(null);
  const handleFileSelect = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImages([file]);
  };
  // console.log({ userId: session?.user?.id });

  // react-query
  const { mutate: post, isError, isLoading, isSuccess } = useAddPost();
  // console.log({ images });
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (files) => {
      setImageURL(files[0].fileUrl);
      post({ userId: session?.user?.id, body, image: `${files[0].fileUrl}` });
    },
    onUploadError: () => {
      setError("Couldn't upload image. Try Again!");
      // console.log("Couldn't upload image");
    },
  });

  // use effect
  useEffect(() => {
    if (isError)
      setError("An error occured while adding your post. Try again!");

    if (isSuccess) {
      onClose();
      resetState();
    }
  }, [isError, isSuccess]);

  // Submit
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (body.length < 1) return setError("Content can't be empty");
    if (images.length > 0 && !imageURL) {
      startUpload(images);
    } else {
      post({ userId: session?.user?.id, body, image: imageURL });
    }
  };

  if (openModal)
    return (
      <Backdrop>
        <form
          onSubmit={hanldeSubmit}
          className="p-2 flex max-w-lg w-[80%] flex-col rounded-md gap-2 bg-neutral-900"
        >
          <div className="flex justify-end">
            <div
              onClick={() => {
                resetState();
                onClose();
              }}
              className={icon}
            >
              <MdClose size={20} />
            </div>
          </div>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className="bg-neutral-900 p-3 min-h-[180px]"
            placeholder="What do you want to talk about?"
          />
          <HelperText error={error} />

          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <div className="px-2 flex items-center justify-between">
              <div onClick={handleFileSelect} className={icon}>
                <MdImage size={24} />
              </div>
              {images.length < 1 ? (
                <p className="text-sm font-semibold text-neutral-500">
                  No Image selected
                </p>
              ) : (
                images.map((image) => (
                  <p key={image} className="text-sm font-semibold text-sky-600">
                    {image.name}
                  </p>
                ))
              )}
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading || isUploading}
            className={`bg-sky-600 hover:bg-opacity-60 px-2 py-1 font-semibold rounded-md disabled:opacity-30 disabled:cursor-not-allowed w-full`}
          >
            Post
          </button>
        </form>
      </Backdrop>
    );
}
