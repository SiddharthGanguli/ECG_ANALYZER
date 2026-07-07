import torch
from torch.utils.data import Dataset


class ECGDataset(Dataset):
    """
    Custom PyTorch Dataset for ECG heartbeat classification.
    """

    def __init__(self, features, labels):

        self.features = torch.FloatTensor(features)
        self.labels = torch.LongTensor(labels)

    def __len__(self):

        return len(self.features)

    def __getitem__(self, index):

        return self.features[index], self.labels[index]