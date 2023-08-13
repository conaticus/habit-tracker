import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {Habit, Page, QuestionInputs} from "../types.ts";
import Question from "../components/Question.tsx";
import Summary from "./Summary.tsx";
import usePageStore from "../stores/pageStore.ts";
import ScheduleGenerator from "./ScheduleGenerator.tsx";

function Questions() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
    const [inputs, setInputs] = useState<QuestionInputs>({});
    const { currentPage } = usePageStore();

    useEffect(() => {
         async function getHabits() {
             const habitsRaw = await invoke<string>("get_habits");
             const habitsParsed = JSON.parse(habitsRaw);

             setHabits(habitsParsed);
             setInputs(Object.fromEntries(habitsParsed.map((habit: Habit) => [habit.title, null])));
         }

         getHabits();
    }, [])

    if (currentPage === Page.Questions) {
        if (habits.length > 0) {
            return <Question
                habitsLength={habits.length}
                habit={habits[currentQuestionIdx]}
                currentQuestionIdx={currentQuestionIdx}
                setCurrentQuestionIdx={setCurrentQuestionIdx}
                inputs={inputs}
                setInputs={setInputs}
            />
        } else {
            return <>Loading</>;
        }
    } else if (currentPage === Page.Summary) {
        return <Summary habits={habits} inputs={inputs} />
    } else if (currentPage === Page.ScheduleGenerator) {
        return <ScheduleGenerator />
    }
}

export default Questions;
