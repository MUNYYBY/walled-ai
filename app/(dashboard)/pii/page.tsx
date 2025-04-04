"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  InputLabel,
  OutlinedInput,
  Tab,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ApiKeyDialog } from "@/components/dialogs/guardrails/ApiKeyDialog";
import axios from "axios";
import baseUrl, { aiUrl } from "@/utils/baseUrl";
import { useRouter } from "next/navigation";
import { ApiKeyDialogFull } from "@/components/dialogs/guardrails/ApiKeyDialogFull";
import "./page.css";
export default function PII() {
  const [apiKey, setApiKey] = useState<string>("");
  const [apiTitle, setApiTitle] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");
  const [encryptedText, setEncryptedText] = useState<string>("");
  const [mappings, setMappings] = useState<any>([]);
  const [apiDialogOpen, setApiDialogOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [complianceText, setComplianceText] = useState("");
  const [serviceData, setserviceData] = useState([]);
  const router = useRouter();
  const optionArray = [
    { id: 1, name: "Guard Rail" },
    { id: 2, name: "PII" },
    { id: 3, name: "hallucation" },
  ];
  const onEncryptPII = async () => {
    setLoading(true);
    setMappings([]);
    setEncryptedText("");
    const payload = {
      text: inputText,
      level: "paragraph",
    };
    const res = await axios.post(`${aiUrl}/pii`, payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    console.log("----------------------", res?.data);
    if (res?.status == 200) {
      setEncryptedText(res?.data?.data?.masked_text);
      setMappings(
        Object.entries(res?.data?.data?.mapping).map(([pii, value]) => ({
          pii,
          value,
        }))
      );
      setLoading(false);
    }
  };
  const getApiService = async () => {
    setLoading(true);
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;

    try {
      const { data } = await axios.get(`${baseUrl}/api-service`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("-----", data);
      console.log(data.data, "😀😀😀");
      setserviceData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("guardrails-api")) {
      const api = JSON.parse(localStorage.getItem("guardrails-api") as string);
      setApiTitle(api.title);
      setApiKey(api.api_key);
      console.log(api.api_key, "=====>>>");
      setComplianceText(api.data.compliance);
      console.log(api, "api--->");
    }
  }, []);
  console.log("apiKey===", apiKey);
  useEffect(() => {
    getApiService();
  }, []);
  return (
    <div className="root-container">
      <div className="main-container">
        <Container
          sx={{ marginY: "2rem", marginTop: "5.25rem" }}
          className="api-dashboard"
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span className="page-title">
              PII Encryption
              <Button
                variant="outlined"
                sx={{ marginLeft: "1rem", borderRadius: "10px" }}
                onClick={() => router.push("/pii/bulk")}
              >
                Bulk Upload
              </Button>
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

          <Box sx={{ marginTop: "1.25rem" }} className="pii-buttons">
            <InputLabel>Enter text to encrypt</InputLabel>
            <OutlinedInput
              multiline
              fullWidth
              rows={5}
              sx={{
                marginTop: "0.8rem",
                backgroundColor: "#FFF",
                borderRadius: ".8rem",
              }}
              value={inputText}
              onChange={(e) => setInputText(e?.target?.value)}
            />
            <Button
              // variant="outlined"

              variant="contained"
              sx={{ marginTop: "1rem", borderRadius: "12px" }}
              onClick={() => onEncryptPII()}
              disabled={loading}
            >
              {loading ? <CircularProgress size={25} /> : "Encrypt PII"}
            </Button>
          </Box>

          <Box sx={{ marginTop: "1.25rem" }}>
            <InputLabel>Encrypted text</InputLabel>
            <OutlinedInput
              multiline
              fullWidth
              rows={5}
              disabled
              sx={{
                marginTop: "0.8rem",
                backgroundColor: "#FFF",
                borderRadius: ".8rem",
              }}
              value={loading ? "Loading..." : encryptedText}
            />
          </Box>

          <Box sx={{ marginTop: "1.25rem" }}>
            <InputLabel>PII Mappings</InputLabel>
            <Box sx={{ marginTop: ".8rem" }}>
              <TableContainer
                component={Card}
                style={{
                  border: "1px solid rgb(189 189 187)",
                  borderRadius: "12px",
                  boxShadow: "unset",
                }}
              >
                <Table>
                  <TableHead>
                    <TableCell sx={{ fontWeight: 600 }}>Tag</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                  </TableHead>
                  {mappings.map((mapping: any, index: number) => {
                    return (
                      <TableRow key={mapping.id || index}>
                        <TableCell>{mapping.pii}</TableCell>
                        <TableCell>{mapping.value}</TableCell>
                      </TableRow>
                    );
                  })}
                  {mappings.length == 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={2} sx={{ textAlign: "left" }}>
                        No data to show.
                      </TableCell>
                    </TableRow>
                  )}
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={2} sx={{ textAlign: "left" }}>
                        <CircularProgress size={25} />
                      </TableCell>
                    </TableRow>
                  )}
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Container>
      </div>
      <ApiKeyDialogFull
        open={apiDialogOpen}
        handleClose={() => setApiDialogOpen(false)}
        setParentApiKey={setApiKey}
        setApiTitle={setApiTitle}
        setComplianceText={setComplianceText}
        selectedService={[]}
        // selectedService="PII"
        selectedMultiple={true}
        optionArray={serviceData}
      />
    </div>
  );
}
