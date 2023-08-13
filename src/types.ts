export type InputSize = "short";

interface Link {
    name: string;
    link: string;
}

export interface Habit {
    title: string;
    timescale: string;
    question: string;
    inputSize: InputSize;
    unit: string;
    weight: number;
    healthyMaximum: number;
    links?: Link[];
}

export interface QuestionInputs {
    [key: string]: number | null; // key (habit title): value (input value)
}

export enum Page {
    Questions,
    Summary,
    ScheduleGenerator
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