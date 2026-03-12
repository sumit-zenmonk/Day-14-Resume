"use client";

import styles from "./resume_form_comp.module.css";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResumeSchema, ResumeSchemaType } from "@/types/resume";
import { Box, Button, Fab, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { AddContent, selectContentByMobile } from "@/redux/feature/usersContent/allContentSlice";
import { resetCurrLogin } from "@/redux/feature/curr_login/currLoginSlice";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TemplateModal from "@/component/template_modal/template_modal";
import { useEffect, useState } from "react";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { selectCurrTemplate } from "@/redux/feature/selected_template/selected_template";
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { enqueueSnackbar } from "notistack";
import BasicTemplateComp from "../(templates)/resume/v1/page";
import PremiumTemplateComp from "../(templates)/resume/v2/page";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ResumeForm() {
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ResumeSchemaType>({
        resolver: zodResolver(ResumeSchema),
        defaultValues: {
            basics: {
                name: "",
                image: "",
                email: "",
                phone: "",
                summary: "",
                location: {
                    address: "",
                    postalCode: "",
                    city: "",
                    countryCode: "",
                    region: "",
                },
            },
            work: [
                {
                    name: "",
                    position: "",
                    url: "",
                    startDate: "",
                    endDate: "",
                }
            ],
            education: [{
                institution: "",
                url: "",
                area: "",
                studyType: "",
                startDate: "",
                endDate: "",
                score: "",
            }
            ],
            skills: [{
                name: "",
                level: "",
            }],
        },
    });
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.CurrLoginReducer)
    const template_id = useSelector((state: RootState) => state.CurrSelectedTemplate.template_id)
    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);
    const [resumeModelOpen, setResumeModelOpen] = useState<boolean>(false);

    // if already present data
    const userData = useSelector((state: RootState) => selectContentByMobile(state, user.mobile_no, template_id))

    const {
        fields: workFields,
        append: addWork,
        remove: removeWork,
    } = useFieldArray({
        control,
        name: "work",
    });

    const {
        fields: educationFields,
        append: addEducation,
        remove: removeEducation,
    } = useFieldArray({
        control,
        name: "education",
    });

    const {
        fields: skillFields,
        append: addSkill,
        remove: removeSkill,
    } = useFieldArray({
        control,
        name: "skills",
    });

    const onSubmit = async (data: ResumeSchemaType) => {
        await dispatch(AddContent({ mobile_no: user.mobile_no, content_data: data, template_id: template_id }))
        router.push(`/resume/v${template_id}`)
    };

    const handleLogOut = async () => {
        await dispatch(resetCurrLogin())
        Cookies.remove("phone_no");
        router.replace("/login")
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleResumeModalOpen = () => setResumeModelOpen(true);
    const handleResumeModalClose = () => setResumeModelOpen(false);

    const handleSelection = async (id: number) => {
        await dispatch(selectCurrTemplate({ template_id: id }));
        setOpen(false);
    }
    const formData = watch();

    useEffect(() => {
        if (userData?.content_data) {
            reset(userData.content_data);
        }
    }, [userData?.content_data, reset, template_id]);

    return (
        <Box className={styles.container}>

            <Modal
                open={resumeModelOpen}
                onClose={handleResumeModalClose}
                className={styles.modal}
            >
                <Box className={styles.modalBox}>
                    {template_id == 1 ?
                        <BasicTemplateComp propData={formData} />
                        :
                        <PremiumTemplateComp propData={formData} />}
                </Box>
            </Modal>

            <Box className={styles.header}>
                <Typography variant="h5" className={styles.title}>
                    Resume Builder
                </Typography>
                <Button color="error" onClick={() => handleLogOut()} className={styles.lgtbtn}>
                    Log Out
                </Button>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                {/* BASIC INFO */}

                <Typography className={styles.sectionTitle}>
                    Basic Information
                </Typography>

                <Box className={styles.row}>
                    <TextField
                        label="Name"
                        className={styles.input}
                        {...register("basics.name")}
                        error={!!errors?.basics?.name}
                        helperText={errors?.basics?.name?.message}
                    />

                    <TextField
                        label="Email"
                        className={styles.input}
                        {...register("basics.email")}
                        error={!!errors?.basics?.email}
                        helperText={errors?.basics?.email?.message}
                    />
                </Box>

                <Box className={styles.row}>
                    {/* <TextField
                        label="Phone"
                        className={styles.input}
                        {...register("basics.phone")}
                        error={!!errors?.basics?.phone}
                        helperText={errors?.basics?.phone?.message}
                    /> */}
                    <Controller
                        name="basics.phone"
                        control={control}
                        rules={{
                            validate: (value) => matchIsValidTel(value) || "Invalid phone number"
                        }}
                        render={({ field, fieldState }) => (
                            <MuiTelInput
                                {...field}
                                label="Phone"
                                defaultCountry="IN"
                                fullWidth
                                className={styles.input}
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />

                    <TextField
                        type="file"
                        className={styles.input}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setValue("basics.image", file.name, { shouldValidate: true });
                            }
                        }}
                        error={!!errors?.basics?.image}
                        helperText={errors?.basics?.image?.message as string}
                    />
                </Box>

                <TextField
                    label="Summary"
                    multiline
                    rows={3}
                    className={styles.fullInput}
                    {...register("basics.summary")}
                    error={!!errors?.basics?.summary}
                    helperText={errors?.basics?.summary?.message}
                />

                {/* LOCATION */}

                <Typography className={styles.sectionTitle}>Location</Typography>

                <Box className={styles.row}>
                    <TextField
                        label="Address"
                        className={styles.input}
                        {...register("basics.location.address")}
                        error={!!errors?.basics?.location?.address}
                        helperText={errors?.basics?.location?.address?.message}
                    />

                    <TextField
                        label="City"
                        className={styles.input}
                        {...register("basics.location.city")}
                        error={!!errors?.basics?.location?.city}
                        helperText={errors?.basics?.location?.city?.message}
                    />
                </Box>

                <Box className={styles.row}>
                    <TextField
                        label="Region"
                        className={styles.input}
                        {...register("basics.location.region")}
                        error={!!errors?.basics?.location?.region}
                        helperText={errors?.basics?.location?.region?.message}
                    />

                    <TextField
                        label="Postal Code"
                        className={styles.input}
                        {...register("basics.location.postalCode")}
                        error={!!errors?.basics?.location?.postalCode}
                        helperText={errors?.basics?.location?.postalCode?.message}
                    />

                    <TextField
                        label="Country Code"
                        className={styles.input}
                        {...register("basics.location.countryCode")}
                        error={!!errors?.basics?.location?.countryCode}
                        helperText={errors?.basics?.location?.countryCode?.message}
                    />
                </Box>

                {/* WORK EXPERIENCE */}

                <Typography className={styles.sectionTitle}>
                    Work Experience
                </Typography>

                {workFields.map((item, index) => (
                    <Box key={item.id} className={styles.block}>
                        <Box className={styles.row}>
                            <TextField
                                label="Company"
                                className={styles.input}
                                {...register(`work.${index}.name` as const)}
                                error={!!errors?.work?.[index]?.name}
                                helperText={errors?.work?.[index]?.name?.message}
                            />

                            <TextField
                                label="Position"
                                className={styles.input}
                                {...register(`work.${index}.position` as const)}
                                error={!!errors?.work?.[index]?.position}
                                helperText={errors?.work?.[index]?.position?.message}
                            />
                        </Box>

                        <Box className={styles.row}>
                            <TextField
                                label="Company URL"
                                className={styles.input}
                                {...register(`work.${index}.url` as const)}
                                error={!!errors?.work?.[index]?.url}
                                helperText={errors?.work?.[index]?.url?.message}
                            />

                            <TextField
                                type="date"
                                className={styles.input}
                                {...register(`work.${index}.startDate` as const)}
                                error={!!errors?.work?.[index]?.startDate}
                                helperText={errors?.work?.[index]?.startDate?.message}
                            />

                            <TextField
                                type="date"
                                className={styles.input}
                                {...register(`work.${index}.endDate` as const)}
                                error={!!errors?.work?.[index]?.endDate}
                                helperText={errors?.work?.[index]?.endDate?.message}
                            />
                        </Box>

                        <Button className={styles.formRemovetn} onClick={() => removeWork(index)}>
                            <DeleteForeverIcon />
                        </Button>
                    </Box>
                ))}

                <Button
                    className={styles.fromAddbtn}
                    onClick={() =>
                        addWork({
                            name: "",
                            position: "",
                            url: "",
                            startDate: "",
                            endDate: null,
                        })
                    }
                >
                    Add Work
                </Button>

                {/* EDUCATION */}

                <Typography className={styles.sectionTitle}>
                    Education
                </Typography>

                {educationFields.map((item, index) => (
                    <Box key={item.id} className={styles.block}>
                        <Box className={styles.row}>
                            <TextField
                                label="Institution"
                                className={styles.input}
                                {...register(`education.${index}.institution` as const)}
                                error={!!errors?.education?.[index]?.institution}
                                helperText={
                                    errors?.education?.[index]?.institution?.message
                                }
                            />

                            <TextField
                                label="Degree"
                                className={styles.input}
                                {...register(`education.${index}.studyType` as const)}
                                error={!!errors?.education?.[index]?.studyType}
                                helperText={
                                    errors?.education?.[index]?.studyType?.message
                                }
                            />
                        </Box>

                        <Box className={styles.row}>
                            <TextField
                                label="Field of Study"
                                className={styles.input}
                                {...register(`education.${index}.area` as const)}
                                error={!!errors?.education?.[index]?.area}
                                helperText={
                                    errors?.education?.[index]?.area?.message
                                }
                            />

                            <TextField
                                label="Score"
                                className={styles.input}
                                {...register(`education.${index}.score` as const)}
                                error={!!errors?.education?.[index]?.score}
                                helperText={
                                    errors?.education?.[index]?.score?.message
                                }
                            />
                        </Box>

                        <Box className={styles.row}>
                            <TextField
                                label="Institution URL"
                                className={styles.input}
                                {...register(`education.${index}.url` as const)}
                                error={!!errors?.education?.[index]?.url}
                                helperText={
                                    errors?.education?.[index]?.url?.message
                                }
                            />

                            <TextField
                                type="date"
                                className={styles.input}
                                {...register(`education.${index}.startDate` as const)}
                                error={!!errors?.education?.[index]?.startDate}
                                helperText={
                                    errors?.education?.[index]?.startDate?.message
                                }
                            />

                            <TextField
                                type="date"
                                className={styles.input}
                                {...register(`education.${index}.endDate` as const)}
                                error={!!errors?.education?.[index]?.endDate}
                                helperText={
                                    errors?.education?.[index]?.endDate?.message
                                }
                            />
                        </Box>

                        <Button className={styles.formRemovetn} onClick={() => removeEducation(index)}>
                            <DeleteForeverIcon />
                        </Button>
                    </Box>
                ))}

                <Button
                    className={styles.fromAddbtn}
                    onClick={() =>
                        addEducation({
                            institution: "",
                            url: "",
                            area: "",
                            studyType: "",
                            startDate: "",
                            endDate: null,
                            score: "",
                        })
                    }
                >
                    Add Education
                </Button>

                {/* SKILLS */}

                <Typography className={styles.sectionTitle}>Skills</Typography>

                {skillFields.map((item, index) => (
                    <Box key={item.id} className={styles.block}>
                        <Box className={styles.row}>
                            <TextField
                                label="Skill"
                                className={styles.input}
                                {...register(`skills.${index}.name` as const)}
                                error={!!errors?.skills?.[index]?.name}
                                helperText={
                                    errors?.skills?.[index]?.name?.message
                                }
                            />

                            <TextField
                                label="Level"
                                className={styles.input}
                                {...register(`skills.${index}.level` as const)}
                                error={!!errors?.skills?.[index]?.level}
                                helperText={
                                    errors?.skills?.[index]?.level?.message
                                }
                            />
                        </Box>

                        <Button className={styles.formRemovetn} onClick={() => removeSkill(index)}>
                            <DeleteForeverIcon />
                        </Button>
                    </Box>
                ))}

                <Button
                    className={styles.fromAddbtn}
                    onClick={() =>
                        addSkill({
                            name: "",
                            level: "",
                        })
                    }
                >
                    Add Skill
                </Button>

                <TemplateModal
                    open={open}
                    handleClose={handleClose}
                    onSelect={handleSelection}
                // onPreview={(id) => router.push(`/resume/v${id}`)}
                />
                <Box className={styles.submitBox}>
                    <Button onClick={handleOpen}>
                        <ChangeCircleIcon />
                    </Button>

                    <Button onClick={handleResumeModalOpen}>
                        <VisibilityIcon />
                    </Button>

                    <Button
                        type="submit"
                    >
                        <SaveIcon />
                    </Button>
                </Box>
            </form>
        </Box >
    );
}