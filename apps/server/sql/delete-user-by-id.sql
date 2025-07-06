BEGIN;

DELETE FROM participants WHERE userId = :user_id;

DELETE FROM users WHERE id = :user_id;

DELETE FROM user_profile WHERE id = :user_id;

COMMIT;