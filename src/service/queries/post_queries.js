"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LATEST_POSTS_PAGED = "SELECT p.*, au.username, au.first_name, au.last_name\n  FROM post p \n  INNER JOIN app_user au ON au.id = p.created_user_id \n  ORDER BY p.created_timestamp DESC\n  LIMIT $1 OFFSET $2";
exports.INSERT_POST = "INSERT INTO post (title, body, created_user_id, updated_user_id)\n  VALUES ($1, $2, $3, $3) RETURNING id";
exports.POST_BY_ID = "SELECT p.* FROM post p WHERE p.id = $1";
exports.DELETE_POST_BY_ID = "DELETE FROM post p WHERE p.id = $1";
