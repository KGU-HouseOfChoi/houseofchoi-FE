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
    <div className="w-full max-w-[329px] h-[350px] bg-bgColor-default rounded-2xl shadow-header overflow-hidden mx-auto text-center">
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
        <h3 className="text-2xl font-semibold text-textColor-heading">
          {title}
        </h3>
        <p className="text-base text-textColor-body">{location}</p>
      </div>

      <div className="mt-4 px-[23px] flex justify-between gap-2">
        <CardButton
          text="일정추가"
          width="flex-1"
          height="h-[65px]"
          onClick={onAddClick}
        />
        <CardButton
          text="더보기"
          width="flex-1"
          height="h-[65px]"
          onClick={onMoreClick}
        />
      </div>
    </div>
  );
}
