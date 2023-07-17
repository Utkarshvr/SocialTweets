import Image from "next/image";
const dummyAvatar = "/user-avatar.png";
export default function UserAvatar({ src, extraStyle, size }) {
  return (
    <Image
      className={`flex-shrink-0 border-2 border-white rounded-full cursor-pointer ${extraStyle}`}
      src={src || dummyAvatar}
      width={size || 36}
      height={size || 36}
      alt="User"
    />
  );
}
