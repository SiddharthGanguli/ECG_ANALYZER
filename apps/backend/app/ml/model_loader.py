from pathlib import Path

import torch

from app.ml.cnn_lstm import CNNLSTM


class ModelLoader:
    """
    Load the trained CNN-LSTM model once.
    """

    def __init__(self):

        self.device = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )

        model_path = (
            Path(__file__).parent
            / "weights"
            / "cnn_lstm_model.pth"
        )

        self.model = CNNLSTM(num_classes=5)

        self.model.load_state_dict(
            torch.load(
                model_path,
                map_location=self.device,
            )
        )

        self.model.to(self.device)

        self.model.eval()

        print(f"ECG Model loaded on {self.device}")


# Singleton instance
model_loader = ModelLoader()