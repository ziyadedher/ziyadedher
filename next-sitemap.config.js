/* eslint-disable import/no-commonjs -- exception for configuration files. */
/* eslint-disable import/unambiguous -- exception for configuration files. */

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // eslint-disable-next-line node/no-process-env -- sitemap configuration
  siteUrl: process.env.SITE_URL ?? "https://www.ziyadedher.com",
  generateRobotsTxt: true,
};
