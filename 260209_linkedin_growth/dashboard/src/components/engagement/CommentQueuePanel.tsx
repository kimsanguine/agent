import { Check, Copy, MessageSquare, X } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useId, useRef, useState } from 'react';
import { useCommentQueue } from '../../hooks/useLinkedInData';

const TONE_LABEL: Record<string, string> = {
  professional: '전문적',
  casual: '친근',
  question: '질문형',
};

const FILTERS = [
  { key: 'pending', label: '대기' },
  { key: 'approved', label: '승인' },
  { key: 'posted', label: '게시' },
  { key: 'all', label: '전체' },
] as const;

type FilterKey = typeof FILTERS[number]['key'];

export default function CommentQueuePanel() {
  const [statusFilter, setStatusFilter] = useState<FilterKey>('pending');
  const { queue, stats, loading, approveComment, rejectComment, markPosted } = useCommentQueue(statusFilter);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const filterRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabListId = useId();
  const panelId = `${tabListId}-panel`;

  const handleApprove = (id: string) => {
    if (editingId === id && editText) {
      approveComment(id, editText);
    } else {
      approveComment(id);
    }
    setEditingId(null);
    setEditText('');
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleFilterKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number, key: FilterKey) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (index + 1) % FILTERS.length;
      filterRefs.current[nextIndex]?.focus();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = (index - 1 + FILTERS.length) % FILTERS.length;
      filterRefs.current[prevIndex]?.focus();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      filterRefs.current[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      filterRefs.current[FILTERS.length - 1]?.focus();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setStatusFilter(key);
    }
  };

  if (loading) return <div className="text-slate-400 p-6">로딩 중...</div>;

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-blue-400" />
            <h3 className="text-lg font-semibold text-white">댓글 큐</h3>
          </div>
          {stats && (
            <div className="flex gap-3 text-xs">
              <span className="text-amber-400">대기 {stats.pending}</span>
              <span className="text-emerald-400">승인 {stats.approved}</span>
              <span className="text-blue-400">게시 {stats.posted}</span>
            </div>
          )}
        </div>
        <div role="tablist" aria-label="댓글 상태 필터" className="flex gap-2 mt-4" id={tabListId}>
          {FILTERS.map(({ key, label }, index) => (
            <button
              key={key}
              ref={el => {
                filterRefs.current[index] = el;
              }}
              type="button"
              id={`${tabListId}-tab-${key}`}
              role="tab"
              aria-selected={statusFilter === key}
              aria-controls={panelId}
              tabIndex={statusFilter === key ? 0 : -1}
              onClick={() => setStatusFilter(key)}
              onKeyDown={event => handleFilterKeyDown(event, index, key)}
              className={`px-3 py-1 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 ${
                statusFilter === key ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={`${tabListId}-tab-${statusFilter}`} className="divide-y divide-slate-700/30">
        {queue.length === 0 && (
          <div className="p-8 text-center text-slate-500">댓글이 없습니다</div>
        )}
        {queue.map(item => (
          <div key={item.id} className="p-4 hover:bg-slate-700/20 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">{item.target_name}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300">
                  {TONE_LABEL[item.tone] || item.tone}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  item.quality_score >= 0.8 ? 'bg-emerald-500/20 text-emerald-400' :
                  item.quality_score >= 0.7 ? 'bg-blue-500/20 text-blue-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  품질 {(item.quality_score * 100).toFixed(0)}
                </span>
              </div>
              <span className="text-xs text-slate-500">{item.created_at?.slice(0, 10)}</span>
            </div>

            <p className="text-xs text-slate-500 mb-2 line-clamp-1">원문: {item.post_preview}</p>

            {editingId === item.id ? (
              <textarea
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="w-full bg-slate-700 text-slate-200 rounded-lg p-3 text-sm border border-slate-600 focus:border-blue-500 outline-none resize-none"
                rows={3}
              />
            ) : (
              <p className="text-sm text-slate-300 mb-3">{item.text}</p>
            )}

            {item.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 text-sm hover:bg-emerald-600/30 transition-colors"
                >
                  <Check size={14} /> 승인
                </button>
                <button
                  onClick={() => { setEditingId(item.id); setEditText(item.text); }}
                  className="px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-sm hover:bg-blue-600/30 transition-colors"
                >
                  수정
                </button>
                <button
                  onClick={() => rejectComment(item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600/20 text-rose-400 text-sm hover:bg-rose-600/30 transition-colors"
                >
                  <X size={14} /> 거부
                </button>
              </div>
            )}
            {item.status === 'approved' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(item.text)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 text-sm hover:bg-blue-600/30 transition-colors"
                >
                  <Copy size={14} /> 복사
                </button>
                <button
                  onClick={() => markPosted(item.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 text-sm hover:bg-emerald-600/30 transition-colors"
                >
                  <Check size={14} /> 게시 완료
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
