import Image from "next/image";

export default function UserAvatar({ session, src, size }) {
  return (
    <Image
      className="border-2 border-white rounded-full cursor-pointer"
      src={src}
      width={size || 36}
      height={size || 36}
      alt="User"
    />
  );
}
