from src.schema import PromptSpec


def prompt_spec_to_graph(spec: PromptSpec) -> dict[str, list[dict[str, object]]]:
    nodes: list[dict[str, object]] = []
    edges: list[dict[str, object]] = []
    timeline: list[dict[str, object]] = []

    for idx, step in enumerate(spec.steps, start=1):
        node_id = f"n{idx}"
        nodes.append(
            {
                "id": node_id,
                "label": step,
                "type": "prompt_step",
                "x": (idx - 1) * 300,
                "y": 0,
            }
        )

        start_frame = (idx - 1) * 30
        timeline.append(
            {
                "nodeId": node_id,
                "startFrame": start_frame,
                "endFrame": start_frame + 45,
            }
        )

        if idx > 1:
            edges.append(
                {
                    "id": f"e{idx - 1}",
                    "source": f"n{idx - 1}",
                    "target": node_id,
                }
            )

    return {"nodes": nodes, "edges": edges, "timeline": timeline}
