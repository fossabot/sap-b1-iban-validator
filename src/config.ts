import "./env";

interface DB_CONFIG {
  host: string;
  user: string;
  password: string;
  database: string;
}

export const get_connection_string = (): string => {
  const db_auth: DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  };
  return `mssql://${db_auth.user}:${db_auth.password}@${db_auth.host}/${
    db_auth.database
  }`;
};
