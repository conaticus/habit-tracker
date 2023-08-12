import {ConcernRating, Habit, QuestionInputs, SummarizedHabit} from "../types.ts";
import HabitSummary from "../components/HabitSummary.tsx";

interface Props {
    inputs: QuestionInputs;
    habits: Habit[];
}

function summarizeHabit(amount: number, habit: Habit): SummarizedHabit {
    const { healthyMaximum, weight } = habit;

    const consumptionMultiplier = amount / healthyMaximum;
    const severityNumber = weight * consumptionMultiplier;
    const percentage = Math.round(consumptionMultiplier * 100);

    let concernRating: ConcernRating = "Healthy";

    if (severityNumber >= 8) concernRating = "Severe"
    else if (severityNumber >= 4) concernRating = "High"
    else if (severityNumber >= 2.5) concernRating = "Medium"
    else if (severityNumber >= 1.8) concernRating = "Acceptable"

    return {
        ...habit,
        amount,
        consumptionMultiplier,
        severityNumber,
        percentage,
        concernRating
    }
}

export default function Summary({ inputs, habits }: Props) {
    const summarizedHabits = habits.map(habit => summarizeHabit(inputs[habit.title] as number, habit));
    summarizedHabits.sort((a, b) => b.severityNumber - a.severityNumber)

    return <div className="ml-12 mt-6">
        {summarizedHabits.map((habit, idx) =>
            <HabitSummary habit={habit} key={idx} />
        )}
    </div>
}