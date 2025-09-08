const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body || !body.url) {
    return res.status(400).json({ error: "URL is required in the request body." });
  }

  const shortID = shortid.generate();

  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  handleGenerateShortUrl,
  handleGetAnalytics,
};
