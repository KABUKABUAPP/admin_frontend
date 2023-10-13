import React, { FC } from "react";
import Image from "next/image";
import c from "classnames";
import s from "./styles.module.css";
import { useEnlargedImageContext } from "@/contexts/EnlargeImageContext";

interface Props {
  size?: "sm" | "md" | "lg";
  imageUrl?: string;
  fallBack: string;
  shape?: "round" | "square";
  allowEnlarge?: boolean;
}

const Avatar: FC<Props> = ({
  size = "md",
  imageUrl,
  fallBack,
  shape = "round",
  allowEnlarge=true
}) => {
  const rootClassName = c(s.root, {
    [s.sm]: size === "sm",
    [s.md]: size === "md",
    [s.lg]: size === "lg",
    [s.round]: shape === "round",
    [s.square]: shape === "square",
  });
  const { setImageUrl } = useEnlargedImageContext();

  return (
    <div
      className={rootClassName}
      onClick={() => {
        if (imageUrl && allowEnlarge) setImageUrl(imageUrl);
      }}
    >
      {imageUrl ? (
        <Image
          layout="fill"
          style={{
            objectFit: "cover",
            objectPosition: "50% 50%",
            cursor: "pointer",
          }}
          src={imageUrl}
        />
      ) : (
        <p className={`font-bold ${size === "lg" ? "text-4xl" : "text-lg"}`}>
          {fallBack.toUpperCase()}
        </p>
      )}
    </div>
  );
};

export default Avatar;
