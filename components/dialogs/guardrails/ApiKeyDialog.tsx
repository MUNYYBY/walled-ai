"use client";
import { useState } from "react";
import { Button, Dialog, DialogContent, InputLabel, TextField } from "@mui/material"
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { toast } from "react-hot-toast";

export const ApiKeyDialog = (props: any) => {
    const {open, handleClose, setParentApiKey, setApiTitle, setComplianceText} = props;
    const [apiKey, setApiKey] = useState<string>("");

    const onSetApiKey = async (event: any) => {
        event.preventDefault();
        if(apiKey == "") {
            toast.error("Please enter a valid API Key");
            return;
        }
        const userInfo : any = localStorage.getItem('userInfo');
        const token = JSON.parse(userInfo)?.access_token;
        const res : any = await axios.get(`${baseUrl}/api-key/info/${apiKey}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(res?.data?.data?.service);
        if(res?.status == 200) {
            if(res?.data?.data?.service == 'pii') {
                res.data.data.api_key = apiKey;
                localStorage.setItem('pii-api', JSON.stringify(res?.data?.data));
                setApiTitle(res?.data?.data?.title);
                setParentApiKey(apiKey);
                toast.success("API Key validated successfully");
            } else {
                res.data.data.api_key = apiKey;
                localStorage.setItem('guardrails-api', JSON.stringify(res?.data?.data));
                setApiTitle(res?.data?.data?.title);
                setParentApiKey(apiKey);
                setComplianceText(res?.data?.data?.data?.compliance);
                toast.success("API Key validated successfully");
            }
            handleClose();
        } else {
            toast.error("Invalid API Key");
        }
    }

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="xs"
            fullWidth
        >
            <DialogContent>
            <form onSubmit={(e) => onSetApiKey(e)}>
                <InputLabel className="label-title" sx={{marginTop:'8px', marginBottom: '4px'}}>Enter API Key</InputLabel>
                <TextField size="small" fullWidth value={apiKey} onChange={(e) => setApiKey(e.target.value)} sx={{borderRadius: '10px !important'}}/>
                <Button type="submit" sx={{marginTop: '1rem', float: 'right'}}>Validate</Button>
            </form>
            </DialogContent>
        </Dialog>
    )
}