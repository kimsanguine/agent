import { RefreshCw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useTargetRecommendations } from '../../hooks/useLinkedInData';
import type { RecommendationMutationAction, TargetRecommendationCandidate } from '../../types';

const PROFILE_DNA_LABEL: Record<string, string> = {
  builder: 'Builder',
  insight: 'Insight',
  connector: 'Connector',
  storyteller: 'Storyteller',
};

const POPULARITY_LABEL: Record<string, string> = {
  seed: 'Seed',
  rising: 'Rising',
  growing: 'Growing',
  authority: 'Authority',
};

const ACTION_LABEL: Record<TargetRecommendationCandidate['recommended_action'], string> = {
  connect: 'Connect 추천',
  follow: 'Follow 추천',
  watch: '관찰 추천',
  skip: '제외 추천',
};

const ACTION_STYLE: Record<TargetRecommendationCandidate['recommended_action'], string> = {
  connect: 'bg-emerald-500/20 text-emerald-400',
  follow: 'bg-blue-500/20 text-blue-400',
  watch: 'bg-amber-500/20 text-amber-400',
  skip: 'bg-slate-500/20 text-slate-400',
};

export default function RecommendedTargetsPanel() {
  const { data, loading, refresh, applyAction } = useTargetRecommendations({
    limit: 5,
    minScore: 50,
    state: 'active',
  });
  const [processingKey, setProcessingKey] = useState<string | null>(null);

  const handleAction = async (candidateId: string, action: RecommendationMutationAction) => {
    setProcessingKey(`${candidateId}:${action}`);
    try {
      await applyAction(candidateId, { action });
    } catch (error) {
      console.error(error);
    } finally {
      setProcessingKey(null);
    }
  };

  if (loading) {
    return <div className="text-slate-400 p-6">로딩 중...</div>;
  }

  const candidates = data?.candidates ?? [];

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-amber-400" />
            <h3 className="text-lg font-semibold text-white">추천 타겟</h3>
            <span className="text-sm text-slate-400">({candidates.length}명)</span>
          </div>
          <button
            type="button"
            onClick={refresh}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-xs hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800"
          >
            <RefreshCw size={12} aria-hidden="true" />
            새로고침
          </button>
        </div>
        {data && (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
            <span className="px-2 py-1 rounded bg-slate-700">
              프로필: {PROFILE_DNA_LABEL[data.profile_dna.type] ?? data.profile_dna.type}
            </span>
            <span className="px-2 py-1 rounded bg-slate-700">
              인기도 PI {Math.round(data.popularity.pi)} · {POPULARITY_LABEL[data.popularity.grade] ?? data.popularity.grade}
            </span>
          </div>
        )}
      </div>

      <div className="divide-y divide-slate-700/30">
        {candidates.length === 0 && (
          <div className="p-8 text-center text-slate-500">추천 타겟이 없습니다</div>
        )}

        {candidates.map(candidate => (
          <div key={candidate.candidate_id} className="p-4 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{candidate.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{candidate.headline}</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-amber-300">{candidate.scores.trs.toFixed(1)}</span>
                <p className="text-[11px] text-slate-500">TRS</p>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className={`px-2 py-0.5 rounded ${ACTION_STYLE[candidate.recommended_action]}`}>
                {ACTION_LABEL[candidate.recommended_action]}
              </span>
              <span className="text-slate-400">{candidate.network_distance}촌</span>
              <span className="text-slate-500">공통 연결 {candidate.mutual_count}명</span>
            </div>

            {candidate.topics.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {candidate.topics.slice(0, 3).map(topic => (
                  <span key={topic} className="px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 text-xs">
                    {topic}
                  </span>
                ))}
              </div>
            )}

            {candidate.reasons.length > 0 && (
              <ul className="mt-2 space-y-1 text-xs text-slate-400 list-disc pl-4">
                {candidate.reasons.slice(0, 2).map(reason => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleAction(candidate.candidate_id, 'connect')}
                disabled={processingKey === `${candidate.candidate_id}:connect`}
                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 text-xs hover:bg-emerald-600/30 transition-colors disabled:opacity-60"
              >
                Connect
              </button>
              <button
                type="button"
                onClick={() => handleAction(candidate.candidate_id, 'follow')}
                disabled={processingKey === `${candidate.candidate_id}:follow`}
                className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-xs hover:bg-blue-600/30 transition-colors disabled:opacity-60"
              >
                Follow
              </button>
              <button
                type="button"
                onClick={() => handleAction(candidate.candidate_id, 'add_target')}
                disabled={processingKey === `${candidate.candidate_id}:add_target`}
                className="px-3 py-1.5 rounded-lg bg-purple-600/20 text-purple-400 text-xs hover:bg-purple-600/30 transition-colors disabled:opacity-60"
              >
                타겟 추가
              </button>
              <button
                type="button"
                onClick={() => handleAction(candidate.candidate_id, 'hide')}
                disabled={processingKey === `${candidate.candidate_id}:hide`}
                className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-xs hover:text-white transition-colors disabled:opacity-60"
              >
                숨김
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
