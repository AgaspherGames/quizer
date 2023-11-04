import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface CreateImageProps {
  image: File;
  height?: string;
  clear: Function;
}

const CreateImage: React.FC<CreateImageProps> = ({
  image,
  height = "8rem",
  clear,
}) => {
  const url = useMemo(() => {
    console.log(image);
    
    return URL.createObjectURL(image);
  }, [image]);
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height }}
      className=" w-full flex justify-center my-2"
    >
      <div className="relative">
        <img style={{ height }} src={url} />
        <button
          onClick={() => {
            clear();
          }}
          type="button"
        >
          <div className="absolute top-1 right-1 bg-black bg-opacity-40 rounded-lg p-0.5 h-min">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default CreateImage;
