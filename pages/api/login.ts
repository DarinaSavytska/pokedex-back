import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { password } = req.body;

  if (password === process.env.PAGE_PASSWORD) {
    res.setHeader("Set-Cookie", `auth=1; Path=/; HttpOnly; SameSite=Strict`);
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ success: false });
}
