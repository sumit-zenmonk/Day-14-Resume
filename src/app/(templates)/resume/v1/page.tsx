"use client"

import { Box, Fab, Typography } from "@mui/material"
import styles from "./basic_template_comp.module.css"
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectContentByMobile } from "@/redux/feature/usersContent/allContentSlice";
import { ResumeSchemaType } from "@/types/resume";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

interface ResumeProps {
    propData?: ResumeSchemaType
}

export default function BasicTemplateComp({ propData }: ResumeProps) {
    const mobile_no = useSelector((state: RootState) => state.CurrLoginReducer.mobile_no)
    const userData = useSelector((state: RootState) => selectContentByMobile(state, mobile_no, 1))
    const { basics, work, education, skills } = propData || userData?.content_data || {};
    const contentRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        if (contentRef.current) {
            const options: any = {
                margin: 1,
                filename: 'myfile.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    scrollY: 0,
                    useCORS: true,
                    logging: true
                },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait'
                },
                pagebreak: {
                    mode: ['css', 'legacy']
                }
            };

            html2pdf().from(contentRef.current).set(options).save();
        }
    };

    return (
        <Box className={styles.container}>
            <Box className={styles.content}>
                {/* Header */}
                <Box className={styles.sections}>
                    <Typography className={styles.user_name}>
                        {basics?.name || "J*****"}
                    </Typography>

                    <Box className={styles.header_basic_details}>
                        <Typography className={styles.basic_item}>
                            {basics?.email || "******@example.com"} | {basics?.phone || "(555) ---------"}
                        </Typography>
                        <Typography className={styles.basic_item}>
                            {basics?.location?.city || "---------"}, {basics?.location?.region || "----------"} {basics?.location?.postalCode || "*******"}
                        </Typography>
                        <Typography className={styles.basic_item}>
                            {basics?.location?.countryCode || "Country"}
                        </Typography>
                    </Box>
                </Box>


                {/* Summary */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Summary
                    </Typography>
                    <Typography className={styles.section_text}>
                        {basics?.summary || "Professional summary goes here..."}
                    </Typography>
                </Box>


                {/* Work Experience */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Work Experience
                    </Typography>

                    {work && work.length > 0 ? work.map((job: any, i: number) => (
                        <Box key={i} className={styles.item_block}>
                            <Typography className={styles.item_title}>
                                {job.position || "Position"} — {job.name || "Company"}
                            </Typography>
                            <Typography className={styles.item_date}>
                                {job.startDate || "Start"} - {job.endDate || "Present"}
                            </Typography>
                            <Typography className={styles.section_text}>
                                {job.url}
                            </Typography>
                        </Box>

                    )) : <Typography>No experience listed.</Typography>}
                </Box>


                {/* Skills */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Skills
                    </Typography>
                    {skills && skills.length > 0 ? skills.map((s: any, i: number) => (
                        <Typography key={i} className={styles.skill_item}>
                            {s.name} — {s.level}
                        </Typography>
                    )) : <Typography>No skills listed.</Typography>}

                </Box>


                {/* Education */}
                <Box className={styles.section_block}>
                    <Typography className={styles.section_title}>
                        Education
                    </Typography>

                    {education && education.length > 0 ? education.map((edu: any, i: number) => (
                        <Box key={i} className={styles.item_block}>
                            <Typography className={styles.item_title}>
                                {edu.institution || "Institution"}
                            </Typography>
                            <Typography className={styles.section_text}>
                                {edu.studyType} in {edu.area}
                            </Typography>
                            <Typography className={styles.item_date}>
                                {edu.startDate} - {edu.endDate || "Present"}
                            </Typography>
                            <Typography className={styles.section_text}>
                                Score: {edu.score || "N/A"}
                            </Typography>
                        </Box>
                    )) : <Typography>No education listed.</Typography>}
                </Box>
            </Box>
            <Fab
                onClick={handlePrint}
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16
                }}
            >
                <LocalPrintshopIcon />
            </Fab>
            <Fab
                onClick={handleDownload}
                color="primary"
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 80
                }}
            >
                <DownloadForOfflineIcon />
            </Fab>
        </Box>
    )
}
