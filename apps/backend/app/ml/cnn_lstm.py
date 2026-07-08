import torch
import torch.nn as nn
print("NEW CNN MODEL LOADED")

class CNNLSTM(nn.Module):
    """
    CNN-LSTM architecture for ECG heartbeat classification.

    Input Shape:
        (Batch Size, 1, 187)

    Output Shape:
        (Batch Size, 5)
    """

    def __init__(self, num_classes: int = 5):
        super().__init__()

        # ==========================================================
        # CNN Feature Extractor
        # ==========================================================

        self.feature_extractor = nn.Sequential(

            # ---------- Conv Block 1 ----------
            nn.Conv1d(
                in_channels=1,
                out_channels=64,
                kernel_size=5,
                padding=2,
            ),
            nn.BatchNorm1d(64),
            nn.ReLU(inplace=True),
            nn.MaxPool1d(kernel_size=2),

            # ---------- Conv Block 2 ----------
            nn.Conv1d(
                in_channels=64,
                out_channels=128,
                kernel_size=5,
                padding=2,
            ),
            nn.BatchNorm1d(128),
            nn.ReLU(inplace=True),
            nn.MaxPool1d(kernel_size=2),

            # ---------- Conv Block 3 ----------
            nn.Conv1d(
                in_channels=128,
                out_channels=256,
                kernel_size=3,
                padding=1,
            ),
            nn.BatchNorm1d(256),
            nn.ReLU(inplace=True),
            nn.MaxPool1d(kernel_size=2),
        )

        # ==========================================================
        # LSTM
        # ==========================================================

        self.lstm = nn.LSTM(
            input_size=256,
            hidden_size=128,
            num_layers=2,
            batch_first=True,
            dropout=0.5,
        )

        # ==========================================================
        # Classifier
        # ==========================================================

        self.classifier = nn.Sequential(

            nn.Linear(128, 64),

            nn.ReLU(inplace=True),

            nn.Dropout(0.5),

            nn.Linear(64, num_classes),
        )

        # Initialize weights
        self._initialize_weights()

    def forward(self, x):
        """
        Forward pass.

        Args:
            x: Tensor of shape (Batch Size, 1, 187)

        Returns:
            Logits of shape (Batch Size, num_classes)
        """

        # CNN Feature Extraction
        x = self.feature_extractor(x)

        # Convert to LSTM format
        # (Batch, Channels, Sequence) -> (Batch, Sequence, Channels)
        x = x.permute(0, 2, 1)

        # LSTM
        _, (hidden, _) = self.lstm(x)

        # Last hidden state
        x = hidden[-1]

        # Classification
        x = self.classifier(x)

        return x

    def predict(self, x):
        """
        Prediction helper for inference.
        """

        self.eval()

        with torch.no_grad():
            return self.forward(x)

    def _initialize_weights(self):
        """
        Initialize model weights.
        """

        for module in self.modules():

            if isinstance(module, nn.Conv1d):

                nn.init.kaiming_normal_(
                    module.weight,
                    nonlinearity="relu",
                )

                if module.bias is not None:
                    nn.init.zeros_(module.bias)

            elif isinstance(module, nn.Linear):

                nn.init.xavier_uniform_(module.weight)

                if module.bias is not None:
                    nn.init.zeros_(module.bias)