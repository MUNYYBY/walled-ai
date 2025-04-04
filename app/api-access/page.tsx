"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Sidebar from "../../components/layout/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EqualizerIcon from "@mui/icons-material//Equalizer";
import EditIcon from "@mui/icons-material/Edit";
import { CheckBox, Create } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { CreateApiDialog } from "@/components/dialogs/CreateApiDialog";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import Topbar from "../../components/layout/Topbar";
import NewApiDialog from "@/components/dialogs/NewApiDialog";
import Link from "next/link";
import { NewComplianceTemplateDialog } from "@/components/dialogs/NewComplianceTemplateDialog";
import { useRouter } from "next/navigation";
import { ApiStatsDialog } from "@/components/dialogs/apis/ApiStats";
import "./manageapicss.css";
export default function ApiAccessPAge() {
  function createData(label: string, apiKey: string, service: string) {
    return { label, apiKey, service };
  }

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isNewApiDialogOpen, setIsNewApiDialogOpen] = useState(false);
  const [isComplianceDialogOpen, setIsComplianceDialogOpen] = useState(false);
  const [isApiStatsDialogOpen, setIsApiStatsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  interface ApiKey {
    _id: string;
    title: string;
    hash: String;
    service: string;
    user: String;
  }

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newApiKey, setNewApiKey] = useState("");
  const [selectedApi, setSelectedApi] = useState(0);

  console.log(selectedApi, "selectedAPi");
  const [editApiData, setEditApiData] = useState<ApiKey | null>(null);
  const [editMode, setIsEditMode] = useState(false);

  const router = useRouter();

  const getApiKeys = async () => {
    setLoading(true);
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;

    try {
      const { data } = await axios.get(`${baseUrl}/api-key`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setApiKeys(data?.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openApiDialog = () => {
    setIsNewApiDialogOpen(true);
  };

  useEffect(() => {
    getApiKeys();
  }, []);

  useEffect(() => {
    if (newApiKey !== "") {
      setIsNewApiDialogOpen(true);
    }
  }, [newApiKey]);

  const searchData = () => {
    if (searchInput !== "") {
      const filteredData = apiKeys?.filter((item: any) => {
        return item?.title?.toLowerCase().includes(searchInput.toLowerCase());
      });
      setApiKeys(filteredData);
    } else {
      getApiKeys();
    }
  };

  useEffect(() => {
    if (!createDialogOpen) {
      getApiKeys();
    }
  }, [createDialogOpen]);

  return (
    <div className="root-container">
      <div className="main-container">
        <Container sx={{ marginTop: "5.25rem" }} className="api-dashboard">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span className="page-title">Manage Api Keys</span>
            <Button
              variant="contained"
              endIcon={<AddIcon />}
              sx={{
                borderRadius: "12px",
                backgroundColor: "#2488fd",
                boxShadow: "none",
                fontSize: "14px",
              }}
              onClick={() => setCreateDialogOpen(true)}
            >
              Create New
            </Button>
          </Box>
          <Card
            sx={{
              backgroundColor: "#fff",
              padding: "0.75rem",
              marginTop: "1.75rem",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <TextField
                  label="Search"
                  variant="outlined"
                  className="search-input"
                  sx={{ fontSize: "12px", borderRadius: "12px" }}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e?.target?.value)}
                  onKeyUp={(e) => e.key === "Enter" && searchData()}
                />
                <Box>
                  <Button
                    variant="outlined"
                    // disabled
                    startIcon={<EqualizerIcon />}
                    sx={{
                      borderRadius: "12px",
                      borderColor: "#021115",
                      color: "#021115",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      fontSize: "14px",
                      padding: "5px 8px",
                      marginRight: "1rem",
                    }}
                    onClick={() => {
                      if (selectedApi !== null) {
                        setIsApiStatsDialogOpen(true);
                      }
                    }}
                  >
                    Stats
                  </Button>
                  <Link href="/guard-rail/playground">
                    <Button
                      variant="outlined"
                      startIcon={<PlayArrowIcon />}
                      className="apiicon"
                      sx={{
                        borderRadius: "12px",
                        borderColor: "#021115",
                        color: "#021115",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        fontSize: "14px",
                        padding: "5px 8px",
                      }}
                    ></Button>
                  </Link>
                  <Button
                    variant="outlined"
                    className="apiicon"
                    onClick={() => {
                      if (selectedApi !== null) {
                        setEditApiData(apiKeys[selectedApi]);
                        setIsEditMode(true);
                        setCreateDialogOpen(true);
                      }
                    }}
                    // disabled
                    startIcon={<EditIcon />}
                    sx={{
                      borderRadius: "12px",
                      borderColor: "#021115",
                      color: "#021115",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      fontSize: "14px",
                      padding: "5px 8px",
                      // marginLeft: "1rem",
                    }}
                  >
                    {/* Edit */}
                  </Button>
                </Box>
              </Box>
              <TableContainer component={Paper} className="c-table">
                <Table
                  sx={{ minWidth: 650, borderRadius: "12px" }}
                  aria-label="simple table"
                >
                  <TableHead sx={{ backgroundColor: "#2488fd" }}>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "white",
                        }}
                      >
                        SELECT
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "white",
                        }}
                      >
                        TITLE
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "white",
                        }}
                      >
                        API KEY
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "16px",
                          fontWeight: "400",
                          color: "white",
                        }}
                      >
                        SERVICE
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading && (
                      <TableRow>
                        <TableCell colSpan={4} style={{ textAlign: "center" }}>
                          <CircularProgress
                            sx={{ padding: "0.8rem" }}
                            color="inherit"
                          />
                        </TableCell>
                      </TableRow>
                    )}
                    {apiKeys
                      ?.sort(
                        (a: any, b: any) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
                      ) // Sort newest first
                      .map((row: any, i: any) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            borderBottom: "none",
                            paddingTop: 0.8,
                            paddingBottom: 0,
                          }}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedApi == i}
                              onClick={() => setSelectedApi(i)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row?.title}
                          </TableCell>
                          <TableCell>
                            {row._id}
                            <span
                              style={{ color: "grey", filter: "blur(4px)" }}
                            >
                              XXXXXXXXXXXX
                            </span>
                          </TableCell>
                          <TableCell sx={{ textTransform: "capitalize" }}>
                            {row.service}
                          </TableCell>
                        </TableRow>
                      ))}
                    {apiKeys?.length === 0 && !loading && (
                      <TableRow>
                        <TableCell colSpan={4} style={{ textAlign: "center" }}>
                          <span style={{ padding: "1rem" }}>No data found</span>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </div>

      <CreateApiDialog
        open={createDialogOpen}
        handleClose={() => {
          setCreateDialogOpen(false);
          setIsEditMode(false);
          setEditApiData(null);
        }}
        openApiDialog={openApiDialog}
        setNewApiKey={setNewApiKey}
        setIsComplianceDialogOpen={setIsComplianceDialogOpen}
        // selectedService={editApiData?.service || ""}
        editApiData={editApiData}
        isEditMode={editMode}
      />

      <NewApiDialog
        open={isNewApiDialogOpen}
        handleClose={() => setIsNewApiDialogOpen(false)}
        newApiKey={newApiKey}
      />

      <ApiStatsDialog
        open={isApiStatsDialogOpen}
        onClose={() => setIsApiStatsDialogOpen(false)}
        selectedApiId={apiKeys[selectedApi]?._id}
      />
    </div>
  );
}
