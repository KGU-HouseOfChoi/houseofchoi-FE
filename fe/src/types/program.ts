export interface RawTimeObj {
  hour: number;
  minute: number;
  second: number;
  nano?: number;
}

export interface RawCenter {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  tel: string;
}

export interface RawFlatProgram {
  id: number;
  name: string;
  firDay: string;
  secDay: string;
  thrDay: string;
  fouDay: string;
  fivDay: string;
  startTime: RawTimeObj;
  endTime: RawTimeObj;
  price: number;
  mainCategory: string;
  subCategory: string;
  headcount: string;
  tags: string[];
  imageUrl?: string;
  image_url?: string;
  centerId: number;
  centerName: string;
  address: string;
  latitude: number;
  longitude: number;
  tel: string;
}

export interface RawAiProgram {
  id: number;
  name: string;
  fir_day: string;
  sec_day: string;
  thr_day: string;
  fou_day: string;
  fiv_day: string;
  start_time: string;
  end_time: string;
  price: number;
  main_category: string;
  sub_category: string;
  headcount: string;
  tags: { name: string }[];
  image_url?: string;
  center: RawCenter;
}

export interface UnifiedProgram {
  id: number;
  name: string;
  firDay: string;
  secDay: string;
  thrDay: string;
  fouDay: string;
  fivDay: string;
  startTime: string;
  endTime: string;
  price: number;
  mainCategory: string;
  subCategory: string;
  headcount: string;
  tags: string[];
  imageUrl: string;
  center: RawCenter;
}
