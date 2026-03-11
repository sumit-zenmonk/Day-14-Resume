"use client"

import { usePathname, useRouter } from 'next/navigation';
import { Box, Button, Menu, MenuItem } from "@mui/material"
import { AppDispatch, RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import './header-comp.css'
import { useState } from "react";
import Image from 'next/image';
import { resetCurrLogin } from '@/redux/feature/curr_login/currLoginSlice';
import Cookies from "js-cookie";

export default function HeaderComp() {
    const pathname = usePathname();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const user = useSelector((state: RootState) => state.CurrLoginReducer)
    const dispatch = useDispatch<AppDispatch>()

    const handleLogOut = async () => {
        await dispatch(resetCurrLogin())
        Cookies.remove("phone_no");
        router.replace("/login")
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box className="header">
            <Box className="left-container">
                <Image
                    src={'/logo.png'}
                    className='logo'
                    alt='logo img'
                    width={40}
                    height={40}
                    onClick={() => router.replace('/')}
                />
            </Box>

            <Box className="right-container">
                <Button
                    variant="outlined"
                    sx={{ width: "10%", height: "10%", color: "black", backgroundColor: "white", fontWeight: "700", fontSize: "1rem", borderRadius: "16px" }}
                    onClick={handleMenuOpen}
                >
                    Menu
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    slotProps={{
                        paper: {
                            sx: {
                                width: "10%",
                                backgroundColor: "rgb(29, 29, 29)",
                                color: "rgba(255, 255, 255, 0.98)",
                                fontWeight: "900",
                                borderRadius: "20px",
                                textAlign: "center",
                            }
                        }
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            router.replace('/');
                            handleMenuClose();
                        }}
                        sx={{
                            fontWeight: "700",
                            border: "2px solid transparent",
                            borderRadius: "20px",
                            '&:hover': {
                                border: "2px solid white"
                            },
                        }}
                    >
                        Home
                    </MenuItem>

                    {user ? (
                        <MenuItem
                            sx={{
                                color: "red",
                                fontWeight: "700",
                                border: "2px solid transparent",
                                borderRadius: "20px",
                                '&:hover': {
                                    border: "2px solid white"
                                },
                            }}
                            onClick={async () => {
                                await handleLogOut();
                                handleMenuClose();
                            }}
                        >
                            Log Out
                        </MenuItem>
                    ) : (
                        <MenuItem
                            onClick={() => {
                                router.replace('/login');
                                handleMenuClose();
                            }}
                            sx={{
                                fontWeight: "700",
                                border: "2px solid transparent",
                                borderRadius: "20px",
                                '&:hover': {
                                    border: "2px solid white"
                                },
                            }}
                        >
                            Sign In
                        </MenuItem>
                    )}
                </Menu>
            </Box>
        </Box >
    )
}
