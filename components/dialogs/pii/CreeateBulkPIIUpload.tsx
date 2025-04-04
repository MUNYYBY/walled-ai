"use client";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

export const CreateBulkPIIUpload = (props: any) => {
  const {
    open,
    handleClose,
    onCreateBulkPII,
    fileDetails,
    createInputTitle,
    setCreateInputTitle,
    loading,
  } = props;
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        className="create-api-dialog"
      >
        <DialogTitle
          sx={{
            fontWeight: "600",
            fontSize: "22px",
            paddingBottom: 0,
            marginBottom: "0.8rem",
          }}
        >
          Creating New Task (PII Bulk Upload)
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 0, width: "525px" }}>
          <OutlinedInput
            fullWidth
            placeholder="Enter Task Title"
            size="small"
            value={createInputTitle}
            onChange={(e) => setCreateInputTitle(e.target.value)}
          />
          <Typography sx={{ marginY: "10px" }}>File Details</Typography>
          <TableContainer component={Paper}>
            <Table sx={{ fontSize: "14px" }}>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: "500" }}>File name</TableCell>
                  <TableCell>{fileDetails?.fileName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "500" }}>
                    Total number of files in Zip
                  </TableCell>
                  <TableCell>{fileDetails?.totalFiles - 1}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: "500" }}>
                    Total size of in Zip
                  </TableCell>
                  <TableCell>
                    {Math.round(fileDetails?.totalSize / 1024)} KB
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              borderRadius: "2rem",
              marginBottom: "0.8rem",
              marginRight: "1rem",
            }}
            onClick={() => onCreateBulkPII()}
          >
            
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ marginRight: "0.5rem" }} />{" "}
                Loading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
