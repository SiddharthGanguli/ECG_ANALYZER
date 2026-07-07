from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class DataIngestionConfig:
    root_dir: Path
    source_dir: Path
    raw_data_dir: Path

    train_file_name: str
    test_file_name: str

@dataclass(frozen=True)
class DataValidationConfig:
    root_dir: Path
    raw_data_dir: Path
    train_file_name: str
    test_file_name: str
    status_file: Path
    expected_number_of_columns: int
    target_column_index: int
    allowed_target_classes: list[int]

@dataclass(frozen=True)
class DataPreprocessingConfig:
    root_dir: Path

    # Input
    raw_data_dir: Path
    train_file_name: str
    test_file_name: str

    # Output
    processed_data_dir: Path

    train_features_file: str
    train_labels_file: str

    test_features_file: str
    test_labels_file: str

    # Preprocessing options
    remove_duplicates: bool
    check_missing_values: bool
    convert_dtype: bool

    # Normalization
    normalization_enabled: bool
    normalization_method: str

    # Reshaping
    reshape_enabled: bool
    channels: int


@dataclass(frozen=True)
class ModelTrainingConfig:

    root_dir: Path

    processed_data_dir: Path

    train_features_file: str
    train_labels_file: str

    test_features_file: str
    test_labels_file: str

    model_dir: Path
    model_name: str

    epochs: int
    batch_size: int
    learning_rate: float

    optimizer: str
    loss_function: str

    num_classes: int

    input_size: int
    input_channels: int

    dropout_rate: float

    random_seed: int