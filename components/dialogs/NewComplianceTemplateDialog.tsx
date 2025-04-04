"use client";
import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, InputLabel, TextField } from "@mui/material"
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { toast } from "react-hot-toast";

import './NewComplianceTemplateDialog.css';

export const NewComplianceTemplateDialog = (props: any) => {
    const {open, handleClose, complianceText} = props;
    const [complianceTitle, setComplianceTitle] = useState('');

    const onCreaateTemplate = async (event: any) => {
        event.preventDefault();
        try {
            const userInfo : any = localStorage.getItem('userInfo');
            const token = JSON.parse(userInfo)?.access_token;
            const res : any = await axios.post(`${baseUrl}/compliances/create`, {
                title: complianceTitle,
                text: complianceText
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(res);
            if(res.status === 200) {
                toast.success('Compliance template created successfully');
                handleClose();
            }
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            className="new-template-dialog"
        >
            <DialogTitle sx={{fontWeight: '600', fontSize: '22px', paddingBottom: 0}}>Creating New Compliance Template</DialogTitle>
            <form onSubmit={(e) => onCreaateTemplate(e)}>
                <DialogContent sx={{paddingTop: 0}}>
                    <InputLabel className="label-title" sx={{marginTop:'8px'}}>Enter compliance title</InputLabel>
                    <TextField size="small" sx={{width: '100%'}} value={complianceTitle} onChange={(e) => setComplianceTitle(e.target.value)}/>
                    <InputLabel className="label-title" sx={{marginTop:'8px'}}>Compliance text</InputLabel>
                    <TextField size="small" sx={{width: '100%'}} value={complianceText} multiline rows={3} disabled/>
                    <Button type="submit" sx={{float: 'right', borderRadius: '10px', fontSize: '14px', marginTop: '1rem'}}>
                        Save
                    </Button>
                </DialogContent>
            </form>
        </Dialog>
    )
}