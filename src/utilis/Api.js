import { sendContact } from "../api/contact";

/** Send contact form to backend. Calls setSend with response data on success. */
export const SendEmail = async ({
  FirstName,
  LastName,
  email,
  number,
  message,
  setSend,
}) => {
  try {
    const data = await sendContact({ FirstName, LastName, email, number, message });
    if (data?.code === 1 && setSend) setSend(data);
    else if (data?.msg) setSend({ msg: data.msg });
  } catch (err) {
    const msg = err.response?.data?.msg || err.message || "Failed to send message";
    if (typeof alert !== "undefined") alert(msg);
    throw err;
  }
};
