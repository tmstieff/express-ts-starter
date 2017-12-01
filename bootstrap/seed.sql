INSERT INTO role (id, role) VALUES (1, 'user');
INSERT INTO role (id, role) VALUES (2, 'admin');

-- Admin / password
INSERT INTO app_user (id, username, password, first_name, last_name, activated, first_login, biography, profile_image_id) VALUES (1, 'admin@admin.com', '$2a$10$xhKtgwEXchTQ54szPuxG9eBxsO0fNh9qn0vLEQ/K8ZkURP6BjCs0.', 'Admin', 'User', true, false, 'A default admin profile.', 46);
INSERT INTO user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO user_role (user_id, role_id) VALUES (1, 2);
