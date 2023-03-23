const cfg = {
  host: "localhost",
  port: "5432",
  username: "postgres",
  password: "",
  dialect: "postgres",
  database: "hackathon2023",
  salt_rounds: 8,
  token_size: 64,
  logging: false,
  recommendation_length: 50,
};

module.exports = cfg;