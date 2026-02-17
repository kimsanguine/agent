from src.prompt_to_graph import prompt_spec_to_graph
from src.schema import PromptSpec


def test_prompt_spec_to_graph_creates_linear_graph_contract():
    spec = PromptSpec(
        title="고객 문의 자동화",
        steps=["문의 수집", "분류", "응답"],
        emphasis=["SLA"],
        tone="professional",
    )

    graph = prompt_spec_to_graph(spec)

    nodes = graph["nodes"]
    edges = graph["edges"]
    timeline = graph["timeline"]

    assert nodes == [
        {"id": "n1", "label": "문의 수집", "type": "prompt_step", "x": 0, "y": 0},
        {"id": "n2", "label": "분류", "type": "prompt_step", "x": 300, "y": 0},
        {"id": "n3", "label": "응답", "type": "prompt_step", "x": 600, "y": 0},
    ]
    assert edges == [
        {"id": "e1", "source": "n1", "target": "n2"},
        {"id": "e2", "source": "n2", "target": "n3"},
    ]
    assert timeline == [
        {"nodeId": "n1", "startFrame": 0, "endFrame": 45},
        {"nodeId": "n2", "startFrame": 30, "endFrame": 75},
        {"nodeId": "n3", "startFrame": 60, "endFrame": 105},
    ]
