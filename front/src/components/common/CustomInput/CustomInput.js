import React from 'react';
import "./CustomInput.scss";

const CustomInput = ({
    type,
    className,
    value,
    setValue,
    placeholder,
    ref,
    maxLength,
    onClick,
    enterEvent,
}) => {

    const EnterListener = (e)=>{
        if(e.key === "Enter"){
            return enterEvent();
        }
    }

    return (
        <>
            <input 
                ref={ref}
                autoComplete='off'
                type={type}
                className={"CustomInput "+className}
                value={value}
                onChange={e=>setValue(e.target.value)}
                placeholder={placeholder}
                ref={ref}
                maxLength={maxLength}
                onClick={onClick}
                onKeyPress={e=>EnterListener(e)}
            />
        </>
    )
}

export default CustomInput;