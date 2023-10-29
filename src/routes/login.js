const express = require("express");
const router = express.Router();

router.get("/test", async (req, res) => {
  try {
    return res.status(200).json({ message: "good to go." });
  } catch {}
});

router.get("/", async (req, res) => {
  try {
    return res.status(200).json({ message: "good to go//////." });
  } catch {}
});

module.exports = router;
