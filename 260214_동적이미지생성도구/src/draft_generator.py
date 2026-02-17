import hashlib
import json
from copy import deepcopy


_STRATEGIES: tuple[str, str, str] = (
    "pipeline_flow",
    "loop_feedback",
    "hub_spoke",
)

_STRATEGY_OFFSETS: dict[str, tuple[int, int]] = {
    "pipeline_flow": (0, 0),
    "loop_feedback": (60, 30),
    "hub_spoke": (120, 60),
}


def _to_contract_graph(
    graph: dict[str, list[dict[str, object]]],
) -> dict[str, list[dict[str, object]]]:
    return {
        "nodes": deepcopy(graph.get("nodes", [])),
        "edges": deepcopy(graph.get("edges", [])),
        "timeline": deepcopy(graph.get("timeline", [])),
    }


def _graph_fingerprint(graph: dict[str, list[dict[str, object]]]) -> str:
    canonical = json.dumps(
        _to_contract_graph(graph),
        ensure_ascii=False,
        sort_keys=True,
        separators=(",", ":"),
    )
    return hashlib.sha1(canonical.encode("utf-8")).hexdigest()[:8]


def _build_variant_graph(
    base_graph: dict[str, list[dict[str, object]]],
    *,
    dx: int,
    dy: int,
) -> dict[str, list[dict[str, object]]]:
    graph = _to_contract_graph(base_graph)

    for node in graph["nodes"]:
        x = node.get("x", 0)
        y = node.get("y", 0)

        if isinstance(x, (int, float)):
            node["x"] = x + dx
        if isinstance(y, (int, float)):
            node["y"] = y + dy

    return graph


def generate_drafts(
    base_graph: dict[str, list[dict[str, object]]],
) -> list[dict[str, object]]:
    fingerprint = _graph_fingerprint(base_graph)
    drafts: list[dict[str, object]] = []

    for idx, strategy in enumerate(_STRATEGIES, start=1):
        dx, dy = _STRATEGY_OFFSETS[strategy]
        draft_graph = _build_variant_graph(base_graph, dx=dx, dy=dy)

        drafts.append(
            {
                "draft_id": f"draft-{idx}-{strategy}-{fingerprint}",
                "strategy": strategy,
                "graph": draft_graph,
            }
        )

    return drafts
