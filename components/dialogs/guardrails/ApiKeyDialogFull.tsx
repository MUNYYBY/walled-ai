"use client";
import { useState } from "react";
import { Box, Button, Dialog, DialogContent, InputLabel, TextField, Typography } from "@mui/material"
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { toast } from "react-hot-toast";
import { CreateApiDialog } from "../CreateApiDialog";
import NewApiDialog from "../NewApiDialog";

export const ApiKeyDialogFull = (props: any) => {
    const {open, handleClose, setParentApiKey, setApiTitle, setComplianceText,selectedService,selectedMultiple,optionArray} = props;
    const [apiKey, setApiKey] = useState<string>("");

    const [isOpenCreateApiDialog, setIsOpenCreateApiDialog] = useState(false);
    const [isOpenNewApiDialog, setIsOpenNewApiDialog] = useState(false);
    const [newKeyName, setNewKeyName] = useState('');
console.log("newKeyName====",newKeyName)
    const onSetApiKey = async (event: any) => {
        event.preventDefault();
        const userInfo : any = localStorage.getItem('userInfo');
        const token = JSON.parse(userInfo)?.access_token;
        const res : any = await axios.get(`${baseUrl}/api-key/info/${apiKey}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if(res?.status == 200) {
            res.data.data.api_key = apiKey;
            localStorage.setItem('guardrails-api', JSON.stringify(res?.data?.data));
            setApiTitle(res?.data?.data?.title);
            setParentApiKey(apiKey);
            setComplianceText(res?.data?.data?.data?.compliance);
            toast.success("API Key validated successfully");
            handleClose();
        }
    }

    const setNewApiKey = (key: string) => {
        setIsOpenNewApiDialog(true);
        setApiKey(key);
    }


    return(
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                className="create-api-dialog"
            >
                <DialogContent>
                <form onSubmit={(e) => onSetApiKey(e)}>
                    <InputLabel className="label-title" sx={{marginTop:'8px', marginBottom: '4px'}}>Enter API Key</InputLabel>
                    <TextField size="small" fullWidth value={apiKey} onChange={(e) => setApiKey(e.target.value)}/>
                    <Typography variant="caption" sx={{marginTop: '14px', fontSize: '14px'}}><a onClick={() => setIsOpenCreateApiDialog(true)}>Click here</a> to create a new api key</Typography>
                    {/* <Box sx={{display: 'flex', justifyContent: 'space-between'}}> */}
                    <Box>
                        {/* <Button type="submit" sx={{marginTop: '1rem', float: 'right'}}>Create a new API Key</Button> */}
                        <Button type="submit" sx={{marginTop: '1rem', float: 'right'}}>Validate</Button>
                    </Box>
                </form>
                </DialogContent>
            </Dialog>
            <NewApiDialog open={isOpenNewApiDialog} handleClose={() => setIsOpenNewApiDialog(false)} newApiKey={apiKey} newKeyName={newKeyName}   />
            <CreateApiDialog open={isOpenCreateApiDialog} handleClose={() => setIsOpenCreateApiDialog(false)} setNewApiKey={setNewApiKey} setNewKeyName={setNewKeyName} selectedService={selectedService} selectedMultiple={selectedMultiple} optionArray={optionArray} />
        </>
    )
}