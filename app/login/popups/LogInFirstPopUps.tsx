import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axiosInstance from "@/components/utils/axios";
import Button from "@/components/common/Buttons";

export const copy = (text: string) => {
  if (text) {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard!");
    });
  } else {
    toast.error("Nothing to copy!");
  }
};

const LoginFirstPopUp = ({
  callback,
  apikey,
  setApiKey,
}: {
  callback: (apiKey: string) => void;
  setApiKey: Dispatch<SetStateAction<string>>;
  apikey: string;
}) => {
  const [loader, setLoader] = useState(false);

  const handleCopy = () => {
    copy(apikey);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoader(() => true);
    try {
      const payload = {
        services: ["6796725d2e591346df300cf9", "6796725d2e591346df300cfa"],
        title: "myfirstguardrailapikey",
      };
      const res = await axiosInstance.post(`api-key/create`, payload);
      const res1 = await axiosInstance.post(`auth/user-onboard`, {});

      const api = res?.data?.data?.apiKey;
      setLoader(() => false);
      callback(api);
    } catch (error) {
      console.log("error ", error);
      setLoader(() => false);
      toast.error("Something Went Wrong");
    }
  };
  return (
    <form className="login_firstPopUp_form" onSubmit={handleSubmit}>
      <label>
        <div className="api_key_name">API Key Name</div>
        <div className="input_container">
          <input
            type="text"
            value={"My-first-guardrail-api-key"}
            placeholder="Type"
            required
          />
          <ContentCopyIcon
            className="copy_Icon"
            onClick={handleCopy}
            style={{ cursor: "pointer" }}
          />
        </div>
      </label>
      <Button
        type="submit"
        className="d-flex justify-content-center align-items-center"
        isLoading={loader}
      >
        Submit
      </Button>
    </form>
  );
};

export default LoginFirstPopUp;
