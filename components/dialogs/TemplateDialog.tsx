"use client";
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, TextareaAutosize, TextField } from "@mui/material"
import "./TemplateDialog.css"
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import CheckboxList from "../molecules/CheckboxList";

export const TemplateDialog:any = (props:any) => {
    const {open, handleClose, onDialogUseTemplate} = props;
    const [compliances, setCompliances] = useState([]);

    const [complianceText, setComplianceText] = useState<string>("");
    const [selectedCompliances, setSelectedCompliances] = useState("");

    const textValue = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    
    const onCheckboxClick = (compliance: any) => {
        setSelectedCompliances(compliance?._id);
        setComplianceText(compliance?.text);
    }

    const getCompliances = async () => {
        const userInfo : any = localStorage.getItem('userInfo');
        const token = JSON.parse(userInfo)?.access_token;
        try {
            const res = await axios.get(`${baseUrl}/compliances`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res?.data) {
                let { data } = res.data;
                setCompliances(data?.my)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCompliances();
    }, [])

    return(
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="md"
            className="template-dialog"
        >
            <DialogTitle sx={{fontWeight: '600', fontSize: '22px', paddingBottom: 0}}>Use a template</DialogTitle>
            <DialogContent sx={{width: '375px !important'}}>
                <p className="template-dialog-label">Compliances</p>
                {compliances.length>0 && (
                    <CheckboxList items={compliances} header="" onCheckboxClick={onCheckboxClick} selectedCompliances={selectedCompliances}/>
                )}

                <p className="template-dialog-label">Compliance text</p>
  
                <TextField sx={{width: '100%', borderRadius: '0 !important'}} multiline rows={3} value={complianceText} disabled/>
          
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => onDialogUseTemplate(complianceText)} sx={{marginBottom: '1rem', marginLeft: '1rem', marginRight: 'auto'}}>Use Template</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}