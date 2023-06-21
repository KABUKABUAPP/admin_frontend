import Avatar from "@/components/common/Avatar";
import React, { FC } from "react";
import { useRouter } from "next/router";

interface Props {
  fullname: string;
  image: string;
  id: string
}

const Subscriber: FC<Props> = ({fullname, image, id}) => {
  const router = useRouter()
  return (
    <div className="flex items-center gap-2 cursor-pointer" onClick={()=>router.push(`/riders/${id}`)}>
      <Avatar fallBack={fullname} shape="round" imageUrl={image}/>
      <p className="text-sm font-semibold">{fullname}</p>
    </div>
  );
};

export default Subscriber;
