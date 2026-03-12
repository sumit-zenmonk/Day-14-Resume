"use client"

import React from 'react'
import { MuiOtpInput } from 'mui-one-time-password-input'
import styles from "./otp.module.css";
import { Box, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';

export default function OtpPage() {
    const router = useRouter()
    const [value, setValue] = React.useState<string>('')

    const handleChange = (newValue: string) => {
        setValue(newValue)
    }

    const handleComplete = (finalValue: string) => {
        enqueueSnackbar("finalValue ->" + finalValue, { variant: "info" });
        router.replace('/')
    }

    return (
        <Box className={styles.container}>
            <Box className={styles.wrapper}>
                <Box className={styles.header}>
                    <Box >
                        <DescriptionIcon fontSize='large' className='logo'
                            onClick={() => router.replace('/')} sx={{
                                '&:hover': {
                                    cursor: "grab"
                                },
                            }} />
                    </Box>
                    <Typography variant="h5" className={styles.title}>
                        Welcome Back
                    </Typography>
                </Box>
                <MuiOtpInput
                    className={styles.otpWrapper}
                    value={value}
                    onChange={handleChange}
                    onComplete={handleComplete}
                    length={4}
                    autoFocus
                />
            </Box>
        </Box>
    )
}