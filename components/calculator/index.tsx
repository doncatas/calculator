import {Box, Grid, Typography, Alert, ButtonBase, Icon, useTheme} from "@mui/material";
import {styled} from "@mui/material/styles";
import CountryDropdown from "../form/country-dropdown";
import {useEffect, useState} from "react";
import AmountInput from "../form/amount-input";
import { Form, FormikProvider, useFormik } from "formik";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import {useDispatch, useSelector} from "react-redux";
import {CalculatorActionTypes} from "../../store/calculator/action";
import {Currency} from "../../types/calculator/currency";

type Props = {}

const SwitchButton = styled(ButtonBase)(({theme}) => ({
    width: 24,
    height: 24,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(),
}))

const Calculator = ({}: Props) => {
    const dispatch = useDispatch()
    const theme = useTheme()

    useEffect(() => {
        dispatch({ type: CalculatorActionTypes.FETCH_CURRENCIES })
    }, [])

    const formik = useFormik({
        initialValues: {
            from: 'PLN',
            to: 'UAH',
            amount: 1000,
        },
        // validateOnMount: true,
        validateOnBlur: true,
        validateOnChange: true,
        validate: ((curr: any) => {
            const max = currencies.find((item: Currency) => item.currencyCode === curr.from)?.max || null
            if (max && !isNaN(curr.amount) && max < curr.amount) {
                dispatch({ type: CalculatorActionTypes.FETCH_CONVERSION_SUCCESS, payload: null })
                return { amount: `Maximum sending amount ${max} ${curr.from}` }
            }
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch({ type: CalculatorActionTypes.FETCH_CONVERSION, payload: values })
            setSubmitting(false)
        },
    });

    const {errors, values, handleSubmit, setFieldValue, setValues} = formik;
    const currencies = useSelector((state: any) => state.calculator.currencies)
    const conversion = useSelector((state: any) => state.calculator.conversion)
    const conversionError = useSelector((state: any) => state.calculator.conversionError)

    useEffect(() => {
        handleSubmit()
    }, [values]);

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Box sx={{
                    width: '100%',
                    borderRadius: '16px',
                    backgroundColor: '#EDF0F4',
                    position: 'relative',
                }}>
                    <Box sx={{
                        width: '100%',
                        borderRadius: '16px',
                        boxShadow: '0px 0px 16px rgba(0, 26, 63, 0.16)',
                        backgroundColor: '#FFFFFF',
                        outline: errors.amount ? `2px solid ${theme.palette.error.main}` : null,
                    }} px={3} py={4}>
                        <Grid container direction="row" alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Grid container direction="column" rowSpacing={2}>
                                    <Grid item>
                                        <Typography variant="BodyM" color="text.secondary">Sending from</Typography>
                                    </Grid>
                                    <Grid item>
                                        <CountryDropdown
                                            placeholder="Sending from"
                                            value={values.from}
                                            onChange={(val) => setFieldValue('from', val)}
                                            // onBlur={() => setFieldTouched('from')}
                                            onBlur={() => {}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <AmountInput
                                    value={values.amount}
                                    onChange={(val) => setFieldValue('amount', val)}
                                    // onBlur={() => setFieldTouched('amount')}
                                    onBlur={() => {}}
                                    error={!!errors.amount}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{
                        width: '100%',
                        borderRadius: '16px',
                    }} px={3} py={4}>
                        <Grid container direction="row" alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <Grid container direction="column" rowSpacing={2}>
                                    <Grid item>
                                        <Typography variant="BodyM" color="text.secondary">Sending to</Typography>
                                    </Grid>
                                    <Grid item>
                                        <CountryDropdown
                                            placeholder="Sending to"
                                            value={values.to}
                                            onChange={(val) => setFieldValue('to', val)}
                                            // onBlur={() => setFieldTouched('to')}
                                            onBlur={() => {}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                {!!conversion && (
                                    <Typography variant="HeadingL" color="text.primary">{conversion.toAmount}</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {!!conversion && (
                            <Box sx={{
                                position: 'relative',
                                py: 0.5,
                                px: 2,
                                borderRadius: '16px',
                                backgroundColor: '#000000',
                                display: 'flex'
                            }}>

                                <Typography variant="BodyXS" color="#FFFFFF">1 {conversion.from} ~ {conversion.rate} {conversion.to}</Typography>
                            </Box>
                        )}
                        <Box mr={8} sx={{
                            top: '50%',
                            // right: '100%',
                            left: '44px',
                            transform: 'translateY(-50%)',
                            position: 'absolute',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <SwitchButton
                                onClick={() => {
                                    setValues({
                                        ...values,
                                        from: values.to,
                                        to: values.from,
                                    }, true)
                                }}
                            >
                                <CompareArrowsIcon sx={{ rotate: '90deg', color: "#FFFFFF", width: '100%', height: '100%'  }} />
                            </SwitchButton>
                        </Box>
                    </Box>
                </Box>
                {(!!errors.amount || !!conversionError) && (
                    <Alert severity="error" sx={{ marginTop: 6 }}>{errors.amount || conversionError}</Alert>
                )}
            </Form>
        </FormikProvider>
    )
}

export default Calculator