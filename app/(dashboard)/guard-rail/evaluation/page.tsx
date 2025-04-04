"use client";
import { ApiKeyDialogFull } from "@/components/dialogs/guardrails/ApiKeyDialogFull";
import { ConfrimExcel } from "@/components/dialogs/guardrails/ConfirmExcel";
import { EditComplianceDialog } from "@/components/dialogs/guardrails/EditComplianceDialog";
import { ResultsDialog } from "@/components/dialogs/guardrails/ResultsDialog";
import baseUrl from "@/utils/baseUrl";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { DropzoneArea } from "mui-file-dropzone";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "../playground/guard-rail.css";
import "./evaluation.css";

export default function GuardRailEvaluation() {
  const [complianceText, setComplianceText] = useState("");
  const [isOpenEditComplianceDialog, setIsOpenEditComplianceDialog] =
    useState(false);
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [apiTitle, setApiTitle] = useState<string>("");
  const [fileData, setFileData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [evalData, setEvalData] = useState<any>([]);
  const [isOpenResultsDialog, setIsOpenResultsDialog] = useState(false);
  const [selectedResults, setSelectedResults] = useState<any>({});
  const [isOpenConfirmExcel, setIsOpenConfirmExcel] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [taskLoading, setTaskLoading] = useState(true);

  const getGuardEvalData = async () => {
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;
    try {
      const res: any = await axios.get(
        `${baseUrl}/api-service/guardrail/eval`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvalData(res?.data?.data);
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const downloadTestFile = () => {
    const link = document.createElement("a");
    link.href = "/documents/demo_test.csv";
    link.download = "sample.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onFileChange = (files: any) => {
    if (files.length == 0) return;
    parseCSVFile(files[0]);
  };

  const formatData = (data: any) => {
    let formattedData: any = [];
    data.forEach((item: any) => {
      formattedData.push([item[0].replace(/"/g, ""), item[1] === "TRUE"]);
    });
    console.log(formattedData, "formattedData");
    return formattedData;
  };

  const parseCSVFile = (file: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      const lines = (typeof text === "string" ? text : "").split("\n");
      const headers = lines[0].split(",");
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        const arr: any = [];
        const currentline = lines[i].split(",");
        for (let j = 0; j < headers.length; j++) {
          arr.push(currentline[j]);
        }
        data.push(arr);
      }
      const finalData = formatData(data);
      setFileData(finalData);
      setIsOpenConfirmExcel(true);
    };
    reader.readAsText(file);
  };

  const sendCSVData = async (data: any) => {
    const payload = { records: data, title: jobTitle };
    try {
      setLoading(true);
      setIsOpenConfirmExcel(false);
      const res = await axios.post(
        "https://idy5alt3vg.execute-api.ap-southeast-1.amazonaws.com/Development/guardrail/eval",
        payload,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      toast.success("Data uploaded successfully");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error uploading data");
      setLoading(false);
    }
  };

  const onClickResultsBtn = (results: any) => {
    setIsOpenResultsDialog(true);
    setSelectedResults(results);
  };

  const onClickDownloadReport = async () => {
    console.log(selectedResults, "selectedResults");
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;
    const res: any = await axios.get(
      `${baseUrl}/api-service/guardrail/eval/{taskID}/records?taskID=${selectedResults?._id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const dataForCSV = res?.data?.data;
    const csvHeader = "Prompt,Comply (Provided),Comply (Result)";
    const csvContent = dataForCSV
      .map((row: any) => {
        return `${row.data.text},${row.data.expectedResult},${row.result.is_comply}`;
      })
      .join("\n");

    const csvData = `${csvHeader}\n${csvContent}`;
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute("download", "evaluation_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (localStorage.getItem("guardrails-api")) {
      const api = JSON.parse(localStorage.getItem("guardrails-api") as string);
      setApiTitle(api.title);
      setApiKey(api.api_key);
      setComplianceText(api.data.compliance);
      getGuardEvalData();
    }
    const interval = setInterval(() => {
      getGuardEvalData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const RecordLabel = (props: any) => {
    const { processed, total } = props;
    return (
      <>
        {/* <span style={{color: 'green'}}>{processed}</span>/<span>{total}</span> */}
        <span>{total}</span>
      </>
    );
  };

  return (
    <div className="root-container guard-rail">
      <div className="main-container">
        <Box sx={{ display: "flex", flex: "1", marginTop: "5.25rem" }}>
          <Box sx={{ flex: 1, minHeight: "calc(100vh - 63px)" }}>
            <Container
              sx={{ marginTop: "1rem" }}
              className="gr-evaluation-container"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span className="page-title">Evaluation</span>
                {apiKey != "" ? (
                  <div className="guard-rail-evalution">
                    <Button
                      id="demo-customized-button"
                      variant="outlined"
                      disableElevation
                      endIcon={<KeyboardArrowDownIcon />}
                      onClick={() => setApiDialogOpen(true)}
                      sx={{ borderRadius: "5rem" }}
                    >
                      {apiTitle}
                    </Button>
                  </div>
                ) : (
                  <div className="guard-rail-evalution">
                    <Button
                      variant="outlined"
                      disableElevation
                      sx={{ borderRadius: "5rem" }}
                      onClick={() => setApiDialogOpen(true)}
                    >
                      Enter api key
                    </Button>
                  </div>
                )}
              </Box>
              <Box>
                <Button
                  sx={{
                    borderRadius: "2rem",
                    float: "right",
                    marginBottom: "1rem",
                  }}
                  startIcon={<ArrowDownwardIcon />}
                  onClick={() => downloadTestFile()}
                >
                  Download Sample CSV
                </Button>
              </Box>
              <Box>
                <div className="dropzone-container">
                  {loading ? (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress size={30} />
                      <Typography sx={{ marginLeft: "1rem", fontSize: "10px" }}>
                        Uploading... Please wait
                      </Typography>
                    </Box>
                  ) : (
                    <DropzoneArea
                      dropzoneText="Drag & drop your test cases file here. Only CSV format is accepted"
                      fileObjects={<></>}
                      filesLimit={1}
                      acceptedFiles={[".csv"]}
                      maxFileSize={1000000}
                      getFileLimitExceedMessage={(filesLimit) =>
                        `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`
                      }
                      previewGridClasses={{ container: "dropzone-preview" }}
                      useChipsForPreview
                      onChange={(files) => onFileChange(files)}
                    />
                  )}
                </div>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ marginTop: "1rem" }}>
                  Tasks
                </Typography>
              </Box>
              <Box sx={{ marginTop: "1rem" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" width={"50px"}>
                          Sr No.
                        </TableCell>
                        <TableCell align="center" width={"150px"}>
                          Title
                        </TableCell>
                        <TableCell align="center" width={"150px"}>
                          Api Title
                        </TableCell>
                        <TableCell align="center">Records</TableCell>
                        <TableCell align="center">Processed</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Date </TableCell>
                        <TableCell align="center">Time</TableCell>
                        <TableCell align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {taskLoading && (
                        <TableRow>
                          <TableCell align="center" colSpan={7}>
                            Loading...
                          </TableCell>
                        </TableRow>
                      )}
                      {evalData.length > 0 &&
                        evalData.map((row: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell align="center">{index + 1}</TableCell>
                            <TableCell align="center">{row?.title}</TableCell>
                            {/* <TableCell align="center">{row?.apiKeyID}<span style={{color: 'grey', filter: 'blur(4px)'}}>XXXXXXXXXX</span></TableCell> */}
                            <TableCell align="center">
                              {row?.apiKeyTitle}
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                variant="outlined"
                                color="primary"
                                label={
                                  <RecordLabel
                                    processed={row?.result?.processed}
                                    total={row?.recordsCount}
                                  />
                                }
                                sx={{ borderRadius: 0, width: "60px" }}
                              />
                            </TableCell>
                            <TableCell align="center">
                              {parseInt(
                                (
                                  (row?.result?.processed / row?.recordsCount) *
                                  100
                                ).toString()
                              )}
                              %
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                variant="outlined"
                                color={
                                  row?.status === "finished"
                                    ? "success"
                                    : "warning"
                                }
                                label={
                                  row?.status === "finished"
                                    ? "Finished"
                                    : "Processing"
                                }
                              />
                            </TableCell>

                            <TableCell align="center">
                              {new Date(row?.createdAt).toLocaleDateString()}{" "}
                              {/* Display Date */}
                            </TableCell>
                            <TableCell align="center">
                              {new Date(row?.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}{" "}
                              {/* Display Time */}
                            </TableCell>

                            <TableCell align="center">
                              <Button
                                onClick={() => onClickResultsBtn(row)}
                                sx={{ borderRadius: "5rem", fontSize: "12px" }}
                                // disabled={row?.status != 'finished'}
                              >
                                Results
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Container>
          </Box>
          {/* <Box sx={{width: '30%', borderLeft: '1px solid #0211151F'}}>
                        <p style={{fontSize: '18px', fontWeight: '600', padding: '1rem', margin: 0}}>Compliance</p>
                        <Box sx={{marginLeft: '1rem', marginRight: '1rem'}}>
                            <TextField sx={{width: '100%'}} multiline rows={3} value={complianceText} onChange={(e) => setComplianceText(e?.target?.value)} disabled/>
                        </Box>
                        <Button variant="outlined" sx={{borderRadius: '5rem', width: '92%', margin: '1rem'}} onClick={() => setIsOpenEditComplianceDialog(true)}>Edit</Button>
                    </Box> */}
        </Box>
      </div>
      {/* Dialogs */}
      <ApiKeyDialogFull
        open={apiDialogOpen}
        handleClose={() => setApiDialogOpen(false)}
        setParentApiKey={setApiKey}
        setApiTitle={setApiTitle}
        setComplianceText={setComplianceText}
        selectedService="guardrail"
      />
      <EditComplianceDialog
        open={isOpenEditComplianceDialog}
        onClose={() => setIsOpenEditComplianceDialog(false)}
        complianceText={complianceText}
        apiKey={apiKey}
        apiTitle={apiTitle}
        setComplianceText={setComplianceText}
      />
      <ResultsDialog
        open={isOpenResultsDialog}
        onClose={() => setIsOpenResultsDialog(false)}
        resultData={selectedResults}
        onClickDownloadReport={onClickDownloadReport}
      />
      <ConfrimExcel
        open={isOpenConfirmExcel}
        onClose={() => setIsOpenConfirmExcel(false)}
        onConfirm={() => sendCSVData(fileData)}
        data={fileData}
        jobTitle={jobTitle}
        setJobTitle={setJobTitle}
      />
    </div>
  );
}
