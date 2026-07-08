import json

from pathlib import Path

import joblib
import numpy as np
import torch

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    classification_report,
    confusion_matrix,
)

import matplotlib.pyplot as plt

from ecg_analyzer.entity.entity import ModelEvaluationConfig
from ecg_analyzer.training.cnn_lstm import CNNLSTM
from ecg_analyzer.logging.logger import logger
class ModelEvaluation:

    def __init__(self, config: ModelEvaluationConfig):

        self.config = config

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        logger.info(
            "Using device: %s",
            self.device,
        )
    def _load_model(self):

        logger.info("Loading trained model...")

        model = CNNLSTM()

        model.load_state_dict(
            torch.load(
                self.config.model_path,
                map_location=self.device,
            )
        )

        model.to(self.device)

        model.eval()

        logger.info("Model loaded successfully.")

        return model
    def _load_test_data(self):

        processed = self.config.test_data_path

        X_test = np.load(
            processed / "X_test.npy"
        )

        y_test = np.load(
            processed / "y_test.npy"
        )

        logger.info(
            "Loaded %d test samples.",
            len(X_test),
        )

        logger.info(
            "X_test Shape : %s",
            X_test.shape,
        )

        logger.info(
            "y_test Shape : %s",
            y_test.shape,
        )

        return X_test, y_test
    def _predict(
    self,
    model,
    X_test,
):

        inputs = torch.FloatTensor(
            X_test
        ).to(self.device)

        with torch.no_grad():

            outputs = model(inputs)

            predictions = torch.argmax(
                outputs,
                dim=1,
            )

        return predictions.cpu().numpy()
    def _calculate_metrics(
    self,
    y_true,
    y_pred,
):

        logger.info(
            "Calculating evaluation metrics..."
        )

        accuracy = accuracy_score(
            y_true,
            y_pred,
        )

        precision = precision_score(
            y_true,
            y_pred,
            average="weighted",
        )

        recall = recall_score(
            y_true,
            y_pred,
            average="weighted",
        )

        f1 = f1_score(
            y_true,
            y_pred,
            average="weighted",
        )

        metrics = {

            "accuracy": float(accuracy),

            "precision": float(precision),

            "recall": float(recall),

            "f1_score": float(f1),

        }

        logger.info(
            "Accuracy : %.4f",
            accuracy,
        )

        logger.info(
            "Precision : %.4f",
            precision,
        )

        logger.info(
            "Recall : %.4f",
            recall,
        )

        logger.info(
            "F1 Score : %.4f",
            f1,
        )

        return metrics
    def _save_metrics(
    self,
    metrics,
):

        self.config.root_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        with open(
            self.config.metrics_file,
            "w",
        ) as file:

            json.dump(
                metrics,
                file,
                indent=4,
            )

        logger.info(
            "Metrics saved successfully."
        )
    def _save_classification_report(
    self,
    y_true,
    y_pred,
):

        report = classification_report(
            y_true,
            y_pred,
        )

        with open(
            self.config.classification_report_path,
            "w",
        ) as file:

            file.write(report)

        logger.info(
            "Classification report saved."
        )
    def _save_confusion_matrix(
    self,
    y_true,
    y_pred,
):

        cm = confusion_matrix(
            y_true,
            y_pred,
        )

        plt.figure(figsize=(8, 6))

        plt.imshow(
            cm,
            interpolation="nearest",
        )

        plt.title(
            "Confusion Matrix"
        )

        plt.colorbar()

        plt.xlabel(
            "Predicted Label"
        )

        plt.ylabel(
            "True Label"
        )

        plt.tight_layout()

        plt.savefig(
            self.config.confusion_matrix_path,
            dpi=300,
        )

        plt.close()

        logger.info(
            "Confusion matrix saved."
        )
    def run(self):

        logger.info(
            "========== Model Evaluation Started =========="
        )

        # ---------------------------------------------
        # Load Model
        # ---------------------------------------------

        model = self._load_model()

        # ---------------------------------------------
        # Load Test Dataset
        # ---------------------------------------------

        X_test, y_test = self._load_test_data()

        # ---------------------------------------------
        # Predict
        # ---------------------------------------------

        y_pred = self._predict(
            model,
            X_test,
        )

        # ---------------------------------------------
        # Calculate Metrics
        # ---------------------------------------------

        metrics = self._calculate_metrics(
            y_test,
            y_pred,
        )

        # ---------------------------------------------
        # Save Metrics
        # ---------------------------------------------

        self._save_metrics(metrics)

        # ---------------------------------------------
        # Save Classification Report
        # ---------------------------------------------

        self._save_classification_report(
            y_test,
            y_pred,
        )

        # ---------------------------------------------
        # Save Confusion Matrix
        # ---------------------------------------------

        self._save_confusion_matrix(
            y_test,
            y_pred,
        )

        logger.info(
            "========== Model Evaluation Completed =========="
        )