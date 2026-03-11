"use client";

import HeaderComp from "@/component/header-comp/header-comp";
import styles from "./home.module.css";
import { Box, Fab, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeComp() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSelection = (id: number) => {
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
            <Image src={'/v1.png'} width={100} height={100} alt="miss" onClick={() => { handleSelection(1) }} />
          </Box>
          <Box className={styles.resume_card}>
            <Image src={'/v2.png'} width={100} height={100} alt="miss" onClick={() => { handleSelection(2) }} />
          </Box>  <Box className={styles.resume_card}>
            <Image src={'/v2.png'} width={100} height={100} alt="miss" onClick={() => { handleSelection(2) }} />
          </Box>  <Box className={styles.resume_card}>
            <Image src={'/v2.png'} width={100} height={100} alt="miss" onClick={() => { handleSelection(2) }} />
          </Box>  <Box className={styles.resume_card}>
            <Image src={'/v2.png'} width={100} height={100} alt="miss" onClick={() => { handleSelection(2) }} />
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
