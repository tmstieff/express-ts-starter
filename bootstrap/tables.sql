CREATE TABLE app_user
(
    id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    activated BOOLEAN DEFAULT false NOT NULL,
    first_login BOOLEAN DEFAULT true NOT NULL,
    biography TEXT,
    profile_image_id INTEGER DEFAULT 1 NOT NULL
);

CREATE TABLE image
(
    id SERIAL PRIMARY KEY NOT NULL,
    blob BYTEA,
    filename VARCHAR(64),
    mime_type VARCHAR(32)
);

CREATE TABLE post
(
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    created_timestamp TIMESTAMP DEFAULT now() NOT NULL,
    created_user_id INTEGER NOT NULL,
    updated_timestamp TIMESTAMP DEFAULT now() NOT NULL,
    updated_user_id INTEGER NOT NULL
);

CREATE TABLE role
(
    id SERIAL PRIMARY KEY NOT NULL,
    role VARCHAR(32) NOT NULL
);

CREATE TABLE token
(
    token VARCHAR(32) PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL,
    expiration_date DATE DEFAULT ('now'::text)::date NOT NULL
);

CREATE TABLE user_role
(
    user_id INTEGER NOT NULL,
    role_id INTEGER NOT NULL,
    CONSTRAINT user_role_pk PRIMARY KEY (user_id, role_id)
);

CREATE UNIQUE INDEX app_user_id_uindex ON app_user (id);
CREATE UNIQUE INDEX app_user_username_uindex ON app_user (username);
CREATE UNIQUE INDEX image_id_uindex ON image (id);
ALTER TABLE post ADD FOREIGN KEY (created_user_id) REFERENCES app_user (id);
CREATE UNIQUE INDEX post_id_uindex ON post (id);
CREATE INDEX post_created_user_id_index ON post (created_user_id);
CREATE INDEX post_updated_user_id_index ON post (updated_user_id);
CREATE UNIQUE INDEX role_id_uindex ON role (id);
CREATE UNIQUE INDEX role_role_uindex ON role (role);
ALTER TABLE token ADD FOREIGN KEY (user_id) REFERENCES app_user (id);
ALTER TABLE user_role ADD FOREIGN KEY (app_user_id) REFERENCES app_user (id);
ALTER TABLE user_role ADD FOREIGN KEY (role_id) REFERENCES role (id);
