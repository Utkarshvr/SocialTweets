import { useState } from "react";

const PostContent = ({ body }) => {
  const [isExapnded, setIsExapnded] = useState(false);
  return (
    <div className="flex flex-col px-4 py-2">
      {/* Text */}
      <div
        className={`relative ${
          isExapnded
            ? "whitespace-break-spaces"
            : "max-h-[55px] overflow-hidden"
        } text-sm`}
      >
        {body}
        {!isExapnded && (
          <div
            onClick={() => setIsExapnded(true)}
            className="cursor-pointer absolute right-0 bottom-0 text-sm font-semibold bg-black text-neutral-600"
          >
            ...see more
          </div>
        )}
      </div>
    </div>
  );
};

export default PostContent;
