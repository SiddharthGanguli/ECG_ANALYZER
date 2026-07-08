from supabase import create_client

from app.core.config import settings

# Initialize Supabase Client
supabase = create_client(
    settings.SUPABASE_URL,
    settings.SUPABASE_SERVICE_ROLE_KEY
)


def upload_ecg_file(
    file_bytes: bytes,
    destination_path: str,
):
    """
    Upload ECG CSV file to Supabase Storage.
    """

    response = (
        supabase.storage
        .from_(settings.SUPABASE_STORAGE_BUCKET)
        .upload(
            path=destination_path,
            file=file_bytes,
            file_options={
                "content-type": "text/csv",
                "upsert": "false"
            }
        )
    )

    return response


def get_public_url(path: str):
    """
    Returns the file URL.
    (Works even for private buckets if you later switch to signed URLs.)
    """

    return (
        supabase.storage
        .from_(settings.SUPABASE_STORAGE_BUCKET)
        .get_public_url(path)
    )