module.exports = {
  apps: [
    {
      name: "lohongka-merchant-update",
      script: "./index.js",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      error_file: "./log/error.log",
      out_file: "./log/out.log",
    },
  ],
};
