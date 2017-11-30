"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMAGE_BY_ID = `SELECT * FROM image i WHERE i.id = $1`;
exports.INSERT_IMAGE = `INSERT INTO image (blob, filename, mime_type)
  VALUES ($1, $2, $3) RETURNING id`;
exports.DELETE_IMAGE_BY_ID = `DELETE FROM image i WHERE i.id = $1`;
//# sourceMappingURL=imageQueries.js.map