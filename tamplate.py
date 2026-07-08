import os
from pathlib import Path
import logging

PROJECT_NAME = "ml"

LOG_DIR = "logs"
LOG_FILE = "project_setup.log"

os.makedirs(LOG_DIR, exist_ok=True)

logging.basicConfig(
    filename=os.path.join(LOG_DIR, LOG_FILE),
    level=logging.INFO,
    format="[%(asctime)s] %(levelname)s - %(message)s",
    encoding="utf-8"
)

logger = logging.getLogger(__name__)



files = [



    "ml/src/ecg_analyzer/__init__.py",

    "ml/src/ecg_analyzer/logger/__init__.py",
    "ml/src/ecg_analyzer/logger/logger.py",

    "ml/src/ecg_analyzer/exception/__init__.py",
    "ml/src/ecg_analyzer/exception/exception.py",

    "ml/src/ecg_analyzer/constants/__init__.py",
    "ml/src/ecg_analyzer/constants/constants.py",

    "ml/src/ecg_analyzer/utils/__init__.py",
    "ml/src/ecg_analyzer/utils/common.py",

    "ml/src/ecg_analyzer/configuration/__init__.py",
    "ml/src/ecg_analyzer/configuration/configuration.py",
    "ml/src/ecg_analyzer/configuration/paths.py",

    "ml/src/ecg_analyzer/entity/__init__.py",
    "ml/src/ecg_analyzer/entity/config_entity.py",

   

    "ml/src/ecg_analyzer/components/__init__.py",
    "ml/src/ecg_analyzer/components/data_ingestion.py",
    "ml/src/ecg_analyzer/components/data_validation.py",
    "ml/src/ecg_analyzer/pipelines/__init__.py",
    "ml/src/ecg_analyzer/pipelines/data_ingestion_pipeline.py",
    "ml/src/ecg_analyzer/pipelines/data_validation_pipeline.py",

   
    "ml/configs/config.yaml",
    "ml/configs/model.yaml",
    "ml/configs/training.yaml",
    "ml/configs/logging.yaml",

 
    "ml/data/raw/.gitkeep",
 
 

    "ml/notebooks/.gitkeep",


    "ml/tests/__init__.py",
    "ml/tests/test_logger.py",
    "ml/tests/test_utils.py",

 

    "ml/requirements.txt",
    "ml/setup.py",
    "ml/params.yaml",
    "ml/dvc.yaml",
    "ml/README.md",
    "ml/.gitignore"

]

for paths in files:
    file_path = Path(paths)
    file_dir, file_name = os.path.split(file_path)

    if not os.path.exists(file_dir):
        os.makedirs(file_dir, exist_ok=True)
        logger.info(f"Created directory: {file_dir}")

    if not os.path.exists(file_path):
        file_path.touch(exist_ok=True)
        logger.info(f"Created file: {file_path}")