"use client";

import { CreateJobDialog } from "@/components/dialogs/CreateJob";
import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export default function WalledEvalPage() {
  const [isCreateJobDialogOpen, setIsCreateJobDialogOpen] = useState(false);

  const openCreateJobDialog = () => {
    setIsCreateJobDialogOpen(true);
  };
  return (
    <div className="root-container">
      <div className="main-container">
        <Box
          sx={{
            paddingLeft: "1.5rem",
            paddingTop: "1rem",
            paddingRight: "1.5rem",
          }}
        >
          <Box>
            <span className="page-title">Walled Eval</span>
          </Box>

          <Box>
            <Box sx={{ marginTop: "1.5rem" }}>
              <span style={{ fontSize: "16px" }}>All Jobs [0]</span>
              <Button
                variant="contained"
                sx={{ float: "right", borderRadius: "5rem", boxShadow: "none" }}
                onClick={() => openCreateJobDialog()}
              >
                Create Job
              </Button>
            </Box>

            <Box sx={{ marginTop: "3rem" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" width={"50px"}>
                        Sr No.
                      </TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Api Key</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell align="center">1</TableCell>
                      <TableCell align="center">Job 1</TableCell>
                      <TableCell align="center">
                        a3dfa-dahns-*****-*******
                      </TableCell>
                      <TableCell align="center">
                        <Chip label="Processing" />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          sx={{ borderRadius: "5rem" }}
                          disabled
                        >
                          View Results
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">2</TableCell>
                      <TableCell align="center">Job 2</TableCell>
                      <TableCell align="center">
                        a3dfa-dahns-*****-*******
                      </TableCell>
                      <TableCell align="center">
                        <Chip label="Finished" color="success" />
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          sx={{ borderRadius: "5rem" }}
                        >
                          View Results
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </div>
      <CreateJobDialog
        isOpen={isCreateJobDialogOpen}
        handleClose={() => setIsCreateJobDialogOpen(false)}
      />
    </div>
  );
}
