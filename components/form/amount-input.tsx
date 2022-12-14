import {Typography, TextField} from "@mui/material";
import {Dispatch, SetStateAction, useEffect, useState} from "react";

type Props = {
    value: number,
    onChange: Dispatch<SetStateAction<number>>,
    onBlur: () => void,
    error: boolean,
}

const AmountInput = ({ value, onChange, onBlur, error }: Props) => {
    const [tempValue, handleTempValue] = useState<number|null>(null)
    useEffect(() => {
        if (tempValue !== value) {
            handleTempValue(value)
        }
    }, [value])

    return (
        <>
            <Typography
                component="input"
                value={tempValue || ''}
                onChange={e => handleTempValue(Number(e.target.value))}
                onBlur={(e) => {
                    if (Number(e.target.value) > 0 && !isNaN(Number(e.target.value))) {
                        onChange(Number(e.target.value))
                        onBlur()
                    } else {
                        handleTempValue(value)
                        onChange(value)
                        onBlur()
                    }
                }}
                sx={{ border: 'none', background: 'none', width: 150, textAlign: 'right' }}
                variant="HeadingL"
                color={error ? "error.main" : "primary.main"}
            />
            {/*<TextField component={Typography} variant="HeadingL" onChange={e => onChange(e.target.value)}>{value}</TextField>*/}
        </>
    )
}

export default AmountInput