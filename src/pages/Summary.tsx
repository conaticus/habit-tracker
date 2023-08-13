import {ConcernRating, Habit, Page, QuestionInputs, SummarizedHabit} from "../types.ts";
import HabitSummary from "../components/HabitSummary.tsx";
import useHabitsStore from "../stores/summarizedHabitsStore.ts";
import Button, {ButtonSize} from "../ui/Button.tsx";
import usePageStore from "../stores/pageStore.ts";

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
    const { summarizedHabits, setSummarizedHabits } = useHabitsStore();
    const { setPage } = usePageStore();

    if (summarizedHabits.length === 0) {
        const summarizedHabits = habits.map(habit => summarizeHabit(inputs[habit.title] as number, habit));
        summarizedHabits.sort((a, b) => b.severityNumber - a.severityNumber)
        setSummarizedHabits(summarizedHabits);
    }

    return <div className="ml-10 mt-6">
        {summarizedHabits.map((habit, idx) =>
            <HabitSummary habit={habit} key={idx} />
        )}
        <Button additionalStyles="mt-10" buttonSize={ButtonSize.ExtraLarge} onClick={() => {
            // Ensures that summary can be reloaded when resubmitting.
            setSummarizedHabits([]);
            setPage(Page.Questions);
        }}>Back</Button>
    </div>
}