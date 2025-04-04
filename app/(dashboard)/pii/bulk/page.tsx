"use client";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import {
  Box,
  Button,
  Chip,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import { DropzoneArea } from "mui-file-dropzone";
import axios from "axios";
import baseUrl, { aiUrl } from "@/utils/baseUrl";
import { useEffect, useState } from "react";
import { ApiKeyDialogFull } from "@/components/dialogs/guardrails/ApiKeyDialogFull";
import { EditComplianceDialog } from "@/components/dialogs/guardrails/EditComplianceDialog";
import JSZip from "jszip";
import { CreateBulkPIIUpload } from "@/components/dialogs/pii/CreeateBulkPIIUpload";
import { toast } from "react-hot-toast";
import "./styles.css";
export default function BulkPII() {
  const router = useRouter();
  const [piiData, setPiiData] = useState<any>([]);
  const [apiKey, setApiKey] = useState<string>("");
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [apiTitle, setApiTitle] = useState<string>("");
  const [complianceText, setComplianceText] = useState("");
  const [isOpenEditComplianceDialog, setIsOpenEditComplianceDialog] =
    useState(false);
  const [isCreatePiiDialog, setIsCreatePiiDialog] = useState(false);
  const [fileDetails, setFileDetails] = useState<any>();
  const [createInputTitle, setCreateInputTitle] = useState("");
  const [records, setRecords] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(true);

  const getPIIData = async () => {
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;
    try {
      const res: any = await axios.get(`${baseUrl}/api-service/pii/bulk`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPiiData(res?.data?.data);
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getPIIData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("pii-api")) {
      const api = JSON.parse(localStorage.getItem("pii-api") as string);
      setApiTitle(api.title);
      setApiKey(api.api_key);
    }
  }, []);

  const RecordLabel = (props: any) => {
    const { processed, total } = props;
    return (
      <>
        <span>{total}</span>
      </>
    );
  };

  const handleDownload = async (taskID: string): Promise<void> => {
    try {
      const userInfo: any = localStorage.getItem("userInfo");
      const token = JSON.parse(userInfo)?.access_token;
      const response = await axios.get(
        `${baseUrl}/api-service/pii/bulk/${taskID}/records/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `records_${taskID}.zip`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      console.log("Download successful");
    } catch (error: unknown) {
      console.error("Error downloading records:", (error as Error).message);
    }
  };

  const downloadTestFile = () => {
    const link = document.createElement("a");
    link.href = "/documents/sample_pii.zip";
    link.download = "sample_pii.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = async (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    const zip = new JSZip();

    try {
      const zipContent = await zip.loadAsync(file);

      Object.keys(zipContent.files).forEach((filename) => {
        if (filename.includes("__MACOSX")) {
          delete zipContent.files[filename];
        }
      });

      setFileDetails({
        fileName: file.name,
        totalFiles: Object.keys(zipContent.files).length,
        totalSize: file.size,
      });

      const records: [string, string][] = [];

      await Promise.all(
        Object.keys(zipContent.files).map(async (filename) => {
          const fileData = zipContent.files[filename];
          if (!fileData.dir) {
            const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
            const content = (await fileData.async("string"))
              .replace(/\s+/g, " ")
              .trim();
            records.push([nameWithoutExtension.split("/")[1], content]);
          }
        })
      );
      console.log(records, "records");
      setRecords(records);
      setIsCreatePiiDialog(true);
    } catch (error) {
      console.error("Error unzipping file:", error);
    }
  };

  const onCreateBulkPII = async () => {
    setLoading(true);
    const payload = {
      title: createInputTitle,
      records: records,
    };

    const res = await axios.post(`${aiUrl}/pii/bulk`, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    console.log(res, "res");
    setIsCreatePiiDialog(false);
    setLoading(false);
    if (res.status === 200) {
      toast.success("Task initiated successfully");
    }
  };

  return (
    <div className="root-container">
      <div className="main-container">
        <Container sx={{ marginY: "2rem" }} className="api-dashboard">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span className="page-title">
              <IconButton
                onClick={() => router.back()}
                sx={{ marginRight: "5px" }}
              >
                <ArrowBackIcon />
              </IconButton>
              Bulk PII Encryption
            </span>
            {apiKey != "" ? (
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
            ) : (
              <Button
                variant="outlined"
                disableElevation
                sx={{ borderRadius: "5rem" }}
                onClick={() => setApiDialogOpen(true)}
              >
                Enter api key
              </Button>
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
              Download Sample ZIP
            </Button>
          </Box>
          <Box sx={{ marginTop: "1rem" }}>
            <div className="dropzone-container">
              <DropzoneArea
                dropzoneText="Drag & drop or click here to upload your zip file here. Only zip format is accepted"
                fileObjects={<></>}
                filesLimit={1}
                acceptedFiles={[".zip"]}
                maxFileSize={1000000}
                getFileLimitExceedMessage={(filesLimit) =>
                  `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`
                }
                previewGridClasses={{ container: "dropzone-preview" }}
                useChipsForPreview
                // onChange={(files) => console.log(files)}
                onChange={(files) => handleFileUpload(files)}
                classes={{
                  text: "custom-dropzone-text", // Add a class to the dropzone text
                }}
              />
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
                      Task Title
                    </TableCell>
                    <TableCell align="center" width={"150px"}>
                      Api
                    </TableCell>
                    <TableCell align="center">Records</TableCell>
                    <TableCell align="center">Processed</TableCell>
                    <TableCell align="center">Status</TableCell>
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
                  {piiData.length > 0 &&
                    piiData.map((row: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{row?.title}</TableCell>
                        {/* <TableCell align="center">{row?.apiKeyID}<span style={{color: 'grey', filter: 'blur(4px)'}}>XXXXXXXXXX</span></TableCell> */}
                        <TableCell align="center">{row?.apiKeyTitle}</TableCell>
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
                              row?.status === "finished" ? "success" : "warning"
                            }
                            label={
                              row?.status === "finished"
                                ? "Finished"
                                : "Processing"
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {/* <Button
                            onClick={() => onClickResultsBtn(row)}
                            sx={{ borderRadius: "5rem", fontSize: "12px" }}
                            // disabled={row?.status != 'finished'}
                          >
                            Results
                          </Button> */}
                          <Tooltip title="Download" arrow>
                            <Button
                              onClick={() => handleDownload(row._id)}
                              sx={{
                                borderRadius: "5rem",
                                fontSize: "12px",
                                color: "#000",
                              }}
                            >
                              <DownloadIcon sx={{ marginRight: "0.5rem" }} />
                            </Button>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </div>
      <ApiKeyDialogFull
        open={apiDialogOpen}
        handleClose={() => setApiDialogOpen(false)}
        setParentApiKey={setApiKey}
        setApiTitle={setApiTitle}
        setComplianceText={setComplianceText}
        selectedService="pii"
      />
      <EditComplianceDialog
        open={isOpenEditComplianceDialog}
        onClose={() => setIsOpenEditComplianceDialog(false)}
        complianceText={complianceText}
        apiKey={apiKey}
        apiTitle={apiTitle}
        setComplianceText={setComplianceText}
      />

      <CreateBulkPIIUpload
        open={isCreatePiiDialog}
        loading={loading}
        handleClose={() => setIsCreatePiiDialog(false)}
        onCreateBulkPII={onCreateBulkPII}
        fileDetails={fileDetails}
        createInputTitle={createInputTitle}
        setCreateInputTitle={setCreateInputTitle}
      />
    </div>
  );
}
