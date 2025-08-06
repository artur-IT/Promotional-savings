// export interface Saving {
//   id: string;
//   promotion: number;
//   date: string;
//   category: string;
// }

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
  };
}

// export interface AchievedGoal extends Goal {
//   totalPromotionSum: number;
//   achievedDate: string;
// }

// export const SAVINGS_KEY = 'savings';
export const GOAL_KEY = 'goal';
