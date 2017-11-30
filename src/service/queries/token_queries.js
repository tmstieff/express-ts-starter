"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSERT_TOKEN = `INSERT INTO token 
  (user_id, token, expiration_date)
  VALUES
  ($1, $2, $3) RETURNING token`;
exports.TOKEN_BY_TOKEN = `SELECT t.*, au.*
  FROM token t
  INNER JOIN app_user au ON au.id = t.user_id
  WHERE t.token = $1
  AND t.expiration_date > CURRENT_DATE`;
exports.DELETE_TOKEN_BY_TOKEN = `DELETE FROM token t
  WHERE t.token = $1`;
//# sourceMappingURL=tokenQueries.js.map