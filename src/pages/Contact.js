import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { SendEmail } from "../utilis/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../utilis/Toast";
import { usePageTitle } from "../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Contact");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [send, setSend] = useState();

  useEffect(() => {
    if (send) {
      toast.success(send.msg);
      setFirstName("");
      setLastName("");
      setEmail("");
      setNumber("");
      setMessage("");
      setSend();
    }
  }, [send]);

  const onSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    SendEmail({ FirstName, LastName, email, number, message, setSend })
      .then(() => setButtonLoading(false))
      .catch(() => setButtonLoading(false));
  };

  return (
    <>
      <Toast />
      <Box
        sx={{
          maxWidth: 720,
          mx: "auto",
          px: { xs: 2, sm: 3 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" fontWeight="700" color="text.primary" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Got a question? Send us a message below.
          </Typography>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 2, borderColor: "grey.200" }}>
          <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
            <form onSubmit={onSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First name"
                    placeholder="Enter your first name"
                    value={FirstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last name"
                    placeholder="Enter your last name"
                    value={LastName}
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone number"
                    type="tel"
                    placeholder="+254 ..."
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    placeholder="Send us a message and we'll reply as soon as possible."
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined"
                    multiline
                    rows={5}
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={buttonLoading}
                    sx={{
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    {buttonLoading ? "Sending…" : "Send message"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Contact;
