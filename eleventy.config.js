module.exports = function (eleventyConfig) {
  // Static assets copied as-is
  eleventyConfig.addPassthroughCopy({ "static": "/" });
  eleventyConfig.addPassthroughCopy({ "admin": "/admin" });

  // WhatsApp helper: digits only
  eleventyConfig.addFilter("waDigits", (num) => String(num || "").replace(/\D/g, ""));

  // Extract a YouTube video ID from any common URL format (or a bare ID)
  eleventyConfig.addFilter("ytId", (url) => {
    const v = String(url || "").trim();
    if (!v) return "";
    const m = v.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([A-Za-z0-9_-]{11})/);
    if (m) return m[1];
    return /^[A-Za-z0-9_-]{11}$/.test(v) ? v : "";
  });

  // Build date for sitemap
  eleventyConfig.addGlobalData("buildDate", () => new Date().toISOString().split("T")[0]);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
