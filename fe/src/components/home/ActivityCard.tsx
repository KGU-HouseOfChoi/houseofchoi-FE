"use client";

import Image from "next/image";
import CardButton from "@/components/home/CardButton";

type ActivityCardProps = {
  imageUrl: string;
  title: string;
  location: string;
  onAddClick: () => void;
  onMoreClick: () => void;
};

export default function ActivityCard({
  imageUrl,
  title,
  location,
  onAddClick,
  onMoreClick,
}: ActivityCardProps) {
  return (
    <div className="w-full max-w-[329px] h-[350px] bg-bgColor-default rounded-2xl shadow-[0px_3px_10px_rgba(142,_142,_142,_0.3)] overflow-hidden mx-auto text-center">
      <div className="w-[284px] h-40 mt-[15px] mx-auto rounded-xl border border-borderColor-default overflow-hidden">
        <Image
          src={imageUrl}
          alt="활동 이미지"
          width={284}
          height={160}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-xl font-semibold text-textColor-heading">
          {title}
        </h3>
        <p className="text-base text-textColor-body">{location}</p>
      </div>

      <div className="mt-4 px-[23px] flex justify-between">
        <CardButton
          text="일정추가"
          width="w-[130px]"
          height="h-[70px]"
          onClick={onAddClick}
        />
        <CardButton
          text="더보기"
          width="w-[130px]"
          height="h-[70px]"
          onClick={onMoreClick}
        />
      </div>
    </div>
  );
}
