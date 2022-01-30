const express = require("express");
const app = express();

const { body, validationResult } = require("express-validator");

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: "esotelo.design@gmail.com",
      clientId: "358911020238-qdps1lsamfosi78p42s2nuuc4d34do12",
      clientSecret: "yrrQpW2ky_ob3hmbPATInJK6",
      refreshToken:
        "1//04ts_bRuZRN1ICgYIARAAGAQSNwF-L9Ir4ye17RA3XpYd5YSf4-SgaTawSd8CFM7iKqm1RMJI6TDwAjKaUEjphm8mDTNgMUpgto8",
      accessToken:
        "ya29.a0ARrdaM_6Bap76F3mIJ81hs41BWzHAv0WbgFK-ct5If3fjadpmnll9K0Rew9TM8gVIEV8oJLn0uud-UqhsC4hcSLxl07DkbGF6v2uZZJGJWR45P118269tKLtntPC27xkW5xBAzAKegt-5X4wtHRO8oXBOKiQ",
      expires: 1484314697598,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "esotelo.design@gmail.com",
    subject: `Message from ${req.body.name}, ${req.body.email}: ${req.body.subject}`,
    html: `<h1>Contact details</h1>
            <h2> name:${req.body.name} </h2><br>
            <h2> email:${req.body.email} </h2><br>
            <h2> phonenumber:${req.body.phonenumber} </h2><br>
            <h2> message:${req.body.message} </h2><br>`,
  };

  if (req.body.name.trim().length === 0) {
    return res.status(400).json({ error: "Name is required" });
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
