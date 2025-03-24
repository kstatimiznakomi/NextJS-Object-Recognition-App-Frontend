import axios from "axios";

export const webcamSendToAPI = async (imgBase64: string) => {
  // console.log(convert(imgBase64));
  await axios
    .post("/api/webcam-detection", {
      method: "POST",
      body: JSON.stringify({
        imageBase64: imgBase64,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
    });
};
