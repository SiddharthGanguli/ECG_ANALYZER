import dagshub
import mlflow

from ecg_analyzer.logging.logger import logger


def initialize_mlflow(
    repo_owner: str,
    repo_name: str,
    experiment_name: str,
) -> None:


    try:
        logger.info("Initializing DagsHub MLflow...")

        dagshub.init(
            repo_owner=repo_owner,
            repo_name=repo_name,
            mlflow=True,
        )

        mlflow.set_experiment(experiment_name)
        logger.info("Tracking URI: %s", mlflow.get_tracking_uri())

        logger.info(
            "MLflow initialized successfully."
        )

        logger.info(
            "Experiment Name: %s",
            experiment_name,
        )

    except Exception as error:
        logger.exception(
            "Failed to initialize MLflow."
        )
        raise error