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
import TemplateModal from "@/component/template_modal/template_modal";
import { removeContent } from "@/redux/feature/usersContent/allContentSlice";

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

  const handleDelete = async (id: number) => {
    await dispatch(removeContent({ mobile: user.mobile_no, template_id: id }))
  }

  const userData = data.filter(curr => curr.mobile_no == user.mobile_no);

  return (
    <Box className={styles.container}>
      <HeaderComp />
      {
        userData.length > 0 ?
          <Box className={styles.listingContainer}>
            {userData.map((item, index) => (
              <Box key={index} className={styles.resume_card}>
                <Image src={`/v${item.template_id}.png`} width={100} height={100} alt="resume" />
                <Box className={styles.resume_card_button_box}>
                  <Button onClick={() => { handleSelection(item.template_id) }} className={styles.editbtn}>
                    Edit
                  </Button>
                  <Button onClick={() => { router.push(`/resume/v${item.template_id}`) }} className={styles.previewbtn}>
                    Preview
                  </Button>
                  <Button onClick={() => { handleDelete(item.template_id) }} className={styles.removebtn}>
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
          :
          <>No Data Provided</>
      }

      <TemplateModal
        open={open}
        handleClose={handleClose}
        onSelect={handleSelection}
        onPreview={(id) => router.push(`/resume/v${id}`)}
      />

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
