import importlib.util
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "src" / "ecg-analyzer" / "logging" / "logger.py"
SPEC = importlib.util.spec_from_file_location("logger_under_test", MODULE_PATH)
module = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(module)
get_logger = module.get_logger


def test_get_logger_creates_log_file(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    module.LOG_DIR = tmp_path / "logs"

    logger = get_logger("test_logger")
    logger.info("hello from test")

    log_file = tmp_path / "logs" / "test_logger.log"
    assert log_file.exists()
