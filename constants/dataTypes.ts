export interface Goal {
  id: number;
  goal?: string;
  targetAmount?: number;
  startDate: string;
  endDate?: string;
  totalPromotionSum?: number;
  savings?: {
    id: number;
    promotion: number;
    date: string;
    category: string;
  }[];
}

export const GOAL_KEY = 'goal';
