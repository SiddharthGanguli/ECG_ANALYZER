from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir: Path
    source_dir: Path
    raw_data_dir: Path

    train_file_name: str
    test_file_name: str

@dataclass(frozen=True)
class DataValidationConfig:
    root_dir: Path
    raw_data_dir: Path
    train_file_name: str
    test_file_name: str
    status_file: Path
    expected_number_of_columns: int
    target_column_index: int
    allowed_target_classes: list[int]