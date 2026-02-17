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

    assert len(nodes) == 3
    assert edges[0]["source"] == "n1"
    assert timeline[2]["nodeId"] == "n3"
