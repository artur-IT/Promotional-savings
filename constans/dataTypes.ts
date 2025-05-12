// export interface Saving {
//   id: string;
//   promotional: number;
//   date: string;
//   category: string;
// }

// export interface Goal {
//   id: string;
//   goal: string;
//   targetAmount: number;
//   currentAmount?: number;
//   startDate?: string;
//   endDate?: string;
// }

export interface CurrentGoal {
  id: string;
  goal: string;
  targetAmount: number;
  startDate?: string;
  endDate?: string;
  currentAmount?: {
    id: string; // UUID
    promotionalValue: number;
    date: string;
    category: string;
  };
  promotionalSum?: number;
}
