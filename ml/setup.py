from setuptools import setup, find_packages

setup(
    name="ecg_analyzer",
    version="0.1.0",
    author="Siddhartha Ganguli",
    author_email="siddharthaganguli0093@gmail.com",
    description="ECG Analyzer ML Module",
    packages=find_packages(where="src"),
    package_dir={"": "src"},
    include_package_data=True,
)