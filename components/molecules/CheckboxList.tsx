import { Box, Checkbox, InputLabel } from "@mui/material";
import React from "react";

const CheckboxList = ({ items, header, onCheckboxClick, selectedCompliances }: { items: any[], header: string, onCheckboxClick: (text: string) => void, selectedCompliances: string }) => {
    return (
        <>
            <InputLabel className="label">{header}</InputLabel>
            <Box sx={{height: '145px', overflowY: 'auto'}}>
                {items.map((item: any) => {
                    return(
                        <Box sx={{display: 'flex', alignItems: 'center'}} key={item?._id}>
                            <Checkbox sx={{marginLeft: 0, paddingLeft: 0}} checked={selectedCompliances==item?._id} onClick={() => onCheckboxClick(item)}/> <p style={{paddingTop: '5px'}}>{item?.title}</p>
                        </Box>
                    )}
                )}
            </Box>
        </>
    );
}

export default CheckboxList;