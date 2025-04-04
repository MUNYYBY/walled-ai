"use client";
import { useEffect, useState } from "react";
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { NumberCard } from "@/components/atoms/NumberCard";
import { PieChart } from "@mui/x-charts";

export const ApiStatsDialog = (props : any) => {
    const {open, onClose, selectedApiId} = props;
    const [apiData, setApiData] = useState<any>([]);
    console.log(selectedApiId)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo : any = localStorage.getItem('userInfo');
                const token = JSON.parse(userInfo)?.access_token;
                const { data } = await axios.get(`${baseUrl}/api-usage?service=guardrail&from=2024-01-01T00%3A00%3A00.000Z&to=2024-12-31T23%3A59%3A59.999Z&apiKeyID=${selectedApiId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setApiData(data?.data);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [selectedApiId])
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            className="create-api-dialog"
        >
            <DialogTitle sx={{fontWeight: '600', fontSize: '22px', width: '350px'}}>Results</DialogTitle>
            <DialogContent sx={{paddingBottom: '0.5rem'}}>
                <Box>
                    <Card
                    sx={{borderRadius: '0', border: '1px solid #dbd9d9', textAlign: 'center'}}
                    >
                        <Typography sx={{fontSize: '14px', fontWeight: '300', marginTop: '.5rem', marginBottom: '.25rem'}}>Total Records</Typography>
                        <Typography sx={{fontSize: '22px', fontWeight: '500', marginTop: '.25rem', marginBottom: '.5rem'}}>{apiData?.totalRecords}</Typography>
                    </Card>
                    <Card
                    sx={{borderRadius: '0', border: '1px solid #dbd9d9', textAlign: 'center'}}
                    >
                        <Typography sx={{fontSize: '14px', fontWeight: '300', marginTop: '.5rem', marginBottom: '.25rem'}}>Credits Utilized</Typography>
                        <Typography sx={{fontSize: '22px', fontWeight: '500', marginTop: '.25rem', marginBottom: '.5rem'}}>$ {(apiData?.creditsUtilized)}</Typography>
                    </Card>
                </Box>
                <Box sx={{display: "flex", marginTop: '1rem'}}>
                    <Box sx={{flex: 1, paddingRight: '0.25rem'}}>
                        <NumberCard title="Tokens Processed" data={apiData?.tokensProcessed}/>
                    </Box>
                    <Box sx={{flex : 1, paddingLeft: '0.25rem'}}>
                        <NumberCard title="Docs Processed" data={apiData?.docsProcessed}/>
                    </Box>
                </Box>
                <Box sx={{display: "flex", marginTop: '1rem'}}>
                    <Box sx={{flex: 1, paddingRight: '0.25rem'}}>
                        <NumberCard title="Complied" data={apiData?.complied}/>
                    </Box>
                    <Box sx={{flex : 1, paddingLeft: '0.25rem'}}>
                        <NumberCard title="Not Complied" data={apiData?.notComplied}/>
                    </Box>
                </Box>
                <Box sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {apiData?.totalRecords > 0 ? (
                        <PieChart
                            series={[
                                {
                                data: [
                                    {value : apiData?.complied / apiData?.totalRecords * 100, label: "Complied", color : 'green'},
                                    {value : apiData?.notComplied / apiData?.totalRecords * 100, label: "Not Complied", color : 'red'},
                                ],
                                innerRadius: 40,
                                outerRadius: 80,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                cx: 150,
                                cy: 150,
                                }
                            ]}
                            width={400}
                            height={275}
                        />
                    ) : (
                        <Typography sx={{fontSize: '14px', fontWeight: '300', marginTop: '3rem'}}>No charts data available</Typography>
                    )}
                </Box>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'end', marginBottom: '0.5rem'}}>
                <Button color="error" sx={{marginRight: '1rem'}} onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}