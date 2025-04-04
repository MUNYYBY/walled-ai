"use client";
import { useEffect, useState } from "react";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from "@mui/material"
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { toast } from "react-hot-toast";
import { title } from "process";

export const EditComplianceDialog = ({open, onClose, complianceText, apiKey, apiTitle, setComplianceText}: any) => {
    const [complianceTextInput, setComplianceTextInput] = useState("");

    const onUpdateApi = async (event : any) => {
        event.preventDefault();
        const userInfo : any = localStorage.getItem('userInfo');
        const token = JSON.parse(userInfo)?.access_token;
        const res = await axios.post(`${baseUrl}/api-key/update`, {
            apiID: apiKey.split(".")[0],
            title: apiTitle,
            data : {
                compliance : complianceTextInput
            }
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(res.status == 200) {
            toast.success("Compliance text updated successfully");
            setComplianceText(complianceTextInput);
            updateLocalStorage();
            onClose();
        }
    }

    const updateLocalStorage = () => {
        let apiData : any = JSON.parse(localStorage.getItem('guardrails-api') as string);
        apiData.data.compliance = complianceTextInput;
        localStorage.setItem('guardrails-api', JSON.stringify(apiData));
    }

    useEffect(() => {
        setComplianceTextInput(complianceText);
    }, [complianceText]);

    return (
        <Dialog open={open} onClose={onClose} className="edit-compliance-dialog" maxWidth="sm" fullWidth>
            <DialogTitle>Edit Compliance Template</DialogTitle>
            <form onSubmit={onUpdateApi}>
                <DialogContent>
                        <Alert severity="warning" sx={{marginBottom: '10px'}}>Editing the compliance template will make these changes on API level.</Alert>
                        <InputLabel sx={{marginBottom: '5px'}}>Compliance text</InputLabel>
                        <TextField multiline rows={3} value={complianceTextInput} onChange={(e) => setComplianceTextInput(e?.target?.value)} sx={{width: '100%'}}/>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error">Close</Button>
                    <Button type="submit" color="primary">Save</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}