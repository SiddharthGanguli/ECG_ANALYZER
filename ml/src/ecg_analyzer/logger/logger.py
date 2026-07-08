import logging
import os
from logging.handlers import RotatingFileHandler

class Logger:

    def __init__(self, file_name):
        self.file_name = file_name

    def get_logger(self):

        log_dir = "logs"
        os.makedirs(log_dir, exist_ok=True)

        log_file = os.path.join(log_dir, self.file_name)

        logger = logging.getLogger(self.file_name)
        logger.setLevel(logging.INFO)

        if not logger.handlers:

            formatter = logging.Formatter(
                "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
            )

            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formatter)

            file_handler = RotatingFileHandler(log_file,maxBytes=5 * 1024 * 1024,backupCount=5)
            file_handler.setFormatter(formatter)

            logger.addHandler(console_handler)
            logger.addHandler(file_handler)

        return logger