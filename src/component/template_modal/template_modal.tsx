"use client";

import { Box, Button, Modal } from "@mui/material";
import Image from "next/image";
import styles from "./template_modal.module.css";

type Props = {
    open: boolean;
    handleClose: () => void;
    onSelect: (id: number) => void;
    onPreview?: (id: number) => void;
};

export default function TemplateModal({
    open,
    handleClose,
    onSelect,
    onPreview
}: Props) {
    const templates = [1, 2];
    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.modal_container}>
                {templates.map((id) => (
                    <Box key={id} className={styles.resume_card}>
                        <Image
                            src={`/v${id}.png`}
                            width={100}
                            height={100}
                            alt="template"
                        />

                        <Box className={styles.resume_card_button_box}>
                            {onPreview && <Button onClick={() => onPreview(id)}>Preview</Button>}
                            <Button onClick={() => onSelect(id)}>Use</Button>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Modal>
    );
}