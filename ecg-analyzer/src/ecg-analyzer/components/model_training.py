from pathlib import Path
import random

import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import DataLoader

import mlflow
import mlflow.pytorch
from ecg_analyzer.utils.mlflow_utils import initialize_mlflow

from ecg_analyzer.training.ecg_dataset import ECGDataset
from ecg_analyzer.entity.entity import ModelTrainingConfig
from ecg_analyzer.logging.logger import logger
from ecg_analyzer.training.cnn_lstm import CNNLSTM
import inspect

logger.info(inspect.getsource(CNNLSTM.forward))
import inspect

logger.info(
    "CNN Model Loaded From: %s",
    inspect.getfile(CNNLSTM)
)
class ModelTraining:

    def __init__(self, config: ModelTrainingConfig):

        self.config = config

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        logger.info(
            "Using device: %s",
            self.device,
        )

        logger.info("Using device: %s", self.device)

    def _set_seed(self):

        random.seed(self.config.random_seed)

        np.random.seed(self.config.random_seed)

        torch.manual_seed(self.config.random_seed)

        if torch.cuda.is_available():
            torch.cuda.manual_seed_all(self.config.random_seed)

    def _load_data(self):

        processed_dir = self.config.processed_data_dir

        X_train = np.load(
            processed_dir / self.config.train_features_file
        )

        y_train = np.load(
            processed_dir / self.config.train_labels_file
        )

        X_test = np.load(
            processed_dir / self.config.test_features_file
        )

        y_test = np.load(
            processed_dir / self.config.test_labels_file
        )

        logger.info("Training samples : %d", len(X_train))
        logger.info("Testing samples  : %d", len(X_test))
        logger.info("X_train shape: %s", X_train.shape)
        logger.info("y_train shape: %s", y_train.shape)

        logger.info("X_test shape: %s", X_test.shape)
        logger.info("y_test shape: %s", y_test.shape)

        return X_train, y_train, X_test, y_test
    
    def _create_dataloaders(
        self,
        X_train,
        y_train,
        X_test,
        y_test,
    ):

        train_dataset = ECGDataset(
            X_train,
            y_train,
        )

        test_dataset = ECGDataset(
            X_test,
            y_test,
        )

        train_loader = DataLoader(
            train_dataset,
            batch_size=self.config.batch_size,
            shuffle=True,
        )

        test_loader = DataLoader(
            test_dataset,
            batch_size=self.config.batch_size,
            shuffle=False,
        )

        return train_loader, test_loader
    def _build_model(self):

        logger.info("Initializing CNN-LSTM model")

        model = CNNLSTM(
            num_classes=self.config.num_classes,
        ).to(self.device)

        criterion = nn.CrossEntropyLoss()

        optimizer = torch.optim.Adam(
            model.parameters(),
            lr=self.config.learning_rate,
        )

        scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            optimizer,
            mode="min",
            factor=0.1,
            patience=5,
        )

        logger.info("Model initialized successfully.")

        return (
            model,
            criterion,
            optimizer,
            scheduler,
        )
    def _train_one_epoch(
        self,
        model,
        train_loader,
        criterion,
        optimizer,
    ):

        model.train()

        running_loss = 0.0
        correct_predictions = 0
        total_samples = 0

        for inputs, labels in train_loader:

            inputs = inputs.to(self.device)
            labels = labels.to(self.device)
    
            # Forward Pass
            outputs = model(inputs)

            loss = criterion(outputs, labels)

            # Backward Pass
            optimizer.zero_grad()

            loss.backward()

            optimizer.step()

            # Statistics
            running_loss += loss.item()

            _, predicted = torch.max(outputs, dim=1)

            correct_predictions += (predicted == labels).sum().item()

            total_samples += labels.size(0)

        epoch_loss = running_loss / len(train_loader)

        epoch_accuracy = (
            correct_predictions / total_samples
        ) * 100

        return epoch_loss, epoch_accuracy
    
    def _validate_one_epoch(self,model,test_loader,criterion,):

        model.eval()

        running_loss = 0.0
        correct_predictions = 0
        total_samples = 0

        with torch.no_grad():

            for inputs, labels in test_loader:

                inputs = inputs.to(self.device)
                labels = labels.to(self.device)

                # Forward Pass
                outputs = model(inputs)

                loss = criterion(outputs, labels)

                # Statistics
                running_loss += loss.item()

                _, predicted = torch.max(outputs, dim=1)

                correct_predictions += (predicted == labels).sum().item()

                total_samples += labels.size(0)

        epoch_loss = running_loss / len(test_loader)

        epoch_accuracy = (
            correct_predictions / total_samples
        ) * 100

        return epoch_loss, epoch_accuracy

    def _save_model(self,
    model,
):

        model_path = (
            self.config.model_dir /
            self.config.model_name
        )

        torch.save(
            model.state_dict(),
            model_path,
        )

        logger.info(
            "Model saved successfully at %s",
            model_path,
        )

        return model_path

    def run(self):

        logger.info("========== Starting Model Training ==========")

        # -------------------------------------------------
        # Initialize MLflow (DagsHub)
        # -------------------------------------------------

        initialize_mlflow(
            repo_owner="siddharthaganguli0093",
            repo_name="ECG_ANALYZER",
            experiment_name="ECG_Heartbeat_Classification",
        )

        # -------------------------------------------------
        # Set Random Seed
        # -------------------------------------------------

        self._set_seed()

        # -------------------------------------------------
        # Load Dataset
        # -------------------------------------------------

        X_train, y_train, X_test, y_test = self._load_data()

        # -------------------------------------------------
        # Create DataLoaders
        # -------------------------------------------------

        train_loader, test_loader = self._create_dataloaders(
            X_train,
            y_train,
            X_test,
            y_test,
        )

        # -------------------------------------------------
        # Build Model
        # -------------------------------------------------

        (
            model,
            criterion,
            optimizer,
            scheduler,
        ) = self._build_model()

        best_accuracy = 0.0
        best_model_path = None

        # -------------------------------------------------
        # Start MLflow Run
        # -------------------------------------------------

        with mlflow.start_run():

            # ---------------------------------------------
            # Log Hyperparameters
            # ---------------------------------------------

            mlflow.log_params({

                "epochs": self.config.epochs,
                "batch_size": self.config.batch_size,
                "learning_rate": self.config.learning_rate,
                "optimizer": self.config.optimizer,
                "loss_function": self.config.loss_function,
                "dropout_rate": self.config.dropout_rate,
                "num_classes": self.config.num_classes,
                "input_size": self.config.input_size,

            })

            # ---------------------------------------------
            # Training Loop
            # ---------------------------------------------

            for epoch in range(self.config.epochs):

                train_loss, train_accuracy = self._train_one_epoch(
                    model,
                    train_loader,
                    criterion,
                    optimizer,
                )

                validation_loss, validation_accuracy = self._validate_one_epoch(
                    model,
                    test_loader,
                    criterion,
                )

                scheduler.step(validation_loss)

                logger.info(
                    "Epoch [%d/%d] | "
                    "Train Loss: %.4f | "
                    "Train Accuracy: %.2f%% | "
                    "Validation Loss: %.4f | "
                    "Validation Accuracy: %.2f%%",
                    epoch + 1,
                    self.config.epochs,
                    train_loss,
                    train_accuracy,
                    validation_loss,
                    validation_accuracy,
                )

                # -----------------------------------------
                # Log Metrics
                # -----------------------------------------

                mlflow.log_metric(
                    "train_loss",
                    train_loss,
                    step=epoch,
                )

                mlflow.log_metric(
                    "train_accuracy",
                    train_accuracy,
                    step=epoch,
                )

                mlflow.log_metric(
                    "validation_loss",
                    validation_loss,
                    step=epoch,
                )

                mlflow.log_metric(
                    "validation_accuracy",
                    validation_accuracy,
                    step=epoch,
                )

                # -----------------------------------------
                # Save Best Model
                # -----------------------------------------

                if validation_accuracy > best_accuracy:

                    best_accuracy = validation_accuracy

                    best_model_path = self._save_model(model)

            # -------------------------------------------------
            # Log Best Model Artifact
            # -------------------------------------------------

            if best_model_path is not None:

                mlflow.log_artifact(best_model_path)

                logger.info(
                    "Best model artifact logged successfully to MLflow."
                )

            # -------------------------------------------------
            # Log Final Metrics
            # -------------------------------------------------

            mlflow.log_metric(
                "best_validation_accuracy",
                best_accuracy,
            )

            # -------------------------------------------------
            # Log Best Model Path
            # -------------------------------------------------

            mlflow.log_param(
                "best_model_path",
                best_model_path,
            )

            logger.info(
                "Best Validation Accuracy : %.2f%%",
                best_accuracy,
            )

            logger.info(
                "Best Model Path : %s",
                best_model_path,
            )

        logger.info("========== Model Training Completed Successfully ==========")