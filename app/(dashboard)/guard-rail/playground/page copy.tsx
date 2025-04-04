// "use client";
// import LeftSideMessage from "@/components/common/messages/LeftSideMessage";
// import RightSideMessage from "@/components/common/messages/RightSideMessage";
// import Sidebar from "@/components/layout/Sidebar";
// import {
//   Box,
//   Button,
//   Container,
//   InputAdornment,
//   Slider,
//   TextField,
//   Checkbox,
//   TextareaAutosize,
//   Divider,
//   InputLabel,
//   CircularProgress,
// } from "@mui/material";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import SendIcon from "@mui/icons-material/Send";
// import Topbar from "@/components/layout/Topbar";

// import "./guard-rail.css";
// import { useEffect, useRef, useState } from "react";
// import { TemplateDialog } from "@/components/dialogs/TemplateDialog";
// import { aiUrl } from "../../../utils/baseUrl";
// import axios from "axios";
// import { headers } from "next/headers";
// import { headers } from "next/headers";
// import { NewComplianceTemplateDialog } from "@/components/dialogs/NewComplianceTemplateDialog";
// import { ApiKeyDialog } from "@/components/dialogs/guardrails/ApiKeyDialog";
// import { EditComplianceDialog } from "@/components/dialogs/guardrails/EditComplianceDialog";
// import { ApiKeyDialogFull } from "@/components/dialogs/guardrails/ApiKeyDialogFull";
// import baseUrl from "@/utils/baseUrl";

// export default function GuardRailPage() {
//   const [templateDialogOpen, setTemplateDialogOpen] = useState(false);
//   const [newComplianceDialogOpen, setNewComplianceDialogOpen] = useState(false);
//   const [complianceText, setComplianceText] = useState<string>("");
//   const [inputText, setInputText] = useState<string>("");

//   const [messages, setMessages] = useState<any>([]);

//   const [apiKey, setApiKey] = useState<string>("");
//   const [apiTitle, setApiTitle] = useState<string>("");
//   const [apiDialogOpen, setApiDialogOpen] = useState(false);

//   const [loading, setLoading] = useState(false);

//   const [isOpenEditComplianceDialog, setIsOpenEditComplianceDialog] =
//     useState(false);
//   const [serviceData, setserviceData] = useState([]);

//   const bottomRef = useRef<HTMLDivElement | null>(null);
//   const optionArray = [
//     { id: 1, name: "Guard Rail" },
//     { id: 2, name: "PII" },
//     { id: 3, name: "hallucation" },
//   ];
//   const handleTemplateDialogClose = () => {
//     setTemplateDialogOpen(false);
//   };

//   const onDialogUseTemplate = (str: any) => {
//     setComplianceText(str);
//     setTemplateDialogOpen(false);
//   };

