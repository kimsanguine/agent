from src.draft_generator import generate_drafts


def _sample_base_graph() -> dict[str, list[dict[str, object]]]:
    return {
        "nodes": [
            {"id": "n1", "label": "Start", "type": "shape", "x": 0, "y": 0},
            {"id": "n2", "label": "End", "type": "shape", "x": 300, "y": 0},
        ],
        "edges": [{"id": "e1", "source": "n1", "target": "n2"}],
        "timeline": [
            {"nodeId": "n1", "startFrame": 0, "endFrame": 45},
            {"nodeId": "n2", "startFrame": 30, "endFrame": 75},
        ],
    }


def test_generate_drafts_returns_exactly_three_drafts():
    drafts = generate_drafts(_sample_base_graph())

    assert len(drafts) == 3


def test_generate_drafts_has_expected_unique_strategies():
    drafts = generate_drafts(_sample_base_graph())

    strategies = [draft["strategy"] for draft in drafts]
    assert strategies == ["pipeline_flow", "loop_feedback", "hub_spoke"]
    assert len(set(strategies)) == 3


def test_generate_drafts_contains_required_fields_and_graph_contract():
    drafts = generate_drafts(_sample_base_graph())

    for draft in drafts:
        assert set(draft.keys()) >= {"draft_id", "strategy", "graph"}
        assert isinstance(draft["draft_id"], str)
        assert draft["draft_id"]

        graph = draft["graph"]
        assert set(graph.keys()) >= {"nodes", "edges", "timeline"}
        assert isinstance(graph["nodes"], list)
        assert isinstance(graph["edges"], list)
        assert isinstance(graph["timeline"], list)


def test_generate_drafts_is_deterministic_for_same_input():
    base_graph = _sample_base_graph()

    first = generate_drafts(base_graph)
    second = generate_drafts(base_graph)

    assert first == second
    assert [draft["draft_id"] for draft in first] == [
        draft["draft_id"] for draft in second
    ]
