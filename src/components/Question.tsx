import {Habit, Page, QuestionInputs} from "../types.ts";
import Input from "../ui/Input.tsx";
import Button, {ButtonSize, ButtonStyle} from "../ui/Button.tsx";
import {Dispatch, SetStateAction} from "react";
import usePageStore from "../stores/pageStore.ts";

interface Props {
   habit: Habit;
   habitsLength: number;
   currentQuestionIdx: number;
   setCurrentQuestionIdx: Dispatch<SetStateAction<number>>;
   inputs: QuestionInputs,
   setInputs: Dispatch<SetStateAction<QuestionInputs>>;
}

export default function Question(
    {
        habit,
        setCurrentQuestionIdx,
        currentQuestionIdx,
        habitsLength,
        inputs,
        setInputs,
    }: Props) {
    const {
        title,
        question,
        inputSize,
        unit,
        healthyMaximum,
        links
    } = habit;

    const { setPage } = usePageStore();

    function nextQuestion() {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
    }

    function previousQuestion() {
        setCurrentQuestionIdx(currentQuestionIdx - 1);
    }

    function setInput(newValue: string) {
        setInputs({
            ...inputs,
            [title]: parseInt(newValue)
        })
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center text-center">
                <h1 className="mt-36 mb-8">{title}</h1>
                <h3 className="mb-6">{question}</h3>
                <Input
                    value={inputs[title] || ""}
                    unit={unit}
                    placeholder={String(healthyMaximum)}
                    inputSize={inputSize}
                    onChange={(e) => setInput(e.target.value)}
                />

                {links ? (
                    <div className="mt-8">
                        <h2 className="mb-2">Links</h2>
                        {links.map((link , idx)=> <a key={idx} target="_blank" rel="noopener noreferrer" href={link.link}>{link.name}</a>)}
                    </div>
                ) : <></>}
            </div>

            <div className="flex justify-between absolute bottom-8 w-full">
                <Button additionalStyles="mx-10" buttonSize={ButtonSize.ExtraLarge} disabled={currentQuestionIdx == 0} onClick={previousQuestion}>Back</Button>
                {currentQuestionIdx == habitsLength - 1 ? (
                    <Button additionalStyles="mx-10" buttonSize={ButtonSize.ExtraLarge} buttonStyle={ButtonStyle.Primary} onClick={() => setPage(Page.Summary)}>Summary</Button>
                ) : (
                    <Button additionalStyles="mx-10" buttonSize={ButtonSize.ExtraLarge} onClick={nextQuestion}>Next</Button>
                )}
            </div>
        </>
    )
}