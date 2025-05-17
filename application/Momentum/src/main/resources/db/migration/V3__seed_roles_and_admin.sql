INSERT INTO roles (name) VALUES ('ROLE_USER'), ('ROLE_ADMIN');

INSERT INTO users (username, password) VALUES ('admin', '$2a$10$fYiShEzqQ.JSO2YeOcgCC.jbc9gnmZGE4V4dlFboMgApJ.8g0bRFu');

INSERT INTO users_roles(role_id, user_id) VALUES (2, 1);

