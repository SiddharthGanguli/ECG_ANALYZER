import torch
import torch.nn.functional as F

from app.ml.model_loader import model_loader


CLASS_NAMES = {
    0: "Normal Beat (N)",
    1: "Supraventricular Beat (S)",
    2: "Ventricular Beat (V)",
    3: "Fusion Beat (F)",
    4: "Unknown Beat (Q)",
}


def predict_ecg(ecg_data):
    """
    Predict every heartbeat.

    Input:
        numpy array of shape (N,1,187)

    Output:
        list of predictions
    """

    model = model_loader.model
    device = model_loader.device

    x = torch.tensor(
        ecg_data,
        dtype=torch.float32,
    ).to(device)

    with torch.no_grad():

        logits = model(x)

        probabilities = F.softmax(
            logits,
            dim=1,
        )

        predictions = torch.argmax(
            probabilities,
            dim=1,
        )

    results = []

    for i in range(len(predictions)):

        pred = predictions[i].item()

        confidence = (
            probabilities[i][pred].item() * 100
        )

        results.append(
            {
                "beat": i + 1,
                "class_id": pred,
                "prediction": CLASS_NAMES[pred],
                "confidence": round(confidence, 2),
                "probabilities": {
                    CLASS_NAMES[j]: round(
                        probabilities[i][j].item() * 100,
                        2,
                    )
                    for j in range(5)
                },
            }
        )

    return results