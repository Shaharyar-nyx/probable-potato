module.exports = {
  apps: [
    {
      name: "cyberbay-website-nextjs",
      exec_mode: "cluster", // Enable clustering
      instances: "1",
      script: "yarn",
      args: "start",
      cwd: "./",
      env: {
        NODE_ENV: "development",
        PORT: 3012,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3013,
      },
    },
  ],
};
