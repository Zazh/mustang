export interface StoreInfo {
    phones?: string[];
    email?: string;
    working_hours?: string;
    description?: string;
    photo?: string;
    latitude?: number;
    longitude?: number;
    socialName?: string;
    socialAcc?: string;
    socialLink?: string;
    created_at: string;
    updated_at: string;
}

export interface Store {
    id: number;
    name: string;
    city: string;  // <--- добавь это поле
    country: string;  // <--- добавь это поле
    address: string;
    is_points: boolean;
    info?: StoreInfo;
    created_at: string;
    updated_at: string;
} 