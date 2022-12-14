import {ReactElement} from "react";
import {Box, Grid, Typography} from "@mui/material";

type Props = {
    prefix?: ReactElement,
    title: string,
    subtitle?: string,
}

const ListItem = ({ prefix, title, subtitle }: Props) => (
    <Box py={3}>
        <Grid container direction="row" spacing={4}>
            {!!prefix && (
                <Grid item>
                    {prefix}
                </Grid>
            )}
            <Grid item>
                <Typography paragraph variant="BodyM" fontWeight={700}>{title}</Typography>
                {!!subtitle && (<Typography paragraph variant="BodyM" fontWeight={400} mt={1} color="text.secondary">{subtitle}</Typography>)}
            </Grid>
        </Grid>
    </Box>
)

export default ListItem