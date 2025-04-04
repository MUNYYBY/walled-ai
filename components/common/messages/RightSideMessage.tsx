import { Box, Avatar, Card, CardContent } from "@mui/material";

export default function RightSideMessage() {
    return (
        <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end'}}>
            <Card sx={{backgroundColor: '#12ADD11F', color: '#000', padding: '0.5rem', borderRadius: '0.5rem', marginTop: '0.5rem', width: '55%'}}>
                <CardContent>
                    <span>Hey doing good</span>
                </CardContent>
            </Card>
            <Avatar sx={{width: '40px', height: '40px', backgroundColor: '#EDEDED', color: '#000', fontSize: '14px', marginLeft: '1rem'}}>A</Avatar>
        </Box>
    )
}