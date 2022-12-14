import type { ReactElement } from 'react'
import styles from '../../styles/layout.module.css'
import {Box, Grid, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";

type Props = {
    type: string,
    showPrefix: boolean,
    prefixIcon?: string,
    showSuffix: boolean,
    suffixIcon?: string,
    showSubtitle: boolean,
    subtitle?: string,
}

const Container = styled(Box)(({theme}) => ({
    // position: 'fixed',
    left: 0,
    top: 0,
    background: theme.palette.primary.main,
}))

const Navigation = ({ type, showPrefix, prefixIcon, showSuffix, suffixIcon, showSubtitle }: Props) => {
    return (
        <Container px={4} py={4.5}>
            <Grid container direction="row" alignItems="center" spacing={2.5}>
                {showPrefix && prefixIcon && (
                    <Grid item>{prefixIcon}</Grid>
                )}
                <Grid item flex={1}><Typography variant="HeadingS">Menu</Typography></Grid>
                {showSuffix && suffixIcon && (
                    <Grid item>{suffixIcon}</Grid>
                )}
            </Grid>
        </Container>
    )
}

export default Navigation