# Graph schema placeholder for Miro → Remotion PoC.
from dataclasses import dataclass
from enum import Enum


class InputChannel(str, Enum):
    PROMPT = "prompt"
    PROMPT_FILE = "prompt-file"
    GRAPH_JSON = "graph-json"
    MIRO_BOARD = "miro-board"


@dataclass
class PromptSpec:
    title: str
    steps: list[str]
    emphasis: str
    tone: str
