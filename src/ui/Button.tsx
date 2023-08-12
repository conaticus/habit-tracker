import {ButtonHTMLAttributes, ForwardedRef, forwardRef} from "react";

export enum ButtonStyle {
   Primary,
   Secondary,
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
   buttonStyle?: ButtonStyle
}

const Button = forwardRef(
    ({ buttonStyle = ButtonStyle.Secondary, ...buttonProps }: Props,
     ref: ForwardedRef<HTMLButtonElement>) => {
      const buttonColor = buttonStyle == ButtonStyle.Primary ? "bg-primary" : "bg-secondary";
      const fontWeight = buttonStyle == ButtonStyle.Primary ? "font-semibold" : "font-normal";

      return <button ref={ref} {...buttonProps} className={`${buttonColor} ${fontWeight} mx-10 text-3xl h-16 w-80 rounded-xl disabled:opacity-50`} />
})

export default Button;