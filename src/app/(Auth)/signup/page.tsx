"use client"

import styles from "./signup.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema, SignupSchemaType } from "@/types/signup"
import { useRouter } from "next/navigation"
import DescriptionIcon from '@mui/icons-material/Description';
import { AllSignup } from "@/redux/feature/authUsers/allUserSlice";
import Cookies from "js-cookie";

import {
    Box,
    Button,
    Card,
    InputLabel,
    TextField,
    Typography
} from "@mui/material"
import { selectCurrLogin } from "@/redux/feature/curr_login/currLoginSlice"
import { matchIsValidTel, MuiTelInput } from "mui-tel-input"

export default function SignupForm() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const {
        control,
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema)
    })

    const onSubmit = async (data: SignupSchemaType) => {
        await dispatch(AllSignup({ mobile_no: data.phone_no }));
        await dispatch(selectCurrLogin({ mobile_no: data.phone_no }))

        Cookies.set("phone_no", data.phone_no);
        router.replace("/otp");
    }

    return (
        <Box className={styles.container}>
            <Card className={styles.formWrapper} elevation={3}>
                <Box className={styles.header}>
                    <DescriptionIcon fontSize='large' className='logo'
                        onClick={() => router.replace('/')} sx={{
                            '&:hover': {
                                cursor: "grab"
                            },
                        }} />
                    <Typography variant="h5" className={styles.title}>
                        Join Us !
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor="phone_no" sx={{ color: "white", fontWeight: 600, fontSize: ".8rem" }}>
                            Phone
                        </InputLabel>
                        <Controller
                            name="phone_no"
                            control={control}
                            rules={{
                                validate: (value) => matchIsValidTel(value) || "Invalid phone number"
                            }}
                            render={({ field, fieldState }) => (
                                <MuiTelInput
                                    {...field}
                                    fullWidth
                                    defaultCountry="IN"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                    sx={{
                                        "& .MuiInputBase-root": {
                                            height: "40px",
                                            color: "white"
                                        }
                                    }}
                                />
                            )}
                        />
                        {errors.phone_no && (
                            <span className={styles.error}>
                                {errors.phone_no.message}
                            </span>
                        )}
                    </Box>

                    <Button
                        variant="contained"
                        type="submit"
                        className={styles.button}
                    >
                        Signup
                    </Button>

                    <Box className={styles.loginBox}>
                        <Typography className={styles.haveAcc}>Already have Account ?</Typography>
                        <Button
                            variant="text"
                            className={styles.anchorbutton}
                            onClick={() => router.replace("/login")}
                        >
                            Login
                        </Button>
                    </Box>
                </form>
            </Card>

            <Typography className={styles.privacyContent}>
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </Typography>
        </Box>
    )
}