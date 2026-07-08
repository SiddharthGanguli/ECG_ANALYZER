from pathlib import Path

import numpy as np
import pandas as pd

from sklearn.preprocessing import StandardScaler

from ecg_analyzer.entity.entity import DataPreprocessingConfig
from ecg_analyzer.logging.logger import logger


class DataPreprocessing:

    def __init__(self, config: DataPreprocessingConfig):
        self.config = config

        self.scaler = None

    def _load_data(self):

        train_path = (
            self.config.raw_data_dir /
            self.config.train_file_name
        )

        test_path = (
            self.config.raw_data_dir /
            self.config.test_file_name
        )

        logger.info("Loading training dataset from %s", train_path)
        logger.info("Loading testing dataset from %s", test_path)

        train_df = pd.read_csv(train_path, header=None)
        test_df = pd.read_csv(test_path, header=None)

        return train_df, test_df

    def _remove_duplicates(self, df):

        if not self.config.remove_duplicates:
            return df

        before = len(df)

        df = df.drop_duplicates()

        after = len(df)

        logger.info(
            "Removed %d duplicate samples",
            before - after,
        )

        return df

    def _check_missing_values(self, df):

        if not self.config.check_missing_values:
            return

        if df.isnull().sum().sum() > 0:
            raise ValueError("Dataset contains missing values.")

        if np.isinf(df.values).sum() > 0:
            raise ValueError("Dataset contains infinite values.")

    def _convert_dtype(self, df):

        if not self.config.convert_dtype:
            return df

        features = df.iloc[:, :-1].astype(np.float32)

        labels = df.iloc[:, -1].astype(np.int64)

        return pd.concat([features, labels], axis=1)


    def _split_features_labels(self, df):

        X = df.iloc[:, :-1].values

        y = df.iloc[:, -1].values

        return X, y

    def _analyze(self, X, name):

        logger.info("%s Shape : %s", name, X.shape)

        logger.info(
            "%s Min : %.4f",
            name,
            X.min(),
        )

        logger.info(
            "%s Max : %.4f",
            name,
            X.max(),
        )

        logger.info(
            "%s Mean : %.4f",
            name,
            X.mean(),
        )

        logger.info(
            "%s Std : %.4f",
            name,
            X.std(),
        )

    def _normalize(self, X_train, X_test):

        if not self.config.normalization_enabled:
            return X_train, X_test

        logger.info("Applying Z-score normalization")

        self.scaler = StandardScaler()

        X_train = self.scaler.fit_transform(X_train)

        X_test = self.scaler.transform(X_test)

        return X_train, X_test


    def _reshape(self, X):

        if not self.config.reshape_enabled:
            return X

        return X.reshape(
            X.shape[0],
            self.config.channels,
            X.shape[1],
        )

    def _save(self, X_train, y_train, X_test, y_test):

        output = self.config.processed_data_dir

        np.save(
            output / self.config.train_features_file,
            X_train,
        )

        np.save(
            output / self.config.train_labels_file,
            y_train,
        )

        np.save(
            output / self.config.test_features_file,
            X_test,
        )

        np.save(
            output / self.config.test_labels_file,
            y_test,
        )

        logger.info("Processed dataset saved successfully.")

    def run(self):

        logger.info("Starting Data Preprocessing")

        train_df, test_df = self._load_data()

        train_df = self._remove_duplicates(train_df)
        test_df = self._remove_duplicates(test_df)

        self._check_missing_values(train_df)
        self._check_missing_values(test_df)

        train_df = self._convert_dtype(train_df)
        test_df = self._convert_dtype(test_df)

        X_train, y_train = self._split_features_labels(train_df)

        X_test, y_test = self._split_features_labels(test_df)

        self._analyze(X_train, "Training")

        X_train, X_test = self._normalize(
            X_train,
            X_test,
        )

        X_train = self._reshape(X_train)

        X_test = self._reshape(X_test)

        self._save(
            X_train,
            y_train,
            X_test,
            y_test,
        )

        logger.info("Data preprocessing completed successfully.")