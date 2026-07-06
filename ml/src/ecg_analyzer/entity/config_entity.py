from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir: Path
    source_dir: Path
    raw_data_dir: Path

    train_file_name: str
    test_file_name: str