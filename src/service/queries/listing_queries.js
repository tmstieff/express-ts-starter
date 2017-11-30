"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LATEST_LISTINGS_PAGED = `SELECT l.*, au.username, au.first_name, au.last_name
  FROM listing l 
  INNER JOIN app_user au ON au.id = l.created_user_id 
  ORDER BY l.created_timestamp DESC
  LIMIT $1 OFFSET $2`;
//# sourceMappingURL=listingQueries.js.map