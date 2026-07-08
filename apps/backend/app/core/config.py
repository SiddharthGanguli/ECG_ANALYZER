from dotenv import load_dotenv
import os

load_dotenv()


class Settings:

    DATABASE_URL = os.getenv("DATABASE_URL")

    SUPABASE_URL = os.getenv("SUPABASE_URL")

    SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    SUPABASE_STORAGE_BUCKET = os.getenv("SUPABASE_STORAGE_BUCKET")


settings = Settings()