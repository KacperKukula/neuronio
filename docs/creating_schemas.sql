DO $$
DECLARE
    user_name text := 'neuronio';
    schema_name text := 'emmpy_for_now';
BEGIN
    schema_name:= 'user'

    EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);
    EXECUTE format('GRANT ALL PRIVILEGES ON SCHEMA %I TO %I', schema_name, user_name);
    EXECUTE format('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA %I TO %I', schema_name, user_name);

    schema_name:= 'courses'

    EXECUTE format('CREATE SCHEMA IF NOT EXISTS %I', schema_name);
    EXECUTE format('GRANT ALL PRIVILEGES ON SCHEMA %I TO %I', schema_name, user_name);
    EXECUTE format('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA %I TO %I', schema_name, user_name);
END $$;