"use client";

import DashboardCards from "@/components/molecules/dashboard/DashboardCards";
import { addApiUsageData } from "@/store/reducers/dashboardSlice";
import { getApiKeys } from "@/utils/apiUtils";
import baseUrl from "@/utils/baseUrl";
import ArticleIcon from "@mui/icons-material/Article";
import PaymentIcon from "@mui/icons-material/Payment";
import { Box, Button, Card, MenuItem, Select } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import axios from "axios";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.css";

import PageLayout from "@/components/common/PageLayout";
import LoginDialog from "@/components/dialogs/login";
import axiosInstance from "@/components/utils/axios";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import TollIcon from "@mui/icons-material/Toll";
import CardWithImage from "./Card";

//Dark Card Images
import GuardialCardDark from "@/public/images/dashboard/Guardrail Image dark.svg";
import HallucinationCardDark from "@/public/images/dashboard/Hallucination Image dark.svg";
import PiiCardDark from "@/public/images/dashboard/PII Image dark.svg";

//light Images
import GuardRailCard from "@/public/images/dashboard/light/Guardrail image.svg";
import HallucinationCard from "@/public/images/dashboard/light/Hallucination.svg";
import PiiCard from "@/public/images/dashboard/light/PII.svg";
import MobileCard from "./MobileCard";
import LoginFirstPopUp from "../../login/popups/LogInFirstPopUps";
import LoginSecondPopUp from "../../login/popups/LoginSecondPopUp";

