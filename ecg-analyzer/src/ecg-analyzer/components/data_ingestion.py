from pathlib import Path
import shutil

from ecg_analyzer.entity.entity import DataIngestionConfig
from ecg_analyzer.logging.logger import logger


class DataIngestion:
    def __init__(self, config: DataIngestionConfig):
        self.config = config

    def _copy_file(self, source_path: Path, destination_path: Path) -> None:
        if not source_path.exists():
            raise FileNotFoundError(f"Source file not found: {source_path}")

        destination_path.parent.mkdir(parents=True, exist_ok=True)

        shutil.copy2(source_path, destination_path)

        logger.info("Copied %s -> %s", source_path, destination_path)

    def run(self):
        try:
            logger.info("Starting Data Ingestion Stage")

            source_train = self.config.source_dir / self.config.train_file_name
            source_test = self.config.source_dir / self.config.test_file_name

            destination_train = (
                self.config.raw_data_dir / self.config.train_file_name
            )

            destination_test = (
                self.config.raw_data_dir / self.config.test_file_name
            )

            self._copy_file(source_train, destination_train)
            self._copy_file(source_test, destination_test)

            logger.info("Data Ingestion completed successfully.")

            return destination_train, destination_test

        except Exception:
            logger.exception("Data Ingestion failed.")
            raise