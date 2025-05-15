export interface Saving {
  id: string;
  promotion: number;
  date: string;
  category: string;
  // allSavings?: Saving[];
}

export interface Goal {
  id: string;
  goal: string;
  targetAmount: number;
  startDate: string;
  endDate?: string;
}

// export interface SavingsEntries {
// id: string;
// goal: string;
// targetAmount?: number;
// startDate?: string;
// endDate?: string;
//  promotionSum?: number;
// entries: Saving[];
// {
//   id: string; // UUID
//   promotion: number;
//   date: string;
//   category: string;
// };
// }

export const SAVINGS_KEY = "savings";
export const GOAL_KEY = "goal";
