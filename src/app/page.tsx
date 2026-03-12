"use client";

import HeaderComp from "@/component/header-comp/header-comp";
import styles from "./home.module.css";
import { Box, Button, Fab, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { selectCurrTemplate } from "@/redux/feature/selected_template/selected_template";

export default function HomeComp() {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()
  const data = useSelector((state: RootState) => state.AllUserContentReducer)
  const user = useSelector((state: RootState) => state.CurrLoginReducer)

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSelection = async (id: number) => {
    await dispatch(selectCurrTemplate({ template_id: id }))
    router.push(`/form`);
  }

  const userData = data.filter(curr => curr.mobile_no == user.mobile_no);

  return (
    <Box className={styles.container}>
      <HeaderComp />
      {
        userData.length > 0 ?
          userData.map((item, index) => (
            <Box key={index} className={styles.resume_card}>
              <Image src={`/v${item.template_id}.png`} width={100} height={100} alt="resume" />
              <Box className={styles.resume_card_button_box}>
                <Button onClick={() => { router.push(`/resume/v${item.template_id}`) }}>
                  Preview
                </Button>
              </Box>
            </Box>
          ))
          :
          <>No Data Provided</>
      }

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
