import { useEffect, useRef, useState } from "react";

const Content = ({ body }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHeightAboveMax, setIsHeightAboveMax] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    // Check if the content height exceeds 55px to determine if the "Read more" button should be shown initially
    if (contentRef?.current?.scrollHeight > 55) setIsHeightAboveMax(true);
    else setIsHeightAboveMax(false);
  }, [contentRef, body]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 py-2 pl-2">
      {/* Text */}
      <div
        ref={contentRef}
        className={`${
          isExpanded
            ? "whitespace-break-spaces"
            : "max-h-[55px] overflow-hidden"
        } text-sm`}
      >
        {body}
      </div>
      {/* Read more button (conditionally rendered) */}
      {isHeightAboveMax && (
        <div className="w-full flex justify-end px-2">
          <button
            onClick={toggleExpand}
            className="py-0.5 px-1 border-2 border-neutral-500 w-max text-xs font-semibold bg-black text-neutral-500"
          >
            {isExpanded ? "Show less" : "Read more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Content;
