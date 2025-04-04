"use client";
import { NumberCard } from "@/components/atoms/NumberCard";
import baseUrl from "@/utils/baseUrl";
import { Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material"
import { PieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";

export const ResultsDialog = (props : any) => {
    const {open, onClose, resultData, onClickDownloadReport} = props;
    const [data, setData] = useState<any>(null);

    const getData = async() => {
        try {
            const userInfo : any = localStorage.getItem("userInfo");
            const token = JSON.parse(userInfo)?.access_token;
            const res : any = await axios.get(`${baseUrl}/api-service/guardrail/eval/${resultData._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(res?.data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(resultData.status === 'finished') {
            setData(resultData);
        } else {
            if(resultData._id) {
                const intervalId = setInterval(() => {
                    getData();
                }, 3000);

                return () => clearInterval(intervalId);
            }
        }
    }, [resultData]);

    useEffect(() => {
        console.log('d', data)
    }, [data])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            className="create-api-dialog"
        >
            <DialogTitle sx={{fontWeight: '600', fontSize: '22px', width: '320px'}}>Results</DialogTitle>
            <DialogContent sx={{paddingBottom: '0.5rem'}}>
                <Box>
                    <Card 
                    sx={{borderRadius: '0', border: '1px solid #dbd9d9', textAlign: 'center'}}
                    >
                        <Typography sx={{fontSize: '14px', fontWeight: '300', marginTop: '.5rem', marginBottom: '.25rem'}}>Total Records</Typography>
                        <Typography sx={{fontSize: '22px', fontWeight: '500', marginTop: '.25rem', marginBottom: '.5rem'}}>{data?.recordsCount}</Typography>
                    </Card>
                </Box>
                <Box sx={{display: "flex", marginTop: '1rem'}}>
                    <Box sx={{flex: 1, paddingRight: '0.25rem'}}>
                        <NumberCard title="Processed" data={data?.result?.processed}/>
                    </Box>
                    <Box sx={{flex : 1, paddingLeft: '0.25rem'}}>
                        <NumberCard title="Failed" data={data?.result?.failed}/>
                    </Box>
                </Box>
                <Box sx={{display: "flex", marginTop: '1rem'}}>
                    <Box sx={{flex: 1, paddingRight: '0.25rem'}}>
                        <NumberCard title="Matched" data={data?.result?.matched}/>
                    </Box>
                    <Box sx={{flex : 1, paddingLeft: '0.25rem'}}>
                        <NumberCard title="Unmatched" data={data?.result?.unmatched}/>
                    </Box>
                </Box>
                <Box sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <PieChart
                        series={[
                            {
                            data: [
                                {value : data?.result?.matched / data?.recordsCount * 100, label: "Matched", color : 'green'},
                                {value : data?.result?.unmatched / data?.recordsCount * 100, label: "Unmatched", color : 'red'},
                                {value : (data?.recordsCount - data?.result?.processed) / data?.recordsCount * 100, label: "Processing", color : 'grey'},
                            ],
                            innerRadius: 60,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            cx: 150,
                            cy: 150,
                            }
                        ]}
                        width={400}
                        height={275}
                    />
                    <Box sx={{position: 'absolute', textAlign: 'center', paddingRight: '5rem', paddingTop: '1.5rem'}}>
                        <Typography variant="h6" component="div">
                            {((data?.result?.matched/data?.result?.processed)*100).toFixed(2)}%
                        </Typography>
                        <Typography variant="body2" component="div" sx={{paddingRight: '0.5rem'}}>
                            Accuracy
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography sx={{fontSize: '16px', fontWeight: '500', marginTop: '1rem', marginBottom: '.25rem'}}>Compliance Text</Typography>
                    <TextField disabled sx={{width: '100%', borderRadius: '5px !important'}} multiline value={resultData?.data?.compliance || 'None provided'}/>
                </Box>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                <Button variant="outlined" sx={{marginLeft: '1rem', borderRadius: '1rem'}} onClick={() => onClickDownloadReport()}>Download Report</Button>
                <Button color="error" sx={{marginRight: '1rem'}} onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}