import { createTheme } from "@mui/material/styles";
import React from 'react'
import { blue, bw } from './colors';

export const theme = createTheme({
    spacing: 4,
    palette: {
        primary: {
            main: blue[500],
        },
        error: {
            main: '#E5476D'
        },
        // bw: {
        //     main: '#000000',
        // },
        text: {
            primary: bw[900],
            secondary: bw[700],
        }
    },
    typography: {
        fontFamily: [
            'Inter',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(', '),
        HeadingS: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '28px',
        },
        HeadingL: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '32px',
            lineHeight: '40px',
        },
        BodyXS: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 700,
            fontSize: '10px',
            lineHeight: '14px',
        },
        BodyM: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
        },
        BodyL: {
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
        },
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    marginBottom: 0,
                },
            },
        },
    },
});



declare module '@mui/material/styles' {
    interface TypographyVariants {
        HeadingS: React.CSSProperties;
        HeadingL: React.CSSProperties;
        BodyXS: React.CSSProperties;
        BodyM: React.CSSProperties;
        BodyL: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        HeadingS?: React.CSSProperties;
        HeadingL?: React.CSSProperties;
        BodyXS?: React.CSSProperties;
        BodyM?: React.CSSProperties;
        BodyL?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        HeadingS: true;
        HeadingL: true;
        BodyXS: true;
        BodyM: true;
        BodyL: true;
    }
}