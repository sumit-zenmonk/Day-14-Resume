"use client"

import styles from "./login.module.css"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, LoginSchemaType } from "@/types/login"
import { useRouter } from "next/navigation"
import DescriptionIcon from '@mui/icons-material/Description';
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { selectCurrLogin } from "@/redux/feature/curr_login/currLoginSlice"
import Cookies from "js-cookie"
import intialData from "../../../../dummy_content.json";

import {
    Box,
    Button,
    Card,
    TextField,
    Typography,
    Divider,
    InputLabel
} from "@mui/material"
import { enqueueSnackbar } from "notistack"
import { AddContent } from "@/redux/feature/all_signup_users_content/allContentSlice"

export default function LoginForm() {
    const dispatch = useDispatch<AppDispatch>()
    const router = useRouter()
    const users = useSelector((state: RootState) => state.AllSignedUpUsersReducer)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginSchemaType) => {
        const userExists = users.find(
            (user) => user.mobile_no === data.phone_no
        )

        if (!userExists) {
            enqueueSnackbar("User not found. Please signup first.", { variant: "error" })
            return
        }

        await dispatch(selectCurrLogin({ mobile_no: data.phone_no }));
        await dispatch(AddContent({ mobile_no: data.phone_no, content_data: intialData }));

        Cookies.set("phone_no", data.phone_no)
        router.replace("/")
    }

    return (
        <Box className={styles.container}>
            <Card className={styles.formWrapper} elevation={4}>
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

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <Box className={styles.field}>
                        <InputLabel htmlFor="phone_no" sx={{ color: "white", fontWeight: 600, fontSize: ".8rem" }}>
                            Phone
                        </InputLabel>
                        <TextField
                            id="phone_no"
                            // label="phone_no"
                            type="number"
                            fullWidth
                            {...register("phone_no")}
                            slotProps={{
                                inputLabel: { sx: { color: 'white', '&.Mui-focused': { color: 'white' } } },
                                input: {
                                    sx: {
                                        height: "40px",
                                        color: 'white',
                                        '& input::placeholder': { color: 'white', opacity: 1 },
                                    },
                                },
                            }}
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
                        className={styles.loginbutton}
                    >
                        Login
                    </Button>
                </form>

                <Box className={styles.signupBox}>
                    <Typography className={styles.noAcc}>Don't have Account ?</Typography>
                    <Button
                        variant="text"
                        className={styles.anchorbutton}
                        onClick={() => router.replace("/signup")}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Card>

            <Typography className={styles.privacyContent}>
                This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </Typography>
        </Box>
    )
}