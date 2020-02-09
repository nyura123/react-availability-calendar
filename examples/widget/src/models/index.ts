export interface Service {
  id: string;
  label: string;
}

export interface Interval {
  startDate: number;
  endDate: number;
}

export interface Booking {
  id?: string;
  startDate: Date;
  endDate: Date;
  isBlockout?: boolean;
  resourceId?: number;
}

export const services = [
  { id: 'mani', label: 'Manicure' },
  { id: 'pedi', label: 'Pedicure' },
  { id: 'mani_padi', label: 'Mani/Pedi' },
];
export interface RequestBookingParams {
  calId: string;
  startDate: Date;
  endDate: Date;
  email?: string;
  description: string;
  phone?: string;
  name?: string;
  message?: string;
}
