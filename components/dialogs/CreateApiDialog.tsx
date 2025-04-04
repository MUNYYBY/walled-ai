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
import { Span } from "next/dist/trace";

export const CreateApiDialog = (props: any) => {
  const {
    open,
    handleClose,
    openApiDialog,
    setNewApiKey,
    selectedService,
    editApiData,
    isEditMode,
    setNewKeyName,
    selectedMultiple=false,
    optionArray=[]
  } = props;
  console.log("optionArray-----",optionArray)
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
    _id: "",
    service: selectedService ? selectedService : "",
    compliances: [{}],
  });

  // console.log(isEditMode, "isEditMode");
  // console.log(editApiData, "editApiData");
  // console.log(editApiData?.data?.compliance, "editApiData");
  console.log(editApiData?._id, "APiKEYID");
  console.log(formData, "formData");

  useEffect(() => {
    if (isEditMode && editApiData) {
      setFormData({
        label: editApiData?.title || "",
        _id: editApiData?._id || "",
        service: editApiData?.service,
        compliances: editApiData?.data?.compliance || [{}],
      });
      if (editApiData?.data?.compliance) {
        setCustomCompliance(true);
        setComplianceText(editApiData?.data?.compliance);
      } else {
        setCustomCompliance(false);
        setComplianceText("");
      }
    } else {
      setFormData({
        label: "",
        _id: "",
        service: selectedService ? selectedService : "",
        compliances: [{}],
      });
      setComplianceText("");
      setCustomCompliance(false);
    }
  }, [isEditMode, editApiData]);

  const genericGuardrailsText = () => {
    return (
      <>
        <p>
          Generic guardrail comprehensively prevents your AI from being
          exploited for the following actions:
        </p>
        <ul>
          <li>
            <b>Illegal Activity:</b> Reject prompts that solicit or endorse
            illegal activities.
          </li>
          <li>
            <b>Hate/Harass/Violence:</b>Reject prompts that propagate content
            promoting hate, harassment, or violence against any individual or
            group.
          </li>
          <li>
            <b>Harm:</b> eject prompts that request information or support for
            activities that could lead to physical or economic harm to
            individuals or entities.
          </li>
          <li>
            <b>Adult Content:</b> Reject prompts that request the generation or
            facilitation of access to adult content.
          </li>
          <li>
            <b>Political Campaigning:</b> Reject prompts that request assistance
            in political campaigning or election-influencing activities.
          </li>
          <li>
            <b>Privacy Violation Activity:</b> Reject prompts that involve
            engaging in activities that could violate someone’s personal or data
            privacy.
          </li>
        </ul>
        &nbsp;
        <p>
          *Comprehensive prevention includes a wide range of state-of-the-art
          attacks proposed by the community as well as those discovered by us
          internally.
        </p>
      </>
    );
  };

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

  const onCreateApi = async (event: any) => {
    event.preventDefault();
    if (
      formData.label === "" ||
      formData.service === "" /*||
      formData.service === "guardrail"  && complianceText === ""*/
    ) {
      toast.error("Please enter all the fields z" + formData.service);
      return;
    }
    if (formData.service === "guardrail") {
      const res = await onCreateCompliance();
    }
    const userInfo: any = localStorage.getItem("userInfo");
    const token = JSON.parse(userInfo)?.access_token;

    const payload = {
      services: formData.service,
      title: formData.label,
      compliance: complianceText
    };
    console.log("payload====",payload)

    try {
      const res = await axios.post(`${baseUrl}/api-key/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res-----",res)

      if (res?.data) {
        console.log(res?.data?.data?.apiKey);
        setNewApiKey(res?.data?.data?.apiKey);
        setNewKeyName(formData.label)
        handleClose();
        // openApiDialog();
        toast.success("API Key created successfully");

        setFormData({
          label: "",
          _id: "",
          service: selectedService ? selectedService : "",
          compliances: [{}],
        })
        setComplianceText("")
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeInput = (event: any) => {
    if (event.target.value.length <= 50) {
      setFormData({ ...formData, label: event.target.value });
    }
  };

  const onChangeComplianceType = (event: any) => {
    if (event.target.value === "custom") {
      setCustomCompliance(true);
    } else {
      setCustomCompliance(false);
      setComplianceText("");
    }
  };

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
          {isEditMode ? "Update API Key" : "Creating New API Key"}
        </DialogTitle>
        <form onSubmit={(e) => onCreateApi(e)} className="ApiKeyForm">
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


{selectedMultiple ?

<Select
                labelId="service-label"
                required
                onChange={(e: any) =>{
                  setFormData({ ...formData, service: e.target.value === 'string' ? e.target.value.split(',') : e.target.value })
                }
                }
                sx={{ borderRadius: "10px !important", width: "100%" }}
                size="small"
                multiple
                value={formData?.service}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => (
                  selected.map((id: any,index: any) => (
                    <span key={id}>{optionArray?.find((e: any) => e._id === id)?.title}{index+1 != selected.length && ","} </span>
                    ))
                  )
              }
             >
                {optionArray.map((value:any) => (
                            <MenuItem key={value?._id} value={value?._id}>
                              <Checkbox checked={formData?.service.includes(value?._id)} />
                              <ListItemText primary={value?.title} />
                            </MenuItem>
                          ))}
              </Select>

:
selectedService != undefined ? (
  <Select
    labelId="service-label"
    required
    onChange={(e: any) =>
      setFormData({ ...formData, service: e.target.value })
    }
    sx={{ borderRadius: "10px !important", width: "100%" }}
    defaultValue={selectedService}
    size="small"
    // disabled
  >
    <MenuItem value={"guardrail"}>Guard Rail</MenuItem>
    <MenuItem value={"pii"}>PII</MenuItem>
  </Select>
) : (
  <Select
    labelId="service-label"
    required
    value={formData?.service}
    onChange={(e: any) =>
      setFormData({ ...formData, service: e.target.value })
    }
    sx={{ borderRadius: "10px !important", width: "100%" }}
    size="small"
  >
    <MenuItem value={"guardrail"}>Guard Rail</MenuItem>
    <MenuItem value={"pii"}>PII</MenuItem>
  </Select>
)
}

<InputLabel className="label service-label">
compliance
            </InputLabel>
            <OutlinedInput
              autoFocus
              margin="dense"
              type="text"
              value={complianceText}
              onChange={(event) => setComplianceText(event.target.value)}
              fullWidth
              sx={{ borderRadius: "10px !important" }}
              size="small"
            />
           
            {/* {formData.service === "guardrail" && (
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
                  // defaultValue={"standard"}
                  defaultValue={
                    editApiData?.data?.compliance ? "custom" : "standard"
                  }
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
                    <Alert severity="warning">{genericGuardrailsText()}</Alert>
                  </>
                )}
              </>
            )} */}
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update api" : "Create new api"}
            </Button>
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
