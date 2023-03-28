import axios from "axios";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let url =
      `https://www.londonprayertimes.com/api/times/?format=json&key=${process.env.SALAH_API_KEY}&24hours=true`;
    const dateobj = new Date();
    let month: number | string = dateobj.getMonth() + 1;
    let year: number | string = dateobj.getFullYear();
    let result = {} as any;

    if (req.query["type"] === "month")
      url = `${url}&year=${year}&month=${month}`;

    const data = await axios.get(url);

    if (month < 10) month = `0${month}`;
    let day: number | string = dateobj.getDate();
    if (day < 10) day = `0${day}`;
    const today: string = `${year}-${month}-${day}`;

    result["today"] = data.data.times[today];
    result["nameofthemonth"] = `${moment(today).format("MMMM")} ${year}`;

    //sort by days
    Object.keys(data.data.times)
      .sort()
      .forEach(function (key) {
        var value = data.data.times[key];
        delete data.data.times[key];
        data.data.times[key] = value;
      });

    const days: any[] = [];
    Object.keys(data.data.times).forEach(function (key) {
      data.data.times[key]["day"] = moment(key).date();
      data.data.times[key]["dayoftheweek"] = moment(key).format("ddd");
      days.push(data.data.times[key]);
    });

    result["month"] = days;
    // console.log(result);

    res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};
