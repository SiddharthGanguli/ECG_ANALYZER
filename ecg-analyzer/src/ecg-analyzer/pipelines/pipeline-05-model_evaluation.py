import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from ecg_analyzer.components.model_evaluation import ModelEvaluation
from ecg_analyzer.config.config import ConfigManager
from ecg_analyzer.logging.logger import logger


class ModelEvaluationPipeline:

    def __init__(self):
        pass

    def run(self):

        try:

            logger.info(
                "========== Model Evaluation Pipeline Started =========="
            )

            config = ConfigManager(
                Path("configs/config.yaml")
            ).get_model_evaluation_config()

            model_evaluation = ModelEvaluation(config)

            model_evaluation.run()

            logger.info(
                "========== Model Evaluation Pipeline Completed =========="
            )

        except Exception as error:

            logger.exception(
                "Pipeline failed: Model Evaluation"
            )

            raise error


if __name__ == "__main__":

    pipeline = ModelEvaluationPipeline()

    pipeline.run()