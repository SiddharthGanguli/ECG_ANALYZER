from pathlib import Path
import os
import yaml

from ecg_analyzer.entity.config_entity import (
    DataIngestionConfig,
    DataValidationConfig,
)


class ConfigManager:
    def __init__(self, config_path: Path):
        self.config = self._read_yaml(config_path)

    def _read_yaml(self, filepath: Path):
        if not filepath.exists():
            raise FileNotFoundError(f"{filepath} does not exist.")

        with open(filepath, "r", encoding="utf-8") as file:
            return yaml.safe_load(file)

    def get_data_ingestion_config(self) -> DataIngestionConfig:
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

    def get_data_validation_config(self) -> DataValidationConfig:
        validation = self.config["data_validation"]

        root_dir = Path(validation["root_dir"])
        raw_data_dir = Path(validation["raw_data_dir"])
        status_file = Path(validation["status_file"])

        os.makedirs(root_dir, exist_ok=True)
        os.makedirs(status_file.parent, exist_ok=True)

        return DataValidationConfig(
            root_dir=root_dir,
            raw_data_dir=raw_data_dir,
            train_file_name=validation["train_file_name"],
            test_file_name=validation["test_file_name"],
            status_file=status_file,
            expected_number_of_columns=int(validation["expected_number_of_columns"]),
            target_column_index=int(validation["target_column_index"]),
            allowed_target_classes=[
                int(value)
                for value in validation["allowed_target_classes"]
            ],
        )