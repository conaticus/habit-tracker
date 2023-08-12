import {ForwardedRef, forwardRef, InputHTMLAttributes} from "react";
import {InputSize} from "../types.ts";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
   unit: string;
   inputSize: InputSize,
}

const Input = forwardRef(
    (
        { unit, inputSize, ...inputProps }: Props,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
    let width: string;
    let height = 16;

    switch (inputSize) {
        case "short":
            width = "w-20";
            break;
        default:
            throw new Error(`Input size ${inputSize} is not currently supported.`);
    }

    return (
        <div className="flex">
            <input
                ref={ref}
                className={`text-center ${width} outline-none text-black rounded-l-lg text-2xl`}
                {...inputProps}
            />
            <div className={`
            ${width} h-${height} bg-white text-black flex items-center
            justify-center text-2xl m-auto rounded-r-lg border-l-2`}>{unit}</div>
        </div>
    )
})

export default Input;