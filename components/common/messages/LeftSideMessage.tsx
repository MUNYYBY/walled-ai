import { Box, Button, Card, CardContent, IconButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function LeftSideMessage(props : any) {
    const { message, isComply } = props.message;
    return (
        <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'end'}} id="message-id">
            <Card sx={{backgroundColor: '#EDEDED', color: '#000', padding: '0.5rem', borderRadius: '0.5rem', marginTop: '0.5rem', width: '55%'}}>
                <CardContent>
                    <span>{message}</span>
                </CardContent>
            </Card>
            <Box sx={{display: 'flex', marginLeft: '0.75rem', justifyContent: 'center'}}>
                {isComply ? (
                    <Button variant="outlined" color="success" size="small">
                        <CheckIcon /> Complying
                    </Button>
                ) : (
                    <Button variant="outlined" color="error" size="small">
                        <ClearIcon /> Not complying
                    </Button>
                )}
            </Box>
        </Box>
    )
}