from pathlib import Path
import os
import yaml

from ecg_analyzer.entity.entity import (
    DataIngestionConfig,
    DataValidationConfig,
    DataPreprocessingConfig,
    ModelTrainingConfig,
    ModelEvaluationConfig
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
    


    
    def get_data_preprocessing_config(self) -> DataPreprocessingConfig:

        preprocessing = self.config["data_preprocessing"]

        root_dir = Path(preprocessing["root_dir"])

        raw_data_dir = Path(preprocessing["raw_data_dir"])

        processed_data_dir = Path(preprocessing["processed_data_dir"])

        os.makedirs(root_dir, exist_ok=True)
        os.makedirs(processed_data_dir, exist_ok=True)

        return DataPreprocessingConfig(
            root_dir=root_dir,

            raw_data_dir=raw_data_dir,
            train_file_name=preprocessing["train_file_name"],
            test_file_name=preprocessing["test_file_name"],

            processed_data_dir=processed_data_dir,

            train_features_file=preprocessing["train_features_file"],
            train_labels_file=preprocessing["train_labels_file"],

            test_features_file=preprocessing["test_features_file"],
            test_labels_file=preprocessing["test_labels_file"],

            remove_duplicates=bool(preprocessing["remove_duplicates"]),
            check_missing_values=bool(preprocessing["check_missing_values"]),
            convert_dtype=bool(preprocessing["convert_dtype"]),

            normalization_enabled=bool(
                preprocessing["normalization"]["enabled"]
            ),

            normalization_method=preprocessing["normalization"]["method"],

            reshape_enabled=bool(
                preprocessing["reshape"]["enabled"]
            ),

            channels=int(
                preprocessing["reshape"]["channels"]
            ),
        )
    
    def get_model_training_config(self) -> ModelTrainingConfig:

        training = self.config.get("model_training")

        if training is None:
            raise ValueError("model_training section missing in config.yaml")

        root_dir = Path(training["root_dir"])

        processed_data_dir = Path(training["processed_data_dir"])

        model_dir = Path(training["model_dir"])

        os.makedirs(root_dir, exist_ok=True)
        os.makedirs(model_dir, exist_ok=True)

        return ModelTrainingConfig(

            root_dir=root_dir,

            processed_data_dir=processed_data_dir,

            train_features_file=training["train_features_file"],
            train_labels_file=training["train_labels_file"],

            test_features_file=training["test_features_file"],
            test_labels_file=training["test_labels_file"],

            model_dir=model_dir,
            model_name=training["model_name"],

            epochs=int(training["epochs"]),
            batch_size=int(training["batch_size"]),
            learning_rate=float(training["learning_rate"]),

            optimizer=training["optimizer"],
            loss_function=training["loss_function"],

            num_classes=int(training["num_classes"]),

            input_size=int(training["input_size"]),
            input_channels=int(training["input_channels"]),

            dropout_rate=float(training["dropout_rate"]),

            random_seed=int(training["random_seed"]),
        )
    def get_model_evaluation_config(self):

        config = self.config["model_evaluation"]

        return ModelEvaluationConfig(

            root_dir=Path(config["root_dir"]),

            model_path=Path(config["model_path"]),

            test_data_path=Path(config["test_data_path"]),

            metrics_file=Path(config["metrics_file"]),

            confusion_matrix_path=Path(
                config["confusion_matrix_path"]
            ),

            classification_report_path=Path(
                config["classification_report_path"]
            ),
        )