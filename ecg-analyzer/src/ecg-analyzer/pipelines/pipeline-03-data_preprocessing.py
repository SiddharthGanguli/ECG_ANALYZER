import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from ecg_analyzer.components.data_preprocessing import DataPreprocessing
from ecg_analyzer.config.config import ConfigManager
from ecg_analyzer.logging.logger import logger


class DataPreprocessingPipeline:

    def __init__(self):
        self.config = ConfigManager(
            Path("configs/config.yaml")
        ).get_data_preprocessing_config()

    def run(self):
        try:
            logger.info("========== Data Preprocessing Pipeline Started ==========")

            preprocessing = DataPreprocessing(self.config)

            preprocessing.run()

            logger.info("========== Data Preprocessing Pipeline Completed ==========")

        except Exception:
            logger.exception("Pipeline failed: Data Preprocessing")
            raise


if __name__ == "__main__":
    DataPreprocessingPipeline().run()