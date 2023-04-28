import React, { FC } from "react";
import Image from "next/image";
import c from "classnames";
import s from "./styles.module.css";

interface Props {
  size?: "sm" | "md" | "lg";
  imageUrl?: string;
  fallBack: string;
}

const Avatar: FC<Props> = ({ size = "md", imageUrl, fallBack }) => {
  const rootClassName = c(s.root, {
    [s.sm]: size === "sm",
    [s.md]: size === "md",
    [s.lg]: size === "lg",
  });

  return (
    <div className={rootClassName}>
      {imageUrl ? (
        <Image
          layout="fill"
          style={{ objectFit: "cover", objectPosition: "50% 50%" }}
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
