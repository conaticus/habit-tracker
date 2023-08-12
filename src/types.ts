export type InputSize = "short";

export interface Habit {
    title: string;
    question: string;
    placeholder: string;
    inputSize: InputSize;
    unit: string;
    weight: number;
    healthyMaximum: number;
}

export interface QuestionInputs {
    [key: string]: number | null; // key (habit title): value (input value)
}

export enum Page {
    Questions,
    Summary,
}

export type ConcernRating = "Severe" | "High" | "Medium" | "Acceptable" | "Healthy";

export interface HabitSeveritySummary {
    amount: number;
    consumptionMultiplier: number;
    severityNumber: number;
    percentage: number;
    concernRating: ConcernRating;
}

export type SummarizedHabit = Habit & HabitSeveritySummary;