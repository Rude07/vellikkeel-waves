module.exports = function (eleventyConfig) {
  // Static assets copied as-is
  eleventyConfig.addPassthroughCopy({ "static": "/" });
  eleventyConfig.addPassthroughCopy({ "admin": "/admin" });

  // WhatsApp helper: digits only
  eleventyConfig.addFilter("waDigits", (num) => String(num || "").replace(/\D/g, ""));

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
