-- Users ----------------------------
-------------------------------------
-- First 99 IDs are available for use

-- admin@admin.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (1, 'admin@admin.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'Admin', 'User', true, false, 'A default admin profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO user_role (user_id, role_id) VALUES (1, 2);

-- admin2@admin.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (2, 'admin2@admin.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'Admin2', 'User', true, false, 'A default admin profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO user_role (user_id, role_id) VALUES (2, 2);

-- admin3@admin.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (3, 'admin3@admin.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'Admin3', 'User', true, false, 'A default admin profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO user_role (user_id, role_id) VALUES (3, 2);

-- user@user.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (4, 'user@user.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'User', 'User', true, false, 'A default user profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (4, 1);

-- user2@user.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (5, 'user2@user.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'User2', 'User', true, false, 'A default user profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (5, 1);

-- user3@user.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (6, 'user3@user.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'User3', 'User', true, false, 'A default user profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (6, 1);

-- user4@user.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (7, 'user4@user.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'User4', 'User', true, false, 'A default user profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (7, 1);

-- user5@user.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (8, 'user5@user.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'User5', 'User', true, false, 'A default user profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (8, 1);

-- user6@user.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (9, 'user6@user.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'User6', 'User', true, false, 'A default user profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (9, 1);

-- user7@user.com / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (10, 'user7@user.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'User7', 'User', true, false, 'A default user profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (10, 1);
