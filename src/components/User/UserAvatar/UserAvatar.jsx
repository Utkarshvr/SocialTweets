import Image from "next/image";
const dummyAvatar = "/user-avatar.png";

const createMinSize = (size) =>
  `min-w-[${size ?? "36px"}] min-h-[${size ?? "36px"}]`;

export default function UserAvatar({ src, extraStyle, size }) {
  return (
    <Image
      className={`flex-shrink-0 ${createMinSize(
        size
      )} border-2 border-neutral-600 rounded-full cursor-pointer ${extraStyle}`}
      src={src || dummyAvatar}
      width={size || 36}
      height={size || 36}
      alt="User"
    />
  );
}
