from setuptools import setup, find_packages

setup(
    name="ecg_analyzer_ml_module",
    version="0.1.0",
    author="Siddhartha Ganguli",
    author_email="siddharthaganguli0093@gmail.com",
    description="A Python package for ECG analysis",
    find_packages=find_packages(where="ml/src"),
    package_dir={"": "ml/src"},
    include_package_data=True,
)
