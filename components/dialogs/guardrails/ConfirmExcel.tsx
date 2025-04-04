import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"

export const ConfrimExcel = ({open, onClose, onConfirm, data, jobTitle, setJobTitle}: any) => {
    return (
        <Dialog open={open} onClose={onClose} className="edit-compliance-dialog" maxWidth="sm" fullWidth>
            <DialogTitle>Confirm Excel Upload</DialogTitle>
            <DialogContent>
                <Alert severity="warning" sx={{marginBottom: '10px'}}>Kindly check the data below and click confirm to proceed?</Alert>
                <OutlinedInput placeholder="Enter job title" fullWidth sx={{marginBottom: '1rem', borderRadius: '10px'}} value={jobTitle} onChange={(e) => setJobTitle(e?.target?.value)}/>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Prompt</TableCell>
                                <TableCell>Comply</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row: any, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{row[0]}</TableCell>
                                    <TableCell>{row[1].toString().charAt(0).toUpperCase() + row[1].toString().slice(1)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error">Close</Button>
                <Button onClick={onConfirm} color="primary">Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}