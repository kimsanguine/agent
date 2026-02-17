import json
from pathlib import Path

import pytest

import src.input_loader as input_loader
from src.schema import InputChannel


def test_load_input_graph_graph_json_reads_file(tmp_path: Path):
    expected = {
        "nodes": [{"id": "n1", "label": "시작", "type": "shape", "x": 0, "y": 0}],
        "edges": [],
        "timeline": [{"nodeId": "n1", "startFrame": 0, "endFrame": 45}],
    }
    graph_path = tmp_path / "graph.json"
    graph_path.write_text(json.dumps(expected, ensure_ascii=False), encoding="utf-8")

    graph = input_loader.load_input_graph(
        channel=InputChannel.GRAPH_JSON,
        value=str(graph_path),
        client=None,
        board_id=None,
    )

    assert graph == expected


def test_load_input_graph_prompt_parses_and_returns_graph_contract():
    prompt = """목표: 고객 문의 자동화
단계: 문의 접수 -> 분류 -> 응답
강조: 응답속도
톤: professional"""

    graph = input_loader.load_input_graph(
        channel=InputChannel.PROMPT,
        value=prompt,
        client=None,
        board_id=None,
    )

    assert set(graph.keys()) == {"nodes", "edges", "timeline"}
    assert [node["label"] for node in graph["nodes"]] == ["문의 접수", "분류", "응답"]
    assert graph["edges"] == [
        {"id": "e1", "source": "n1", "target": "n2"},
        {"id": "e2", "source": "n2", "target": "n3"},
    ]


def test_load_input_graph_prompt_file_reads_and_returns_graph_contract(tmp_path: Path):
    prompt_path = tmp_path / "prompt.txt"
    prompt_path.write_text(
        """목표: 결제 이탈 감소
단계: 이탈 분석 -> 개선안 설계 -> A/B 테스트
강조: 전환율
톤: professional""",
        encoding="utf-8",
    )

    graph = input_loader.load_input_graph(
        channel=InputChannel.PROMPT_FILE,
        value=str(prompt_path),
        client=None,
        board_id=None,
    )

    assert [node["label"] for node in graph["nodes"]] == ["이탈 분석", "개선안 설계", "A/B 테스트"]
    assert graph["timeline"][0] == {"nodeId": "n1", "startFrame": 0, "endFrame": 45}


@pytest.mark.parametrize(
    ("client", "board_id"),
    [
        (None, "b1"),
        (object(), None),
        (object(), ""),
    ],
)
def test_load_input_graph_miro_board_requires_client_and_board_id(client, board_id):
    with pytest.raises(ValueError):
        input_loader.load_input_graph(
            channel=InputChannel.MIRO_BOARD,
            value="ignored",
            client=client,
            board_id=board_id,
        )


def test_load_input_graph_miro_board_fetches_items_then_normalizes(monkeypatch):
    items = [{"id": "shape-1", "type": "shape", "data": {"content": "Node"}, "position": {"x": 10, "y": 20}}]

    class FakeClient:
        def __init__(self) -> None:
            self.called_with: list[str] = []

        def get_board_items(self, board_id: str):
            self.called_with.append(board_id)
            return items

    captured: dict[str, object] = {}

    def fake_normalize(input_items):
        captured["items"] = input_items
        return {"nodes": [{"id": "normalized"}], "edges": [], "timeline": []}

    monkeypatch.setattr(input_loader, "normalize_items", fake_normalize)

    client = FakeClient()
    graph = input_loader.load_input_graph(
        channel=InputChannel.MIRO_BOARD,
        value="ignored",
        client=client,
        board_id="board-123",
    )

    assert client.called_with == ["board-123"]
    assert captured["items"] == items
    assert graph == {"nodes": [{"id": "normalized"}], "edges": [], "timeline": []}


def test_load_input_graph_graph_json_rejects_malformed_shape(tmp_path: Path):
    malformed = {
        "nodes": [],
        "edges": {},
        "timeline": [],
    }
    graph_path = tmp_path / "bad_graph.json"
    graph_path.write_text(json.dumps(malformed, ensure_ascii=False), encoding="utf-8")

    with pytest.raises(ValueError):
        input_loader.load_input_graph(
            channel=InputChannel.GRAPH_JSON,
            value=str(graph_path),
            client=None,
            board_id=None,
        )


def test_load_input_graph_unsupported_channel_raises_value_error():
    with pytest.raises(ValueError):
        input_loader.load_input_graph(
            channel="unsupported-channel",
            value="ignored",
            client=None,
            board_id=None,
        )
