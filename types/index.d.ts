export type VenueImages = {
    id: string;
    venueId: string;
    imageUrl: string;
    order : number;
    isPrimary: boolean;
}

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
}