import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, FC } from 'react'
import classNames from "classnames";
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
export interface ButtonBaseProps {
  className?: string,
  btnType?: ButtonType,
  size?: ButtonSize,
  disabled?: boolean,
  children: React.ReactNode,
  href?: string
}

type NativeButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

const Button: FC<ButtonProps> = (props)=>{
  const { btnType, disabled, size, children, href, className, ...rest} = props;
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if(btnType === 'link' && href){
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }else{
    return (
      <button className={classes}  disabled={disabled} {...rest}>
        {children}
      </button>
    );
  }
  
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button