import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from ecg_analyzer.components.model_training import ModelTraining
from ecg_analyzer.config.config import ConfigManager
from ecg_analyzer.logging.logger import logger


class ModelTrainingPipeline:

    def __init__(self):
        pass

    def run(self):

        try:

            logger.info(
                "========== Model Training Pipeline Started =========="
            )

            config = ConfigManager(
                Path("configs/config.yaml")
            ).get_model_training_config()

            model_training = ModelTraining(config)

            model_training.run()

            logger.info(
                "========== Model Training Pipeline Completed =========="
            )

        except Exception as error:

            logger.exception(
                "Pipeline failed: Model Training"
            )

            raise error


if __name__ == "__main__":

    pipeline = ModelTrainingPipeline()

    pipeline.run()