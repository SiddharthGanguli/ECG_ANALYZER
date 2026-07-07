from pathlib import Path
import os
import yaml

from ecg_analyzer.entity.entity import (
    DataIngestionConfig

)


class ConfigManager:

    def __init__(self, config_path: Path):
        self.config = self._read_yaml(config_path)

    def _read_yaml(self, filepath: Path):
        if not filepath.exists():
            raise FileNotFoundError(f"{filepath} does not exist.")

        with open(filepath, "r", encoding="utf-8") as file:
            return yaml.safe_load(file)

    def get_data_ingestion_config(self):

        ingestion = self.config["data_ingestion"]

        root_dir = Path(ingestion["root_dir"])
        source_dir = Path(ingestion["source_dir"])
        raw_data_dir = Path(ingestion["raw_data_dir"])

        os.makedirs(root_dir, exist_ok=True)
        os.makedirs(raw_data_dir, exist_ok=True)

        return DataIngestionConfig(
            root_dir=root_dir,
            source_dir=source_dir,
            raw_data_dir=raw_data_dir,
            train_file_name=ingestion["train_file_name"],
            test_file_name=ingestion["test_file_name"],
        )