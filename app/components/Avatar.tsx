"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="rounded-full"
      alt="avatar"
      height={30}
      width={30}
      src={src || "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
