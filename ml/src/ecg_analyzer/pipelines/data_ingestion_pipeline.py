from pathlib import Path

from ecg_analyzer.configuration.configuration import ConfigManager
from ecg_analyzer.components.data_ingestion import DataIngestion
from ecg_analyzer.logger import logger


class DataIngestionPipeline:
    def __init__(self):
        self.config = ConfigManager(
            config_path=Path("configs/config.yaml")
        ).get_data_ingestion_config()

    def run(self):
        logger.info("========== Data Ingestion Pipeline Started ==========")

        ingestion = DataIngestion(self.config)
        ingestion.run()

        logger.info("========== Data Ingestion Pipeline Completed ==========")


if __name__ == "__main__":
    DataIngestionPipeline().run()