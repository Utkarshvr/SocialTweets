"use client";

import { iconCss } from "@/utils/css/cssClasses";
import Backdrop from "../Layouts/Backdrop/Backdrop";
import { MdClose } from "react-icons/md";
import CreatePostModal from "./CreatePostModal";
import {
  useModalAPI,
  useModalData,
} from "@/context/ModalProvider/PostModalProvider";
import UsersList from "../List/UsersList/UsersList";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CoreModal() {
  // Context
  const { openModal, modalType, information } = useModalData();
  const { onClose } = useModalAPI();

  // Close the modal every time route changes
  const path = usePathname();
  useEffect(() => {
    if (path) onClose();
  }, [path]);

  console.log({ information });

  if (openModal) {
    let modal;
    let type;
    switch (modalType) {
      case "CREATE_POST":
        type = "Create Post";
        modal = <CreatePostModal />;
        break;
      case "FOLLOWERS_LIST":
        type = "Followers";
        modal = <UsersList users={information} />;
        break;
      case "FOLLOWING_LIST":
        type = "Following";
        modal = <UsersList users={information} />;
        break;
      default:
        break;
    }
    return (
      <Backdrop>
        <div className="flex w-[80%] max-w-lg flex-col rounded-md bg-neutral-900">
          <div className="p-3 flex items-center justify-between border-b-2 border-neutral-700">
            <p className="w-full font-semibold">{type}</p>
            <div onClick={() => onClose()} className={iconCss}>
              <MdClose size={20} />
            </div>
          </div>
          <div className="p-3 w-full max-h-[600px] overflow-scroll">
            {modal}
          </div>
        </div>
      </Backdrop>
    );
  }
}
