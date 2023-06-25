import express from 'express';
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'
import rateLimit from 'express-rate-limit'
import fetch from "node-fetch";
const API_TOKEN="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"

 dotenv.config()
 const app = express();

//  const limiter = rateLimit({
//     windowMs: 5 * 60 * 1000,
//     max: 5, // Limits each IP to 5 per 15 minutes
//     message:
//       `<h1 style='display:flex; align-items:center; justify-content:center; height:100vh'>
//        429 - Too many Requests <br> Try again later!
//       </h1>`,
//   });
  
  // Apply to all requests
//   app.use(limiter);

// Stopped giving free credits
//  const configuration = new Configuration({
//     apiKey: "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",
//  });
//  const openai = new OpenAIApi(configuration);


 app.use(cors())

 app.use(express.json())

 app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from CodeX',
    })
 })

 app.post('/', async (req, res) => {
    try{
         console.log("i am here")
         const prompt = req.body.prompt;
         console.log(prompt)
         const response = await fetch(
         "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
         {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: prompt,
         }
         );
         const result = await response.json();
         console.log(result.generated_text)
         res.status(200).send({
               bot: `${result.generated_text}`
         })

    }catch(error){
        console.log(error)
        res.status(500).send({ error })
    }
 })
// async function query(data) {
//     const response = await fetch(
//         "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
//         {
//             headers: { Authorization: `Bearer ${API_TOKEN}` },
//             method: "POST",
//             body: JSON.stringify(data),
//         }
//     );
//     const result = await response.json();
//     return result;
// }
// query("who is the main character in breaking bad?").then((response) => {
//     console.log(response.generated_text);
// });
// [{"generated_text":"Can you please let us know more details about your ids as a subscriber or other related project? Be sure to update your username and password or it will be stolen via email. Our information is only accessible through our website, and the payment support services"}]

 app.listen(5000, () => console.log('Server is running on port http://localhost:5000'))