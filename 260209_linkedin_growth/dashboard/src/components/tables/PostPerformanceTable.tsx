import { ArrowDown, ArrowUp } from 'lucide-react';
import { useState } from 'react';
import type { Post } from '../../types';

interface Props {
  posts: Post[];
}

type SortKey = 'impressions' | 'engagement_rate' | 'reactions' | 'comments' | 'created_at';

const TYPE_LABEL: Record<string, string> = {
  build_log: 'Build Log',
  milestone: 'Milestone',
  experiment: 'Experiment',
  technical: 'Technical',
  career: 'Career',
  til: 'TIL',
  story: 'Story',
  insight: 'Insight',
};

const COLUMNS: Array<{ key: SortKey; label: string }> = [
  { key: 'impressions', label: '노출' },
  { key: 'engagement_rate', label: '참여율' },
  { key: 'reactions', label: '반응' },
  { key: 'comments', label: '댓글' },
  { key: 'created_at', label: '날짜' },
];

export default function PostPerformanceTable({ posts }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('impressions');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sorted = [...posts].sort((a, b) => {
    const aVal = a[sortKey] ?? '';
    const bVal = b[sortKey] ?? '';
    const cmp = typeof aVal === 'number' ? aVal - (bVal as number) : String(aVal).localeCompare(String(bVal));
    return sortDir === 'desc' ? -cmp : cmp;
  });

  const getSortIcon = (col: SortKey) => {
    if (sortKey !== col) return null;
    return sortDir === 'desc' ? <ArrowDown size={14} aria-hidden="true" /> : <ArrowUp size={14} aria-hidden="true" />;
  };

  const getAriaSort = (col: SortKey) => {
    if (sortKey !== col) return 'none';
    return sortDir === 'asc' ? 'ascending' : 'descending';
  };

  return (
    <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden">
      <div className="p-6 border-b border-slate-700/50">
        <h3 className="text-lg font-semibold text-white">포스트별 성과</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-slate-400 border-b border-slate-700/50">
              <th scope="col" className="px-6 py-3">포스트</th>
              {COLUMNS.map(({ key, label }) => (
                <th
                  key={key}
                  scope="col"
                  aria-sort={getAriaSort(key)}
                  className="px-4 py-3 whitespace-nowrap"
                >
                  <button
                    type="button"
                    onClick={() => handleSort(key)}
                    className="w-full text-left inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 rounded"
                  >
                    {label}
                    {getSortIcon(key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map(post => (
              <tr key={post.post_id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-start gap-2 max-w-md">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-700 text-slate-300 whitespace-nowrap">
                      {TYPE_LABEL[post.type] ?? post.type}
                    </span>
                    <span className="text-sm text-slate-300 line-clamp-2">{post.text}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-medium text-white">{post.impressions.toLocaleString()}</td>
                <td className="px-4 py-4">
                  <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                    post.engagement_rate >= 8 ? 'bg-emerald-500/20 text-emerald-400' :
                    post.engagement_rate >= 5 ? 'bg-blue-500/20 text-blue-400' :
                    'bg-slate-500/20 text-slate-400'
                  }`}>
                    {post.engagement_rate.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-slate-300">{post.reactions}</td>
                <td className="px-4 py-4 text-sm text-slate-300">{post.comments}</td>
                <td className="px-4 py-4 text-sm text-slate-400">{post.created_at?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
