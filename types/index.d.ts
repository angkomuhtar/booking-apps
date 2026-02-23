export type VenueImages = {
  id: string;
  venueId: string;
  imageUrl: string;
  order: number;
  isPrimary: boolean;
};

export type Venue = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  cityId: string;
  provinceId: string | null;
  rules: string | null;
  createdAt: Date;
  updatedAt: Date;
  venueImages: VenueImages[];
};

export interface Court {
  id: string;
  name: string;
  type: string | null;
  floor: string | null;
  sessionDuration: number;
  pricePerHour: number;
  isActive: boolean;
  courtType: { id: string; name: string } | null;
  floorType: { id: string; name: string } | null;
  pricing: {
    id: string;
    dayType: string;
    startTime: string;
    endTime: string;
    price: number;
    discount: number;
  }[];
  courtImages: {
    id: string;
    imageUrl: string;
    order: number;
    isPrimary: boolean;
  }[];
}
