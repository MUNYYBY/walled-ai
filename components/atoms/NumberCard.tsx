import { Box, Card, Typography } from "@mui/material"

export const NumberCard = (props:any) => {
    const {title, data} = props;
    return (
        <Box>
            <Card
            sx={{borderRadius: '4px', border: '1px solid #dbd9d9', textAlign: 'center'}}
            >
                <Typography sx={{fontSize: '14px', fontWeight: '300', marginTop: '.5rem', marginBottom: '.25rem'}}>{title}</Typography>
                <Typography sx={{fontSize: '22px', fontWeight: '500', marginTop: '.25rem', marginBottom: '.5rem'}}>{data}</Typography>
            </Card>
        </Box>
    )
}