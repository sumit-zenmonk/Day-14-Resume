"use client";

import HeaderComp from "@/component/header-comp/header-comp";
import styles from "./home.module.css";
import { Box, Button, Fab, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { selectCurrTemplate } from "@/redux/feature/selected_template/selected_template";

export default function HomeComp() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSelection = async (id: number) => {
    await dispatch(selectCurrTemplate({ template_id: id }))
    router.push(`/form`);
  }

  return (
    <Box className={styles.container}>
      <HeaderComp />

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box className={styles.modal_container}>
          <Box className={styles.resume_card}>
            <Image src={'/v1.png'} width={100} height={100} alt="miss" />
            <Box className={styles.resume_card_button_box}>
              <Button onClick={() => { router.push('/resume/v1') }}>Preview</Button>
              <Button onClick={() => { handleSelection(1) }}>Use</Button>
            </Box>
          </Box>
          <Box className={styles.resume_card}>
            <Image src={'/v2.png'} width={100} height={100} alt="miss" onClick={() => { handleSelection(2) }} />
            <Box className={styles.resume_card_button_box}>
              <Button onClick={() => { router.push('/resume/v2') }}>Preview</Button>
              <Button onClick={() => { handleSelection(2) }}>Use</Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Fab
        onClick={handleOpen}
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
}
