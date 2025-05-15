import { UnifiedProgram, RawAiProgram, RawFlatProgram } from "@/types/program";

function isFlatProgram(item: unknown): item is RawFlatProgram {
  return (
    typeof item === "object" &&
    item !== null &&
    "centerId" in item &&
    "latitude" in item
  );
}

function isAiProgram(item: unknown): item is RawAiProgram {
  return (
    typeof item === "object" &&
    item !== null &&
    "center" in item &&
    "start_time" in item
  );
}

export function normalizeToUnifiedProgram(
  item: RawFlatProgram | RawAiProgram,
): UnifiedProgram {
  const tags: string[] = isAiProgram(item)
    ? item.tags.map((t) => t.name)
    : ((item.tags as string[]) ?? []);

  const imageUrl =
    (item as RawFlatProgram).imageUrl ?? (item as RawAiProgram).image_url ?? "";

  const center = isFlatProgram(item)
    ? {
        id: item.centerId,
        name: item.centerName,
        address: item.address ?? "주소 정보 없음",
        tel: item.tel ?? "전화번호 없음",
        latitude: item.latitude ?? 37.5665,
        longitude: item.longitude ?? 126.978,
      }
    : {
        id: item.center?.id ?? 0,
        name: item.center?.name ?? "장소 정보 없음",
        address: item.center?.address ?? "주소 정보 없음",
        tel: item.center?.tel ?? "전화번호 없음",
        latitude: item.center?.latitude ?? 37.5665,
        longitude: item.center?.longitude ?? 126.978,
      };

  return {
    id: item.id,
    name: item.name,
    firDay: isFlatProgram(item) ? item.firDay : item.fir_day,
    secDay: isFlatProgram(item) ? item.secDay : item.sec_day,
    thrDay: isFlatProgram(item) ? item.thrDay : item.thr_day,
    fouDay: isFlatProgram(item) ? item.fouDay : item.fou_day,
    fivDay: isFlatProgram(item) ? item.fivDay : item.fiv_day,
    startTime: resolveTime(
      isFlatProgram(item) ? item.startTime : item.start_time,
    ),
    endTime: resolveTime(isFlatProgram(item) ? item.endTime : item.end_time),
    price: item.price,
    mainCategory: isFlatProgram(item) ? item.mainCategory : item.main_category,
    subCategory: isFlatProgram(item) ? item.subCategory : item.sub_category,
    headcount: item.headcount,
    tags,
    imageUrl,
    center,
  };
}

function resolveTime(value: unknown): string {
  if (!value) return "00:00:00";

  if (typeof value === "string") {
    const parts = value.split(":");
    if (parts.length >= 2) {
      const h = parts[0].padStart(2, "0");
      const m = parts[1].padStart(2, "0");
      const s = (parts[2] ?? "00").padStart(2, "0");
      return `${h}:${m}:${s}`;
    }
    return "00:00:00";
  }

  if (typeof value === "object" && value !== null) {
    const t = value as { hour: number; minute: number; second?: number };
    return `${pad(t.hour)}:${pad(t.minute)}:${pad(t.second ?? 0)}`;
  }

  return "00:00:00";
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
