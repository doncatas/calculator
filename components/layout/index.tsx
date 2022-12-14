import type { ReactElement } from 'react'
import { memo } from 'react'
import styles from '../../styles/layout.module.css'
import Navigation from "./navigation";
import {useEffect} from "react";
import {styled} from "@mui/material/styles";
import {Box, Grid} from "@mui/material";

const Container = styled(Box)(({theme}) => ({
    width: '100%',
    height: '100%',
    maxWidth: '360px',
    minHeight: '800px',
    maxHeight: '800px',
    margin: '0 auto',
    backgroundColor: '#FFF',
    overflowY: 'auto',
    position: 'relative',
}))

const Main = styled(Box)(({theme}) => ({
    padding: theme.spacing(5),
}))

const Layout = ({ children }: {children: ReactElement}) => {
    useEffect(() => {
        console.log('-Layout rendered')
    }, [])
    return (
        <>
            <Container>
                <Grid container direction="column">
                    <Grid item>
                        <Navigation
                            type="Standard"
                            showPrefix
                            prefixIcon="menu-2"
                            showSuffix
                            suffixIcon="bell-ringing"
                            showSubtitle={false}
                        />
                    </Grid>
                    <Grid item>
                        <Main>
                            {children}
                        </Main>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default memo(Layout)