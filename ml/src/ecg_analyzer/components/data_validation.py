from pathlib import Path

import pandas as pd

from ecg_analyzer.entity.config_entity import DataValidationConfig
from ecg_analyzer.logger import logger


class DataValidation:
    def __init__(self, config: DataValidationConfig):
        self.config = config

    def _read_data(self, file_path: Path) -> pd.DataFrame:
        if not file_path.exists():
            raise FileNotFoundError(f"Validation file not found at {file_path}")

        logger.info("Reading validation dataset from %s", file_path)
        return pd.read_csv(file_path, header=None)

    def _validate_dataframe(self, df: pd.DataFrame, file_name: str) -> None:
        if df.shape[1] != self.config.expected_number_of_columns:
            raise ValueError(
                f"{file_name} has {df.shape[1]} columns, "
                f"expected {self.config.expected_number_of_columns}"
            )

        if df.isnull().sum().sum() > 0:
            raise ValueError(f"{file_name} contains missing values")

        target_values = sorted(
            df.iloc[:, self.config.target_column_index].unique().tolist()
        )

        invalid_classes = [
            value
            for value in target_values
            if int(value) not in self.config.allowed_target_classes
        ]

        if invalid_classes:
            raise ValueError(
                f"{file_name} contains invalid target classes: {invalid_classes}"
            )

    def _write_status(self, status: str) -> None:
        self.config.status_file.parent.mkdir(parents=True, exist_ok=True)
        self.config.status_file.write_text(status, encoding="utf-8")

        logger.info(
            "Validation status written to %s",
            self.config.status_file,
        )

    def run(self):
        try:
            logger.info("Data validation started")

            train_path = (
                self.config.raw_data_dir /
                self.config.train_file_name
            )

            test_path = (
                self.config.raw_data_dir /
                self.config.test_file_name
            )

            train_df = self._read_data(train_path)
            test_df = self._read_data(test_path)

            self._validate_dataframe(train_df, train_path.name)
            self._validate_dataframe(test_df, test_path.name)

            self._write_status("Validation status: TRUE")

            logger.info("Data validation completed successfully")

            return self.config.status_file

        except Exception:
            self._write_status("Validation status: FALSE")
            logger.exception("Error occurred during data validation")
            raise