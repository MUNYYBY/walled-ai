"use client";

import { useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField } from "@mui/material";
import { DropzoneArea } from "mui-file-dropzone";
import CloseIcon from '@mui/icons-material/Close';

import "./CreateJob.css"

export const CreateJobDialog = (props: any) => {
    const {isOpen, handleClose} = props;
    const steps = ['Enter Name', 'Upload File', 'Select Api'];
    const [activeStep, setActiveStep] = useState(0);

    return(
        <Dialog open={isOpen} onClose={handleClose}>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginRight: '1rem'}}>
                <DialogTitle>Create Job</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        width: '2rem',
                        height: '2rem',
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent sx={{width: '450px'}}>
                <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
                </Stepper>
                <div className="create-job-container">
                    <Box sx={{marginTop: '2.5rem'}}>
                        {activeStep === 0 && (
                            <>
                                <InputLabel>Enter job name</InputLabel>
                                <TextField fullWidth variant="outlined" sx={{marginTop: '0.5rem', padding: 0}}/>
                            </>
                        )}
                        {activeStep === 1 && (
                            <div className="dropzone-container">
                                <DropzoneArea fileObjects={<></>}/>
                            </div>
                        )}
                        {activeStep === 2 && (
                            <>
                                <InputLabel>Select API</InputLabel>
                                <Select fullWidth sx={{marginTop: '0.5rem', padding: 0, borderRadius: '5rem'}}>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                </Select>
                            </>
                        )}
                        <Box sx={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem'}}>
                            {activeStep !== 0 && (
                                <Button variant="outlined" sx={{ marginTop: '1rem', borderRadius: '5rem', boxShadow: 'none', float: 'right' }} onClick={() => setActiveStep(activeStep - 1)}>Previous</Button>
                            )}
                            {activeStep === 0 && (<div></div>)}
                            {activeStep === steps.length - 1 ? (
                                <Button variant="contained" sx={{ marginTop: '1rem', borderRadius: '5rem', boxShadow: 'none'}} onClick={() => {}}>Create</Button>
                            ) : (
                                <Button variant="contained" sx={{ marginTop: '1rem', borderRadius: '5rem', boxShadow: 'none'}} onClick={() => setActiveStep(activeStep + 1)}>Next</Button>
                            )}
                        </Box>
                    </Box>
                </div>
            </DialogContent>
        </Dialog>
    )
}