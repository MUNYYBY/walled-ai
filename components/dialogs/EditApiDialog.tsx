import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import "./CreateApiDialog.css";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import CheckboxList from "../molecules/CheckboxList";
import { toast } from "react-hot-toast";
import { NewComplianceTemplateDialog } from "./NewComplianceTemplateDialog";
import { on } from "events";

export const EditApiDialog = (props: any) => {
  const { open, handleClose, openApiDialog, setNewApiKey, selectedService } = props;
  const [isComplianceVisible, setIsComplianceVisible] = useState(false);
  const [compliances, setCompliances] = useState([]);
  const [complianceText, setComplianceText] = useState<string>("");

  const [selectedCompliances, setSelectedCompliances] = useState("");

  const [newComplianceDialogOpen, setNewComplianceDialogOpen] = useState(false);
  const [complianceTitleCheck, setComplianceTitleCheck] = useState(false);
  const [customCompliance, setCustomCompliance] = useState(false);

  const [complianceTitle, setComplianceTitle] = useState("");

  const [formData, setFormData] = useState({
    label: "",
    service: selectedService ? selectedService : "",
    compliances: [{}],
  });

  const getCompliances = async () => {
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;
    try {
      const res = await axios.get(`${baseUrl}/compliances`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res?.data) {
        let { data } = res.data;
        console.log("data", data);
        setCompliances(data?.my);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCheckboxClick = (compliance: any) => {
    setSelectedCompliances(compliance?._id);
    setComplianceText(compliance?.text);
    setIsComplianceVisible(false);
  };

  const onCreateCompliance = async () => {
    try {
      const userInfo: any = localStorage.getItem("userInfo");
      const token = JSON.parse(userInfo)?.access_token;
      const res = await axios.post(
        `${baseUrl}/compliances/create`,
        {
          text: complianceText,
          title: complianceTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res?.data) {
        toast.success("Compliance template created successfully");
      }
      return res;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const onChangeInput = (event: any) => {
    if (event.target.value.length <= 50) {
      setFormData({ ...formData, label: event.target.value });
    }
  };

    const onChangeComplianceType = (event: any) => {
        if (event.target.value === 'custom') {
            setCustomCompliance(true);
        } else {
            setCustomCompliance(false);
            setComplianceText("");
        }
    }

  useEffect(() => {
    getCompliances();
  }, []);

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
          Creating New API Key
        </DialogTitle>
        <form>
          <DialogContent sx={{ paddingTop: 0, width: "525px" }}>
            <InputLabel className="label service-label">
              Enter API name
            </InputLabel>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              type="text"
              value={formData.label}
              onChange={(event) => onChangeInput(event)}
              fullWidth
              sx={{ borderRadius: "10px !important" }}
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  {formData.label.length}/50
                </InputAdornment>
              }
            />
            <InputLabel
              className="label service-label"
              sx={{ marginBottom: "0.3rem", marginTop: "0.5rem" }}
            >
              Select service
            </InputLabel>
            {selectedService!=undefined ? (
              <Select
                labelId="service-label"
                required
                onChange={(e: any) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                sx={{ borderRadius: "10px !important", width: "100%" }}
                defaultValue={selectedService}
                size="small"
                disabled
              >
                <MenuItem value={"guardrail"}>Guard Rail</MenuItem>
                <MenuItem value={"walledeval"}>Walled Eval</MenuItem>
              </Select>
            ) : (
              <Select
                labelId="service-label"
                required
                onChange={(e: any) =>
                  setFormData({ ...formData, service: e.target.value })
                }
                sx={{ borderRadius: "10px !important", width: "100%" }}
                size="small"
              >
                <MenuItem value={"guardrail"}>Guard Rail</MenuItem>
                <MenuItem value={"walledeval"}>Walled Eval</MenuItem>
              </Select>
            )}
            {formData.service === "guardrail" && (
              <>
                <InputLabel
                  sx={{
                    marginTop: "1rem",
                    textTransform: "uppercase",
                    fontSize: "14px",
                  }}
                >
                  Select type of compliance
                </InputLabel>
                <RadioGroup
                  row
                  onChange={(event) => onChangeComplianceType(event)}
                  defaultValue={"standard"}
                >
                  <FormControlLabel
                    value="standard"
                    control={<Radio />}
                    label="Standard compliance"
                  />
                  <FormControlLabel
                    value="custom"
                    control={<Radio />}
                    label="Custom compliance"
                  />
                </RadioGroup>
                {customCompliance ? (
                  <>
                    {isComplianceVisible && (
                      <Box>
                        <CheckboxList
                          items={compliances}
                          header="Select compliance"
                          onCheckboxClick={onCheckboxClick}
                          selectedCompliances={selectedCompliances}
                        />
                      </Box>
                    )}
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <InputLabel className="label service-label">
                        Compliance
                      </InputLabel>
                      <Button onClick={() => setIsComplianceVisible(true)}>
                        Pick from template
                      </Button>
                    </Box>
                    <Box className="compliance-text-input">
                      <OutlinedInput
                        sx={{ width: "100%" }}
                        multiline
                        rows={3}
                        value={complianceText}
                        onChange={(e) => {
                          if (complianceText.length <= 1000) {
                            setComplianceText(e.target.value);
                          }
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            {complianceText.length}/1000
                          </InputAdornment>
                        }
                      />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Checkbox
                        sx={{ marginLeft: "-10px" }}
                        value={complianceTitleCheck}
                        onChange={() =>
                          setComplianceTitleCheck(!complianceTitleCheck)
                        }
                      ></Checkbox>{" "}
                      <span>Save this as a new compliance template</span>
                    </Box>
                    {complianceTitleCheck && (
                      <Box>
                        <InputLabel className="label">
                          Enter compliance title
                        </InputLabel>
                        <OutlinedInput
                          sx={{ width: "100%" }}
                          size="small"
                          value={complianceTitle}
                          onChange={(e: any) =>
                            setComplianceTitle(e?.target?.value)
                          }
                        />
                      </Box>
                    )}
                  </>
                ) : (
                  <>
                    <Alert severity="warning">This is a warning Alert.</Alert>
                  </>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Create new api</Button>
          </DialogActions>
        </form>
      </Dialog>

      <NewComplianceTemplateDialog
        open={newComplianceDialogOpen}
        handleClose={() => setNewComplianceDialogOpen(false)}
        complianceText={complianceText}
      />
    </>
  );
};
