"""Compatibility package for the hyphenated source directory."""

from pathlib import Path

_PACKAGE_ROOT = Path(__file__).resolve().parent.parent / "ecg-analyzer"
__path__ = [str(Path(__file__).resolve().parent), str(_PACKAGE_ROOT)]
