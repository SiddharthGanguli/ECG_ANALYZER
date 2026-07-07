import logging
import os
from pathlib import Path
from logging.handlers import RotatingFileHandler


PROJECT_ROOT = Path(__file__).resolve().parents[3]
LOG_DIR = PROJECT_ROOT / "logs"


class Logger:

    def __init__(self, file_name):
        self.file_name = file_name

    def get_logger(self):
        LOG_DIR.mkdir(parents=True, exist_ok=True)
        log_file = str(LOG_DIR / f"{self.file_name}.log")

        logger = logging.getLogger(self.file_name)
        logger.setLevel(logging.INFO)
        logger.propagate = False

        formatter = logging.Formatter(
            "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
        )

        if not any(isinstance(handler, logging.StreamHandler) and not isinstance(handler, RotatingFileHandler) for handler in logger.handlers):
            console_handler = logging.StreamHandler()
            console_handler.setFormatter(formatter)
            logger.addHandler(console_handler)

        if not any(isinstance(handler, RotatingFileHandler) for handler in logger.handlers):
            file_handler = RotatingFileHandler(
                log_file, maxBytes=5 * 1024 * 1024, backupCount=5
            )
            file_handler.setFormatter(formatter)
            logger.addHandler(file_handler)

        return logger


def get_logger(name):
    """Get or create a logger with the given name."""
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    logger.propagate = False

    formatter = logging.Formatter(
        "%(asctime)s - %(levelname)s - %(name)s - %(message)s"
    )

    LOG_DIR.mkdir(parents=True, exist_ok=True)
    log_file = str(LOG_DIR / f"{name}.log")

    if not any(isinstance(handler, logging.StreamHandler) and not isinstance(handler, RotatingFileHandler) for handler in logger.handlers):
        console_handler = logging.StreamHandler()
        console_handler.setFormatter(formatter)
        logger.addHandler(console_handler)

    if not any(isinstance(handler, RotatingFileHandler) for handler in logger.handlers):
        file_handler = RotatingFileHandler(
            log_file, maxBytes=5 * 1024 * 1024, backupCount=5
        )
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

    return logger


# Create a module-level logger
logger = get_logger(__name__)