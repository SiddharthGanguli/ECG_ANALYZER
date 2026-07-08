from pathlib import Path

import numpy as np
import pandas as pd


def load_ecg_csv(csv_path: str) -> np.ndarray:
    """
    Load ECG CSV and convert it into
    shape (N, 1, 187)

    Each row = one heartbeat.
    """

    data = pd.read_csv(
        csv_path,
        header=None,
    ).values

    # ----------------------------------
    # Remove label column if present
    # (MIT-BIH test files have 188 cols)
    # ----------------------------------

    if data.shape[1] == 188:
        data = data[:, :-1]

    # ----------------------------------
    # Validate
    # ----------------------------------

    if data.shape[1] != 187:
        raise ValueError(
            f"Expected 187 features per beat. Got {data.shape[1]}"
        )

    data = data.astype(np.float32)

    data = data.reshape(
        len(data),
        1,
        187,
    )

    return data