export default function DashboardPage() {
  const dispatch = useDispatch();
  const apiUsageData = useSelector(
    (state: any) => state.dashboard.apiUsageData
  );
  const [apiKeys, setApiKeys] = useState([]);

  const [selectedApi, setSelectedApi] = useState("all");
  const searchParams = useSearchParams();
  const apiKey = searchParams.get("apiKey");

  const onSelectedApiChange = (event: any) => {
    setSelectedApi(event.target.value);
  };

  const [compiled, setCompiled] = useState(apiUsageData?.complied);
  const [notCompiled, setNotCompiled] = useState(apiUsageData?.notComplied);

  const [last7Days, setLast7Days] = useState(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.getDate());
    }
    return days;
  });

  // const [last7DaysLabels, setLast7DaysLabels] = useState(() => {
  //   const days = [];
  //   for (let i = 6; i >= 0; i--) {
  //     const date = new Date();
  //     date.setDate(date.getDate() - i);
  //     days.push(moment(date).format("MMM Do"));
  //   }
  //   return days;
  // });

  const date = new Date();
  const today = date.getDate();
  const currentMonth = moment(today).format("MMM");
  const lastMonth = moment(today).subtract(1, "month").format("MMM");

  const [last7DaysData, setLast7DaysData] = useState<number[]>([]);

  // useEffect(() => {
  //   if (apiUsageData?.records) {
  //     const groupedData = apiUsageData?.records.reduce(
  //       (acc: any, record: any) => {
  //         const date = new Date(record.createdAt).getDate();
  //         if (!acc[date]) {
  //           acc[date] = { totalRecords: 0 };
  //         }
  //         acc[date].totalRecords += 1;
  //         return acc;
  //       },
  //       {}
  //     );
  //     console.log(groupedData, "groupedData");
  //     const data = last7Days.map((day) => {
  //       return groupedData[day]?.totalRecords || 0;
  //     });
  //     setLast7DaysData(data);
  //   }
  // }, [last7Days, apiUsageData]);

  const setPrevious7Days = () => {
    const days = [];
    for (let i = 13; i >= 7; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.getDate());
    }
    setLast7Days(days);
  };

  const setNext7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date.getDate());
    }
    setLast7Days(days);
  };

  const getApiUsage = async () => {
    try {
      const userInfo: any = localStorage.getItem("userInfo");
      const token = JSON.parse(userInfo)?.access_token;

      const url =
        selectedApi !== "all"
          ? `${baseUrl}/api-usage?service=guardrail&from=2024-01-01T00%3A00%3A00.000Z&to=2024-12-31T23%3A59%3A59.999Z&apiKeyID=${selectedApi}`
          : `${baseUrl}/api-usage?service=guardrail&from=2024-01-01T00%3A00%3A00.000Z&to=2024-12-31T23%3A59%3A59.999Z`;
      const res: any = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(addApiUsageData(res.data.data));
      setCompiled(res.data.data.complied);
      setNotCompiled(res.data.data.notComplied);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const tilesData = [
    {
      title: "Credits Utilized",
      value: apiUsageData.creditsUtilized
        ? parseFloat(apiUsageData?.creditsUtilized).toFixed(3)
        : undefined,
      type: "credit",
      icon: <PaymentIcon sx={{ height: "2.5rem", width: "2.5rem" }} />,
    },
    {
      title: "Total Records",
      value: apiUsageData?.totalRecords,
      icon: <ArticleIcon sx={{ height: "2.5rem", width: "2.5rem" }} />,
    },
    {
      title: "Tokens Processed",
      value: apiUsageData?.tokensProcessed,
      icon: <TollIcon sx={{ height: "2.5rem", width: "2.5rem" }} />,
    },
    {
      title: "Docs Processed",
      value: apiUsageData?.docsProcessed,
      icon: <FolderCopyIcon sx={{ height: "2.5rem", width: "2.5rem" }} />,
    },
  ];

  useEffect(() => {
    getApiUsage();

    const getKeys = async () => {
      const { data } = await getApiKeys();
      setApiKeys(data);
    };

    getKeys();
  }, [getApiKeys]);

  useEffect(() => {
    getApiUsage();
  }, [selectedApi]);

  const router = useRouter();

  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [apikeyName, setApikeyName] = useState("Api Key");
  const [apikey, setApiKey] = useState(
    "67da643621a7a4bcb1c587a4.5928bc5a50171e60493cc04a36523e00"
  );

  const toogleFirstModal = () => {
    setShowFirstModal((prev) => !prev);
    setShowSecondModal(false);
  };

  const callBackFirstModal = (apiKey: string) => {
    setApiKey(() => apiKey);
    toogleSecondModal();
  };

  const toogleSecondModal = () => {
    setShowSecondModal((prev) => !prev);
    setShowFirstModal(false);
  };

  const checkFlag = async () => {
    try {
      const res = await axiosInstance.get("/auth/user-details");

      if (!res?.data?.data?.isOnboarded) {
        setShowFirstModal(() => true);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    checkFlag();
  }, []);

  return (
    <PageLayout label="Dashboard">
      {" "}
      <div className="root-container">
        {showFirstModal && (
          <LoginDialog step={1} onClose={toogleFirstModal} className="middle">
            <LoginFirstPopUp
              callback={callBackFirstModal}
              apikey={apikeyName}
              setApiKey={setApikeyName}
            />{" "}
          </LoginDialog>
        )}
        {showSecondModal && (
          <LoginDialog step={2} onClose={toogleSecondModal}>
            <LoginSecondPopUp
              callback={() => router.push("/dashboard")}
              apikey={apikey}
            />{" "}
          </LoginDialog>
        )}

        <div className="dashboard_card_container">
          <CardWithImage
            title="Guardrail"
            description="Sorem ipsum dolor sit amet, consectetur adipiscing elit."
            rightImageDark={GuardialCardDark}
            rightImageSrc={GuardRailCard}
            links="/guard-rail/playground"
          />
          <CardWithImage
            title="PII"
            rightImageSrc={PiiCard}
            description="Sorem ipsum dolor sit amet, consectetur adipiscing elit."
            rightImageDark={PiiCardDark}
            links="/pii"
          />
          <CardWithImage
            title="Hallucination"
            rightImageSrc={HallucinationCard}
            rightImageDark={HallucinationCardDark}
            description="Sorem ipsum dolor sit amet, consectetur adipiscing elit."
            links="/hallucination"
          />
        </div>
        <MobileCard />
        {false && (
          <div className="main-container">
            <section className="api-dashboard  w-full">
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <span className="page-title">Dashboard</span>
                <Box>
                  {/* <span style={{ fontSize: "1rem" }}>Showing data for : </span> */}
                  <Select
                    value={selectedApi}
                    onChange={(e) => onSelectedApiChange(e)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      marginRight: "1rem",
                      width: "10rem",
                      borderRadius: "12px",
                      border: "transparent",
                      height: "2.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    <MenuItem value="all">All apis</MenuItem>
                    {apiKeys?.map((key: any, i) => {
                      return (
                        <MenuItem key={i} value={key._id}>
                          {key.title}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                {tilesData.map((tile, i) => {
                  return (
                    <DashboardCards
                      key={i}
                      title={tile.title}
                      data={tile.value}
                      type={tile.type}
                      icon={tile.icon}
                    />
                  );
                })}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  marginTop: "1.25rem",
                  marginRight: "1rem",
                }}
              >
                <Card
                  sx={{ flex: 3.1, boxShadow: "none", borderRadius: "12px" }}
                >
                  <BarChart
                    yAxis={[
                      {
                        scaleType: "band",
                        categoryGapRatio: 0.45,
                        colorMap: {
                          type: "ordinal",
                          colors: ["#1976d2", "#FF5733"],
                        },
                        data: ["Comply", "Not Comply"],
                      } as any,
                    ]}
                    xAxis={[
                      {
                        disableLine: true,
                        disableTicks: true,
                        tickLabelStyle: { display: "none" },
                      },
                    ]}
                    series={[{ data: [compiled, notCompiled] }]}
                    layout="horizontal"
                    height={225}
                    sx={{
                      paddingY: "0.75rem",
                      paddingX: "1rem",
                      marginLeft: "12px",
                    }}
                    borderRadius={10}
                  />
                </Card>
                <Box
                  sx={{
                    flex: 1,
                    paddingLeft: "1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Card
                    sx={{ flex: 1, boxShadow: "none", borderRadius: "12px" }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "1.2rem",
                        paddingTop: "1.5rem",
                        paddingBottom: "1.25rem",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          backgroundColor: "#1976d2",
                          borderRadius: "50%",
                          marginRight: "0.5rem",
                        }}
                      ></span>
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "200",
                          color: "grey",
                        }}
                      >
                        Complied
                      </span>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "400",
                          marginTop: "0.25rem",
                        }}
                      >
                        {apiUsageData?.complied}
                      </div>
                    </div>
                  </Card>
                  <Card
                    sx={{
                      flex: 1,
                      marginTop: "1rem",
                      boxShadow: "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "1.2rem",
                        paddingTop: "1.5rem",
                        paddingBottom: "1.25rem",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          backgroundColor: "#FF5733",
                          borderRadius: "50%",
                          marginRight: "0.5rem",
                        }}
                      ></span>
                      <span
                        style={{
                          fontSize: "1rem",
                          fontWeight: "200",
                          color: "grey",
                        }}
                      >
                        Not Complied
                      </span>
                      <div
                        style={{
                          fontSize: "1.25rem",
                          fontWeight: "400",
                          marginTop: "0.25rem",
                        }}
                      >
                        {apiUsageData?.notComplied}
                      </div>
                    </div>
                  </Card>
                </Box>
              </Box>
              {last7Days.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "1.25rem",
                    marginRight: "1rem",
                  }}
                >
                  <Card
                    sx={{
                      flex: 1,
                      marginBottom: "1.25rem",
                      boxShadow: "none",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "1rem",
                        fontSize: "1.15rem",
                        fontWeight: "200",
                        color: "grey",
                      }}
                    >
                      Data processed in past week
                    </div>
                    <LineChart
                      xAxis={[
                        {
                          data: last7Days,
                          valueFormatter(value, context) {
                            if (value > 0 && value <= today) {
                              return moment().date(value).format("MMM Do");
                            }
                            return moment()
                              .subtract(1, "month")
                              .date(value)
                              .format("MMM Do");
                          },
                          scaleType: "band",
                        },
                      ]}
                      series={[
                        {
                          curve: "linear",
                          data: last7DaysData,
                          color: "#2488fd",
                        },
                      ]}
                      height={300}
                    />
                    <div
                      style={{ display: "flex", justifyContent: "center" }}
                      className="graph-buttons"
                    >
                      <Button
                        variant="outlined"
                        onClick={setPrevious7Days}
                        sx={{ marginBottom: "1rem", borderRadius: "5rem" }}
                        // disabled={last7Days.includes(14)}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={setNext7Days}
                        sx={{
                          marginBottom: "1rem",
                          borderRadius: "5rem",
                          marginLeft: "0.7rem",
                        }}
                        // disabled={last7Days.includes(21)}
                      >
                        Next
                      </Button>
                    </div>
                  </Card>
                </Box>
              )}
            </section>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
