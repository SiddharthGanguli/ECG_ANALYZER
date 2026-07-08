import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from ecg_analyzer.components.data_validation import DataValidation
from ecg_analyzer.config.config import ConfigManager
from ecg_analyzer.logging.logger import logger


class DataValidationPipeline:
    def __init__(self):
        pass

    def run(self):
        try:
            logger.info("Pipeline started: Data Validation")

            config = ConfigManager(Path("configs/config.yaml")).get_data_validation_config()
            data_validation = DataValidation(config=config)
            data_validation.run()

            logger.info("Pipeline completed: Data Validation")
        except Exception as error:
            logger.exception("Pipeline failed: Data Validation")
            raise error


if __name__ == "__main__":
    pipeline = DataValidationPipeline()
    pipeline.run()