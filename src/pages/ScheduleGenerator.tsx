import Button, {ButtonSize} from "../ui/Button.tsx";
import useHabitsStore from "../stores/summarizedHabitsStore.ts";
import usePageStore from "../stores/pageStore.ts";
import {Page, SummarizedHabit} from "../types.ts";
import Input from "../ui/Input.tsx";
import {ChangeEvent, useEffect, useState} from "react";

const DEFAULT_REDUCTION_PERCENTAGE = 20;

export default function ScheduleGenerator() {
    const { currentHabitToReschedule } = useHabitsStore();
    const { setPage } = usePageStore();

    if (!currentHabitToReschedule) setPage(Page.Summary);
    const { title, timescale, unit, amount, healthyMaximum } = currentHabitToReschedule as SummarizedHabit;

    const [inputs, setInputs] = useState({
        target: healthyMaximum,
        reductionPercentage: DEFAULT_REDUCTION_PERCENTAGE
    });

    function setInput(e: ChangeEvent<HTMLInputElement>) {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        })
    }

    const [schedule, setSchedule] = useState<number[]>([]);
    useEffect(() => {
        const scheduleArr = [];
        let amountLeft = amount;

        while (amountLeft > inputs.target) {
            let reduction = (inputs.reductionPercentage / 100) * amount;
            if (amountLeft - reduction < inputs.target) { reduction = amountLeft - inputs.target }

            amountLeft -= reduction;
            scheduleArr.push(amountLeft);
        }

        setSchedule(scheduleArr);
    }, [inputs])

    return <>
        {currentHabitToReschedule ? (
            <div className="text-center flex flex-col justify-center items-center">
                <h2 className="mt-4 mb-4">Habit Reduction Schedule ({title})</h2>
                <h3 className="mb-4">Target per {timescale}</h3>
                <Input
                    name="target"
                    value={inputs.target}
                    onChange={setInput}
                    placeholder={String(currentHabitToReschedule.healthyMaximum)}
                    unit={unit}
                    inputSize={currentHabitToReschedule.inputSize}
                    containerStyle="mb-4"
                />
                <h3 className="mb-4">Reduction per {timescale}</h3>
                <Input
                    name="reductionPercentage"
                    value={inputs.reductionPercentage}
                    onChange={setInput}
                    placeholder={String(DEFAULT_REDUCTION_PERCENTAGE)}
                    unit="%"
                    inputSize={currentHabitToReschedule.inputSize}
                    containerStyle="mb-8"
                />

                <div className="grid grid-cols-10 [&>*:nth-child(10n+11)]:border-l-0 rounded-lg overflow-hidden">
                    {schedule.map((newAmount, idx) => <div className="bg-secondary px-5 py-3 first:border-l-0 border-l border-l-gray-500 border-b border-b-gray-500" key={idx}>
                        <p><strong>{timescale} {idx + 1}</strong></p>
                        <p className="text-xl mt-5">
                            {newAmount}{unit}
                        </p>
                    </div>)}
                </div>
            </div>
        ) : (
            <>An error occurred :(</>
        )}

        <Button additionalStyles="mx-10 absolute bottom-8" buttonSize={ButtonSize.ExtraLarge} onClick={() => setPage(Page.Summary)}>Back</Button>
    </>
}
