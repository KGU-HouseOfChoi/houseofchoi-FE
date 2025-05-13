"use client";

import { useEffect, useState } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  ZoomControl,
  Loader,
} from "react-kakao-maps-sdk";
import { X } from "lucide-react";
import BottomPopup from "@/components/common/popup/BottomPopup";
import PopupButtons from "@/components/common/button/PopupButtons";
import type { RecommendedProgramResponse } from "@/types/program";

interface ActivityInfoPopupProps {
  program: RecommendedProgramResponse;
  onClose: () => void;
  onAddClick: () => void;
}

export default function ActivityInfoPopup({
  program,
  onClose,
  onAddClick,
}: ActivityInfoPopupProps) {
  const lat = program.center?.latitude ?? 37.5665;
  const lng = program.center?.longitude ?? 126.978;
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      appkey: process.env.NEXT_PUBLIC_KAKAO_API_KEY!,
      libraries: ["services"],
    });

    loader
      .load()
      .then(() => {
        setIsMapLoaded(true);
      })
      .catch((e) => {
        console.error("카카오맵 로드 실패:", e);
      });
  }, []);

  return (
    <BottomPopup isOpen={true} onClose={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-1"
        aria-label="닫기"
      >
        <X className="w-6 h-6 text-gray-500" />
      </button>

      <div className="w-full h-[200px] rounded-xl overflow-hidden border border-borderColor-default">
        {isMapLoaded ? (
          <KakaoMap
            center={{ lat, lng }}
            level={3}
            style={{ width: "100%", height: "100%" }}
          >
            <MapMarker position={{ lat, lng }} />
            <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
          </KakaoMap>
        ) : (
          <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">
            지도를 불러오는 중...
          </div>
        )}
      </div>

      <div className="mt-5 space-y-2 text-base text-textColor-body font-pretendard">
        <h2 className="text-xl font-semibold text-textColor-heading">
          {program.name}
        </h2>
        <p className="text-sm text-textColor-sub">{program.center?.name}</p>
        <p>{program.center?.address ?? "주소 정보 없음"}</p>
        <p>전화번호: {program.center?.tel ?? "전화번호 없음"}</p>
        <p>요금: {program.price.toLocaleString()}원 (3개월)</p>
      </div>

      <div className="mt-6">
        <PopupButtons
          onConfirm={onAddClick}
          onCancel={onClose}
          confirmLabel="일정 추가하기"
          cancelLabel="닫기"
        />
      </div>
    </BottomPopup>
  );
}
