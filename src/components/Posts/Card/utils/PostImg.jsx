import Image from "next/image";
import Link from "next/link";

const PostImg = ({ postImage }) => {
  return (
    <div className="image">
      <Link target="_blank" href={postImage}>
        <Image
          className="w-full max-h-[500px] object-contain"
          src={postImage}
          width={300}
          height={300}
          // style={{ width: "100%", height: "100%" }}
          priority
          alt="Post"
        />
        {/* <img
            className="w-full max-h-[500px] object-contain"
            src={post?.image}
            fetchPriority="high"
            alt="User"
          /> */}
      </Link>
    </div>
  );
};
export default PostImg;
