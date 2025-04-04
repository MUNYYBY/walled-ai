import { Box, Card, Skeleton } from "@mui/material";

const DashboardCards = ({ title, data, type, icon }) => {
    return (
        <Card sx={{marginTop: '2rem', flex: 1, textAlign: 'center', marginRight: '1rem', paddingTop: '1rem', paddingBottom: '1rem', boxShadow: 'none', borderRadius: '12px'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {icon && (
                    <Box sx={{marginRight: '1rem', color: '#2488fd'}}>
                        {icon}
                    </Box>
                )}
                <Box>
                    <div style={{fontSize: '1.rem', fontWeight: '200', color: 'grey'}}>{title}</div>
                    <span style={{fontSize: '1.25rem', fontWeight: '400', marginTop: '1.25rem'}}>
                        
                        {data || data===NaN ? ( <>{type == 'credit' && <span>$ </span>} {data} </>) : (<Skeleton variant="text" sx={{ fontSize: '1rem' }} />)}
                    </span>
                </Box>
            </Box>
        </Card>
    );
}

export default DashboardCards;