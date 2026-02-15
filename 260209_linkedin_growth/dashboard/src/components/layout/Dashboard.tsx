import { BarChart3, Eye, Target, TrendingUp, Users } from 'lucide-react';
import type { KeyboardEvent } from 'react';
import { useId, useRef, useState } from 'react';
import { useInsights, usePosts, useSummary, useTrends } from '../../hooks/useLinkedInData';
import EngagementTrendChart from '../charts/EngagementTrendChart';
import FollowerGrowthChart from '../charts/FollowerGrowthChart';
import MetricsCard from '../charts/MetricsCard';
import CommentQueuePanel from '../engagement/CommentQueuePanel';
import RecommendedTargetsPanel from '../engagement/RecommendedTargetsPanel';
import TargetProfilesList from '../engagement/TargetProfilesList';
import InsightsPanel from '../insights/InsightsPanel';
import PostPerformanceTable from '../tables/PostPerformanceTable';

type Tab = 'overview' | 'posts' | 'engagement';

const TABS = [
  { key: 'overview' as const, label: '대시보드', icon: TrendingUp },
  { key: 'posts' as const, label: '포스트', icon: Eye },
  { key: 'engagement' as const, label: '참여', icon: Target },
];

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('overview');
  const { data: summary, loading: summaryLoading } = useSummary();
  const { data: posts, loading: postsLoading } = usePosts();
  const { data: trends, loading: trendsLoading } = useTrends(90);
  const { data: insights } = useInsights(30);
  const tabListId = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const loading = summaryLoading || postsLoading || trendsLoading;

  const getTabId = (key: Tab) => `${tabListId}-tab-${key}`;
  const getPanelId = (key: Tab) => `${tabListId}-panel-${key}`;

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, key: Tab) => {
    const currentIndex = TABS.findIndex(item => item.key === key);

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % TABS.length;
      tabRefs.current[nextIndex]?.focus();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      tabRefs.current[prevIndex]?.focus();
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      tabRefs.current[0]?.focus();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      tabRefs.current[TABS.length - 1]?.focus();
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setTab(key);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-600">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">LinkedIn Growth</h1>
                <p className="text-xs text-slate-400">
                  {summary ? `${summary.total_posts}개 포스트 추적 중` : '로딩 중...'}
                  {' · '}
                  <span className="text-amber-400">Mock 모드</span>
                </p>
              </div>
            </div>

            <nav role="tablist" aria-label="대시보드 섹션" className="flex gap-1 bg-slate-800 rounded-xl p-1" id={tabListId}>
              {TABS.map(({ key, label, icon: Icon }, index) => (
                <button
                  key={key}
                  ref={el => {
                    tabRefs.current[index] = el;
                  }}
                  type="button"
                  id={getTabId(key)}
                  role="tab"
                  aria-selected={tab === key}
                  aria-controls={getPanelId(key)}
                  tabIndex={tab === key ? 0 : -1}
                  onClick={() => setTab(key)}
                  onKeyDown={event => handleTabKeyDown(event, key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800 ${
                    tab === key ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </div>
        ) : (
          <>
            <section
              id={getPanelId('overview')}
              role="tabpanel"
              aria-labelledby={getTabId('overview')}
              hidden={tab !== 'overview'}
              className="space-y-6"
            >
              {tab === 'overview' && summary && trends && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricsCard
                      title="총 팔로워"
                      value={summary.followers.total}
                      change={`+${summary.period_stats.follower_gain_week} 이번 주`}
                      icon={Users}
                      color="bg-purple-500/20 text-purple-400"
                    />
                    <MetricsCard
                      title="평균 노출"
                      value={summary.period_stats.avg_impressions}
                      change={summary.period_stats.prev_impressions != null
                        ? `${summary.period_stats.avg_impressions > summary.period_stats.prev_impressions ? '↑' : '↓'} vs 지난 주`
                        : undefined}
                      icon={Eye}
                      color="bg-blue-500/20 text-blue-400"
                    />
                    <MetricsCard
                      title="평균 참여율"
                      value={`${summary.period_stats.avg_engagement_rate}%`}
                      change={`${summary.period_stats.engagement_change > 0 ? '+' : ''}${summary.period_stats.engagement_change}%p`}
                      icon={TrendingUp}
                      color="bg-emerald-500/20 text-emerald-400"
                    />
                    <MetricsCard
                      title="총 포스트"
                      value={summary.total_posts}
                      change={`${summary.weekly_stats.posts_published}개 이번 주`}
                      icon={BarChart3}
                      color="bg-amber-500/20 text-amber-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <EngagementTrendChart data={trends} />
                    <FollowerGrowthChart data={trends} />
                  </div>

                  {insights && <InsightsPanel insights={insights} />}

                  <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">4주 성장 추세</h3>
                    <p className="text-slate-300">{summary.weekly_stats.growth_trend}</p>
                  </div>
                </>
              )}
            </section>

            <section
              id={getPanelId('posts')}
              role="tabpanel"
              aria-labelledby={getTabId('posts')}
              hidden={tab !== 'posts'}
            >
              {tab === 'posts' && <PostPerformanceTable posts={posts} />}
            </section>

            <section
              id={getPanelId('engagement')}
              role="tabpanel"
              aria-labelledby={getTabId('engagement')}
              hidden={tab !== 'engagement'}
            >
              {tab === 'engagement' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <CommentQueuePanel />
                  <div className="space-y-6">
                    <RecommendedTargetsPanel />
                    <TargetProfilesList />
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
