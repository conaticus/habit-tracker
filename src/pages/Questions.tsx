import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {Habit, Page, QuestionInputs} from "../types.ts";
import Question from "../components/Question.tsx";
import Summary from "./Summary.tsx";

function Questions() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
    const [inputs, setInputs] = useState<QuestionInputs>({});
    const [page, setPage] = useState(Page.Questions);

    useEffect(() => {
         async function getHabits() {
             const habitsRaw = await invoke<string>("get_habits");
             const habitsParsed = JSON.parse(habitsRaw);

             setHabits(habitsParsed);
             setInputs(Object.fromEntries(habitsParsed.map((habit: Habit) => [habit.title, null])));
         }

         getHabits();
    }, [])

    if (page === Page.Questions) {
        if (habits.length > 0) {
            return <Question
                habitsLength={habits.length}
                habit={habits[currentQuestionIdx]}
                currentQuestionIdx={currentQuestionIdx}
                setCurrentQuestionIdx={setCurrentQuestionIdx}
                inputs={inputs}
                setInputs={setInputs}
                setPage={setPage}
            />
        } else {
            return <>Loading</>;
        }
    } else if (page === Page.Summary) {
        return <Summary habits={habits} inputs={inputs} />
    }
}

export default Questions;
