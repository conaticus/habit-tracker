import {ButtonHTMLAttributes, ForwardedRef, forwardRef} from "react";

export enum ButtonStyle {
   Primary,
   Secondary,
}

export enum ButtonSize {
    Small,
    ExtraLarge,
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    buttonStyle?: ButtonStyle,
    buttonSize?: ButtonSize;
    additionalStyles?: string;
}

const Button = forwardRef(
    ({ buttonStyle = ButtonStyle.Secondary, buttonSize = ButtonSize.Small, additionalStyles, ...buttonProps }: Props,
     ref: ForwardedRef<HTMLButtonElement>) => {
      const buttonColor = buttonStyle == ButtonStyle.Primary ? "bg-primary" : "bg-secondary";
      const fontWeight = buttonStyle == ButtonStyle.Primary ? "font-semibold" : "font-normal";

      let textSize = buttonSize == ButtonSize.ExtraLarge ? "text-3xl" : "text-lg";
      let height = buttonSize == ButtonSize.ExtraLarge ? "h-16" : "h-8";
      let width = buttonSize == ButtonSize.ExtraLarge ? "w-80" : "w-48";
      let borderRadius = buttonSize == ButtonSize.ExtraLarge ? "rounded-xl" : "rounded-md";

      return <button ref={ref} {...buttonProps} className={`${buttonColor} ${fontWeight} ${textSize} ${height} ${width} ${borderRadius} disabled:opacity-50${" " + additionalStyles || ""}`} />
})

export default Button;