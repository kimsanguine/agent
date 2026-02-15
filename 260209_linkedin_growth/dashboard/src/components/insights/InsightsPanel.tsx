import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Clock, MessageSquare, Sparkles } from 'lucide-react';
import type { Insights } from '../../types';

interface InsightsPanelProps {
  insights: Insights;
}

const ICON_MAP = {
  topic: Sparkles,
  format: MessageSquare,
  timing: Clock,
  trend: TrendingUp,
};

const IMPACT_COLORS = {
  high: 'text-emerald-400',
  medium: 'text-blue-400',
  low: 'text-slate-400',
};

const IMPACT_BADGE_STYLES = {
  high: 'bg-emerald-500/10 text-emerald-400',
  medium: 'bg-blue-500/10 text-blue-400',
  low: 'bg-slate-500/20 text-slate-300',
};

const TYPE_LABEL = {
  topic: '주제',
  format: '형식',
  timing: '타이밍',
  trend: '트렌드',
};

const IMPACT_LABEL = {
  high: '높은 영향',
  medium: '중간 영향',
  low: '낮은 영향',
};

const DATA_QUALITY_TEXT = {
  excellent: '분석 품질: 우수',
  good: '분석 품질: 좋음',
  fair: '분석 품질: 보통',
  poor: '분석 품질: 부족 (더 많은 데이터 필요)',
};

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  const { insights: items, summary, data_quality } = insights;

  if (!items || items.length === 0) {
    return (
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">AI 콘텐츠 인사이트</h3>
          </div>
        </div>
        <div className="p-6">
          <p className="text-slate-400 text-sm">
            아직 분석할 데이터가 부족합니다. 포스트를 게시하고 데이터를 축적하세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">AI 콘텐츠 인사이트</h3>
          </div>
          <span className="text-xs text-slate-400">{DATA_QUALITY_TEXT[data_quality]}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 p-4 rounded-xl bg-slate-700/30 border border-slate-600/40">
          <p className="text-sm text-slate-300">{summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((insight, idx) => {
            const Icon = ICON_MAP[insight.type];
            const impactColor = IMPACT_COLORS[insight.impact];

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-xl bg-slate-700/30 border border-slate-600/40 p-4 hover:border-slate-500/60 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <Icon className={`w-5 h-5 mt-0.5 ${impactColor}`} />
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm mb-1">{insight.title}</h4>
                    <p className={`text-lg font-bold ${impactColor} mb-2`}>{insight.metric}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>

                <div className="mt-3 flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${IMPACT_BADGE_STYLES[insight.impact]}`}>
                    {IMPACT_LABEL[insight.impact]}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-600/40 text-slate-300">
                    {TYPE_LABEL[insight.type]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
