"use client";
import React, { useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import './NewApiDialog.css';

export const NewApiDialog = (props: any) => {
    const {open, handleClose, newApiKey, newKeyName="api_key"} = props;

    const downloadKey = () => {
        const element = document.createElement("a");
        const file = new Blob([newApiKey], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = newKeyName+".txt";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const onClickCopy = () => {
        navigator.clipboard.writeText(newApiKey);
    }

    useEffect(() => {
        console.log(newApiKey);
    }, [newApiKey, open])
    
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            className="create-api-dialog"
        >
            <DialogTitle sx={{fontWeight: '600', fontSize: '22px'}}>New Api Key</DialogTitle>
            <DialogContent>
                <InputLabel sx={{fontSize: '.8rem'}}>API Key</InputLabel>
                <OutlinedInput 
                    sx={{borderRadius: 0, width: '100%', marginTop: '5px'}} 
                    value={newApiKey} size="small" 
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => onClickCopy()}
                                edge="end"
                            >
                                <ContentCopyIcon/>
                            </IconButton>
                        </InputAdornment>
                      }
                />
                <p style={{marginTop: '8px'}}>This key will be visible only once. Please make sure to copy or download it</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Close
                </Button>
                <Button onClick={() => downloadKey()} color="primary">
                    Download
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewApiDialog;