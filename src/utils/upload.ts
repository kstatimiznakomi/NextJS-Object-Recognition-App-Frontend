import axios from "axios";

export const uploadImage = async (images: File) => {
  const fd = new FormData();
  fd.append("images", images);
  var res = await axios
    .post("http://localhost:3000/api-v1/upload", fd)
    .then((res) => {
      return res.data.msg;
    })
    .catch((e) => {
      return e;
    });
  return res;
};