//   const onSendMessage = async (e: any) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const payload = {
//         text: inputText,
//       };
//       const res = await axios.post(`${aiUrl}/guardrail`, payload, {
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//         },
//       });
//       console.log(res);
//       const newMessage: any = {
//         message: inputText,
//         isComply: res.data.data.is_comply,
//       };
//       setMessages([...messages, newMessage]);
//       setInputText("");
//       setLoading(false);
//       scrollToBottom();
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   const scrollToBottom = () => {
//     const chat = document.querySelector(".api-dashboard");
//     chat?.scrollTo(0, chat.scrollHeight);
//   };

//   const getApiService = async () => {
//     setLoading(true);
//     const userInfo: any = localStorage.getItem("userInfo");
//     const token = JSON.parse(userInfo)?.access_token;

//     try {
//       const { data } = await axios.get(`${baseUrl}/api-service`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("-----", data);
//       console.log(data.data, "😀😀😀");
//       setserviceData(data.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem("guardrails-api")) {
//       const api = JSON.parse(localStorage.getItem("guardrails-api") as string);
//       console.log("api", api);
//       setApiTitle(api.title);
//       setApiKey(api.api_key);
//       setComplianceText(api.data.compliance);
//     }
//   }, []);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   useEffect(() => {
//     getApiService();
//   }, []);

//   return (
//     <div className="root-container guard-rail">
//       <div
//         className="main-container"
//         style={{ display: "flex", flexDirection: "column", height: "100vh" }}
//       >
//         <Box sx={{ display: "flex", flex: "1", marginTop: "64px" }}>
//           <Box sx={{ flex: 1 }}>
//             <Container sx={{ marginTop: "1rem" }} className="api-dashboard">
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   marginBottom: "10px",
//                 }}
//                 className="guard-rail-buttons"
//               >
//                 <span className="page-title">Conversation</span>
//                 {apiKey != "" ? (
//                   <Button
//                     id="demo-customized-button"
//                     variant="outlined"
//                     disableElevation
//                     endIcon={<KeyboardArrowDownIcon />}
//                     onClick={() => setApiDialogOpen(true)}
//                     sx={{ borderRadius: "5rem" }}
//                   >
//                     {apiTitle}
//                   </Button>
//                 ) : (
//                   <Button
//                     variant="outlined"
//                     disableElevation
//                     sx={{ borderRadius: "5rem" }}
//                     onClick={() => setApiDialogOpen(true)}
//                     className=""
//                   >
//                     Enter api key
//                   </Button>
//                 )}
//               </Box>
//               <Box>
//                 <Box
//                   sx={{
//                     height: "72vh",
//                     overflowY: "scroll",
//                     paddingBottom: "5px",
//                   }}
//                 >
//                   {messages.length > 0 &&
//                     messages.map((message: any) => {
//                       return (
//                         <LeftSideMessage message={message} key={message} />
//                       );
//                     })}
//                   <div ref={bottomRef} />
//                 </Box>
//               </Box>
//               <div className="message-input">
//                 <form onSubmit={(e) => onSendMessage(e)}>
//                   <TextField
//                     variant="outlined"
//                     fullWidth
//                     className="send-message"
//                     placeholder="Type a message"
//                     // sx={{ marginTop: "1rem", borderRadius: "5rem" }}
//                     sx={{
//                       marginTop: "1rem",
//                       borderRadius: "30px",
//                       background: "rgba(255, 255, 255, 0.2)",
//                       backdropFilter: "blur(8px)",
//                       border: "1px solid rgba(255, 255, 255, 0.3)",
//                       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "30px",
//                         paddingRight: "8px",
//                       },
//                     }}
//                     onChange={(e) => setInputText(e.target.value)}
//                     value={inputText}
//                     InputProps={{
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           {loading ? (
//                             <CircularProgress
//                               size={25}
//                               sx={{ margin: "8px" }}
//                             />
//                           ) : (
//                             <Button
//                               sx={{
//                                 background:
//                                   "linear-gradient(90deg, #007bff, #007bff)",
//                                 borderRadius: "50%",
//                                 padding: "10px",
//                                 minWidth: "46px",
//                                 height: "46px",
//                                 color: "white",
//                                 marginRight: "-4px",
//                                 boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//                                 "&:hover": {
//                                   background:
//                                     "linear-gradient(90deg, #007bff, #007bff)",
//                                 },
//                               }}
//                               type="submit"
//                             >
//                               <SendIcon />
//                             </Button>
//                           )}
//                         </InputAdornment>
//                       ),
//                     }}
//                   />
//                 </form>
//               </div>
//             </Container>
//           </Box>
//           <Box sx={{ width: "30%", borderLeft: "1px solid #0211151F" }}>
//             {/* <p style={{fontSize: '18px', fontWeight: '600', padding: '1rem', margin: 0}}>Compliances</p>

//                         <Box>
//                             <div className="policy-list-item">
//                                 <Checkbox/> <span>US</span>
//                             </div>
//                             <div className="policy-list-item">
//                                 <Checkbox/> <span>Singapore</span>
//                             </div>
//                         </Box>
//                         <p style={{fontSize: '18px', fontWeight: '600', padding: '1rem', margin: 0}}>Policies</p>

//                         <Box>
//                             <div className="policy-list-item">
//                                 <Checkbox/> <span>Abuse</span>
//                             </div>
//                             <div className="policy-list-item">
//                                 <Checkbox/> <span>Hatred</span>
//                             </div>
//                         </Box> */}

//             <p
//               style={{
//                 fontSize: "18px",
//                 fontWeight: "600",
//                 padding: "1rem",
//                 margin: 0,
//               }}
//             >
//               Compliance
//             </p>

//             <Box sx={{ marginLeft: "1rem", marginRight: "1rem" }}>
//               <TextField
//                 sx={{ width: "100%" }}
//                 multiline
//                 rows={3}
//                 value={complianceText}
//                 onChange={(e) => setComplianceText(e?.target?.value)}
//                 disabled
//               />

//               {/* <Box sx={{display: 'flex', marginTop: '5px'}}>
//                                 <Button variant="outlined" size="small" sx={{borderRadius: '0.5rem', flex: 1, marginRight: '0.25rem'}} onClick={() => setTemplateDialogOpen(true)}>Use Template</Button>
//                                 <Button variant="outlined" size="small" sx={{borderRadius: '0.5rem', flex: 1, marginLeft: '0.25rem'}} onClick={() => setNewComplianceDialogOpen(true)}>Save Template</Button>
//                             </Box> */}
//             </Box>
//             <div className="guard-rail-buttons">
//               <Button
//                 variant="outlined"
//                 sx={{ borderRadius: "5rem", width: "92%", margin: "1rem" }}
//                 onClick={() => setIsOpenEditComplianceDialog(true)}
//               >
//                 Edit
//               </Button>
//             </div>
//           </Box>
//         </Box>
//         <TemplateDialog
//           open={templateDialogOpen}
//           handleClose={handleTemplateDialogClose}
//           onDialogUseTemplate={onDialogUseTemplate}
//         />
//         <NewComplianceTemplateDialog
//           open={newComplianceDialogOpen}
//           handleClose={() => setNewComplianceDialogOpen(false)}
//           complianceText={complianceText}
//         />
//         {/* <ApiKeyDialogFull
//           open={apiDialogOpen}
//           handleClose={() => setApiDialogOpen(false)}
//           setParentApiKey={setApiKey}
//           setApiTitle={setApiTitle}
//           setComplianceText={setComplianceText}
//           selectedService="guardrail"
//         /> */}
//         <ApiKeyDialogFull
//           open={apiDialogOpen}
//           handleClose={() => setApiDialogOpen(false)}
//           setParentApiKey={setApiKey}
//           setApiTitle={setApiTitle}
//           setComplianceText={setComplianceText}
//           // selectedService="guardrail"
//           selectedService={[]}
//           selectedMultiple={true}
//           optionArray={serviceData}
//         />
//         <EditComplianceDialog
//           open={isOpenEditComplianceDialog}
//           onClose={() => setIsOpenEditComplianceDialog(false)}
//           complianceText={complianceText}
//           apiKey={apiKey}
//           apiTitle={apiTitle}
//           setComplianceText={setComplianceText}
//         />
//       </div>
//     </div>
//   );
// }
