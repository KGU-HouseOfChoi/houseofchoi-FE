export interface CenterInfo {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  tel: string;
}

export interface Program {
  id: number;
  name: string;
  firDay: string;
  secDay: string;
  thrDay: string;
  fouDay: string;
  fivDay: string;
  startTime: TimeObj;
  endTime: TimeObj;
  price: number;
  mainCategory: string;
  subCategory: string;
  headcount: string;
  tags: string[];
  centerId: number;
  centerName: string;
  imageUrl: string;
  center?: CenterInfo;
}

export interface RecommendedProgramResponse {
  id: number;
  name: string;
  firDay: string;
  secDay: string;
  thrDay: string;
  fouDay: string;
  fivDay: string;
  startTime: TimeObj;
  endTime: TimeObj;
  price: number;
  mainCategory: string;
  subCategory: string;
  headcount: string;
  tags: { name: string }[];
  center?: CenterInfo;
  image_url?: string;
  imageUrl?: string;
}

export interface TimeObj {
  hour: number;
  minute: number;
  second: number;
  nano: number;
}
