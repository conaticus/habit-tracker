import {Page, SummarizedHabit} from "../types.ts";
import Button, {ButtonStyle} from "../ui/Button.tsx";
import usePageStore from "../stores/pageStore.ts";
import useHabitsStore from "../stores/summarizedHabitsStore.ts";

interface Props {
    habit: SummarizedHabit,
}

export default function HabitSummary({ habit }: Props) {
    const {
        amount,
        title,
        unit,
        healthyMaximum,
        concernRating,
        consumptionMultiplier,
        percentage,
        timescale
    } = habit;

    const { setPage } = usePageStore();
    const { setCurrentHabitToReschedule } = useHabitsStore();

    function getConcernRatingColour(): string {
        switch (concernRating) {
            case "Severe":
                return "red";
            case "High":
                return "#ff4000";
            case "Medium":
                return "#ff9100";
            default:
                return "#129900";
        }
    }

    return <div className="mb-5">
        <div className="flex items-center mb-5">
            <h1>{title}</h1>
            <div className="flex items-center font-semibold h-10 ml-4 text-xl px-6 rounded-md" style={{backgroundColor: getConcernRatingColour()}}>
                {concernRating}
            </div>
        </div>
        <p>Healthy Maximum per {timescale} - {healthyMaximum}{unit}</p>
        <p>Your Amount - {amount}{unit}</p>
        <br />
        <p>
            You are having {consumptionMultiplier > 1 ? <strong>{Math.round(consumptionMultiplier).toFixed(1)}x</strong> : <><strong>{percentage}%</strong> of</>} the maximum healthy amount of {title.toLowerCase()} each {timescale}.
        </p>

        <Button buttonStyle={ButtonStyle.Primary} additionalStyles="mt-4 mb-6" onClick={() => {
            setCurrentHabitToReschedule(habit);
            setPage(Page.ScheduleGenerator);
        }}>Create Schedule</Button>
    </div>
}