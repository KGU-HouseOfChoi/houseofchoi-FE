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
import type { UnifiedProgram } from "@/types/program";
import { formatProgramSchedule } from "@/utils/program/formatProgramSchedule";

interface ActivityInfoPopupProps {
  program: UnifiedProgram;
  onClose: () => void;
  onAddClick: () => void;
}

export default function ActivityInfoPopup({
  program,
  onClose,
  onAddClick,
}: ActivityInfoPopupProps) {
  const lat = program.center.latitude;
  const lng = program.center.longitude;

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    const kakaoApiKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;

    if (!kakaoApiKey) {
      setMapError("지도를 불러올 수 없습니다!");
      return;
    }

    const loader = new Loader({
      appkey: kakaoApiKey,
      libraries: ["services"],
    });

    loader
      .load()
      .then(() => setIsMapLoaded(true))
      .catch(() => {
        setMapError(
          "지도를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.",
        );
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleMapClick = () => {
    window.open(
      `https://map.kakao.com/link/map/${program.center.name},${lat},${lng}`,
      "_blank",
    );
  };

  return (
    <BottomPopup isOpen={true} onClose={onClose}>
      <div className="relative mt-12 bg-white flex flex-col max-h-[85vh] overflow-visible">
        <button
          onClick={onClose}
          className="absolute right-4 -top-6 z-50 p-1"
          aria-label="닫기"
        >
          <X className="w-6 h-6 text-textColor-sub" />
        </button>
        <div className="px-4 pt-4 flex flex-col flex-1 overflow-y-auto">
          <div
            className="w-full h-[200px] rounded-xl overflow-hidden border border-borderColor-default flex-shrink-0 cursor-pointer"
            onClick={handleMapClick}
          >
            {mapError ? (
              <div className="flex items-center justify-center w-full h-full text-base text-red-400">
                {mapError}
              </div>
            ) : isMapLoaded ? (
              <KakaoMap
                center={{ lat, lng }}
                level={3}
                style={{ width: "100%", height: "100%" }}
              >
                <MapMarker position={{ lat, lng }} />
                <ZoomControl position={kakao.maps.ControlPosition.RIGHT} />
              </KakaoMap>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-base text-gray-400">
                지도를 불러오는 중...
              </div>
            )}
          </div>

          <div className="flex-1 flex items-center mt-6">
            <div className="w-full px-2 space-y-4 text-base text-textColor-body font-pretendard">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-textColor-heading">
                  {program.name}
                </h2>
                <p className="text-xl text-textColor-sub">
                  {program.center.name}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-base">{program.center.address}</p>
                <p className="text-base">전화번호: {program.center.tel}</p>
                <p className="text-base">
                  이용 시간: {formatProgramSchedule(program)}
                </p>
                <p className="text-base">
                  요금:{" "}
                  {program.price !== undefined
                    ? `${program.price.toLocaleString()}원(3개월)`
                    : "가격 정보 없음"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 px-4 pb-4 flex-shrink-0 flex flex-col gap-3 w-full max-w-md mx-auto">
          <PopupButtons
            onConfirm={onAddClick}
            onCancel={onClose}
            confirmLabel="일정 추가하기"
            cancelLabel="닫기"
          />
        </div>
      </div>
    </BottomPopup>
  );
}
