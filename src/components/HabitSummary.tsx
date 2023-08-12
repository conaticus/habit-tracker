import {SummarizedHabit} from "../types.ts";

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
            <div className="flex items-center font-semibold h-10 ml-8 text-xl px-12 rounded-md" style={{backgroundColor: getConcernRatingColour()}}>
                {concernRating}
            </div>
        </div>
        <p>Healthy Maximum per {timescale} - {healthyMaximum}{unit}</p>
        <p>Your Amount - {amount}{unit}</p>
        <br />
        <p>
            You are having {consumptionMultiplier > 1 ? <strong>{Math.round(consumptionMultiplier).toFixed(1)}x</strong> : <><strong>{percentage}%</strong> of</>} the healthy amount of {title.toLowerCase()} each {timescale}.</p>
    </div>
}