import {
    Alert,
    Box, ButtonBase,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Input,
    TextField,
    Typography
} from "@mui/material";
import Image from "next/image";
import IconArrow from "../../public/arrow.svg";
import {Dispatch, SetStateAction, useMemo, useState} from "react";
import {useSelector} from "react-redux";
import ListItem from "../template/list-item";
import { filteredCurrencies } from '../../store/calculator/selector';
import {Currency} from "../../types/calculator/currency";

type Props = {
    placeholder: string,
    value: string,
    onChange: Dispatch<SetStateAction<string>>,
    onBlur: () => void,
}

const CountryDropdown = ({ value, placeholder, onChange, onBlur }: Props) => {
    const [dialog, handleDialog] = useState(false)
    const [search, handleSearch] = useState('')
    const currencies = useSelector(state => filteredCurrencies(state, search))

    return (
        <>
            <ButtonBase onClick={() => handleDialog(true)}>
                <Grid container direction="row" alignItems="center" spacing={2}>
                    <Grid item>
                        <Box style={{ width: 24, height: 24, borderRadius: 24, backgroundColor: '#EDF0F4' }}></Box>
                    </Grid>
                    <Grid item>
                        <Typography variant="BodyM" fontWeight="700">{value}</Typography>
                    </Grid>
                    <Grid item>
                        <Box style={{ width: 8, height: 4, display: 'flex' }}>
                            <Image src={IconArrow} width={8} height={4} alt="dropdown-arrow" />
                        </Box>
                    </Grid>
                </Grid>
            </ButtonBase>

            <Dialog
                fullWidth={true}
                maxWidth="sm"
                open={dialog}
                onClose={() => handleDialog(false)}
            >
                <DialogContent>
                    <Grid container direction="column" spacing={5}>
                        <Grid item>
                            <DialogTitle>{placeholder}</DialogTitle>
                        </Grid>
                        <Grid item>
                            <TextField fullWidth value={search} onChange={(e) => handleSearch(e.target.value)} label="Search" variant="outlined" />
                        </Grid>
                        <Grid item>
                            <Typography variant="BodyL" fontWeight={700} paragraph mb={3}>All countries</Typography>
                            <Grid container direction="column">
                                {!currencies.length && (
                                    <Alert severity="info">No results found</Alert>
                                )}
                                {currencies?.map((currency: Currency) => (
                                    <Grid
                                        key={`dropdown-currency-${currency.currencyCode}`}
                                        item
                                    >
                                        <ButtonBase
                                            sx={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left', borderBottom: '1px solid #EDF0F4' }}
                                            onClick={() => {
                                                handleSearch('')
                                                handleDialog(false)
                                                onChange(currency.currencyCode)
                                                onBlur()
                                            }}>
                                            <ListItem
                                                title={currency.country}
                                                subtitle={`${currency.currency} • ${currency.currencyCode}`}
                                                prefix={<Box style={{ width: 48, height: 48, borderRadius: 48, backgroundColor: '#EDF0F4' }}></Box>}
                                            />
                                        </ButtonBase>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CountryDropdown