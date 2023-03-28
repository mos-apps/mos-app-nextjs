//import { responseTypes } from "@/utils/types";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const verifyRecaptcha = async (token:string) => {
  const secretKey = process.env.RECAPTHA_SECRET_KEY;

  var verificationUrl =
    "https://www.google.com/recaptcha/api/siteverify?secret=" +
    secretKey +
    "&response=" +
    token;

  return await axios.post(verificationUrl);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    // console.log(req.body);
    
    const name = req.body.name;
    const email = req.body.email;
    const token = req.body.gRecaptchaToken;

    // Recaptcha response
    const response = await verifyRecaptcha(token);
    //console.log(response);
    
    // Checking if the reponse sent by reCaptcha success or not and if the score is above 0.5
    // In ReCaptcha v3, a score sent which tells if the data sent from front end is from Human or from Bots. If score above 0.5 then it is human otherwise it is bot
    // For more info check, https://developers.google.com/recaptcha/docs/v3
    // ReCaptcha v3 response, {
    //     "success": true|false,      // whether this request was a valid reCAPTCHA token for your site
    //     "score": number             // the score for this request (0.0 - 1.0)
    //     "action": string            // the action name for this request (important to verify)
    //     "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    //     "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
    //     "error-codes": [...]        // optional
    //   }
    if (response.data.success && response.data.score >= 0.5) {
      await axios.post("https://oxffogo3ch.execute-api.eu-west-1.amazonaws.com/dev/send", {
        data: {
          fromName: name,
          to: email,
          ...req.body
          // message, subject, from
        }
      })
      
      return res
        .status(200)
        .json({ status: "success", message: "Thank you for your message. We will try to get back to you as soon as possible." });
    } else {
      return res.json({
        status: "error",
        message: "Something went wrong, please try again!!!",
      });
    }
  } catch (error) {
    console.log("ERRRRROr", error);
    res.json({
      status: "error",
      message: "Something went wrong, please try again!!!",
    });
  }
}

