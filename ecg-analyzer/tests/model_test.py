import torch

from ecg_analyzer.training.cnn_lstm import CNNLSTM

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = CNNLSTM(num_classes=5)

model.load_state_dict(
    torch.load(
        "artifacts/model_training/model/cnn_lstm_model.pth",
        map_location=device,
    )
)

model.to(device)
model.eval()

print("Model loaded successfully!")