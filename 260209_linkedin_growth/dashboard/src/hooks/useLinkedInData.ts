import { useEffect, useState } from 'react';
import { LINKEDIN_USER_ID } from '../config/linkedin';
import type {
  CommentDraft,
  Insights,
  Post,
  QueueStats,
  Recommendations,
  Summary,
  Target,
  TargetRecommendationActionRequest,
  TargetRecommendationActionResponse,
  TargetRecommendationsRefreshResponse,
  TargetRecommendationsResponse,
  Trends,
} from '../types';

const API_BASE = '/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function useSummary() {
  const [data, setData] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<Summary>(`${API_BASE}/analytics/${LINKEDIN_USER_ID}/summary`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function usePosts(sort = 'impressions', order = 'desc') {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<{ posts: Post[] }>(`${API_BASE}/analytics/${LINKEDIN_USER_ID}/posts?sort=${sort}&order=${order}`)
      .then(res => setData(res.posts))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [sort, order]);

  return { data, loading };
}

export function useTrends(days = 30) {
  const [data, setData] = useState<Trends | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<Trends>(`${API_BASE}/analytics/${LINKEDIN_USER_ID}/trends?days=${days}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [days]);

  return { data, loading };
}

export function useRecommendations() {
  const [data, setData] = useState<Recommendations | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<Recommendations>(`${API_BASE}/recommendations/${LINKEDIN_USER_ID}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}

export function useTargets() {
  const [data, setData] = useState<Target[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    fetchJson<{ targets: Target[] }>(`${API_BASE}/targets`)
      .then(res => setData(res.targets))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(refresh, []);

  return { data, loading, refresh };
}

export function useCommentQueue(status = 'pending') {
  const [queue, setQueue] = useState<CommentDraft[]>([]);
  const [stats, setStats] = useState<QueueStats | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    fetchJson<{ queue: CommentDraft[]; stats: QueueStats }>(`${API_BASE}/comments/queue?status=${status}`)
      .then(res => {
        setQueue(res.queue);
        setStats(res.stats);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(refresh, [status]);

  const approveComment = async (id: string, editedText?: string) => {
    await fetch(`${API_BASE}/comments/${id}/approve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedText ? { text: editedText } : {}),
    });
    refresh();
  };

  const rejectComment = async (id: string) => {
    await fetch(`${API_BASE}/comments/${id}/reject`, { method: 'POST' });
    refresh();
  };

  const markPosted = async (id: string) => {
    await fetch(`${API_BASE}/comments/${id}/posted`, { method: 'POST' });
    refresh();
  };

  return { queue, stats, loading, refresh, approveComment, rejectComment, markPosted };
}

export function useInsights(days = 30) {
  const [data, setData] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson<Insights>(`${API_BASE}/analytics/${LINKEDIN_USER_ID}/insights?days=${days}`)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [days]);

  return { data, loading };
}

interface UseTargetRecommendationsOptions {
  limit?: number;
  minScore?: number;
  distance?: 1 | 2 | 3;
  action?: 'connect' | 'follow' | 'watch' | 'skip';
  state?: 'active' | 'hidden' | 'snoozed' | 'converted';
  refresh?: boolean;
}

function buildRecommendationQuery(options: UseTargetRecommendationsOptions = {}) {
  const params = new URLSearchParams();

  if (options.limit != null) params.set('limit', String(options.limit));
  if (options.minScore != null) params.set('min_score', String(options.minScore));
  if (options.distance != null) params.set('distance', String(options.distance));
  if (options.action) params.set('action', options.action);
  if (options.state) params.set('state', options.state);
  if (options.refresh != null) params.set('refresh', String(options.refresh));

  const query = params.toString();
  return query ? `?${query}` : '';
}

export function useTargetRecommendations(options: UseTargetRecommendationsOptions = {}) {
  const [data, setData] = useState<TargetRecommendationsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const query = buildRecommendationQuery(options);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetchJson<TargetRecommendationsResponse>(`${API_BASE}/targets/recommendations${query}`);
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [query]);

  const runRefresh = async (payload: { window_days?: number; limit?: number; force?: boolean } = {}) => {
    const res = await fetch(`${API_BASE}/targets/recommendations/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: LINKEDIN_USER_ID, ...payload }),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const body = await res.json() as TargetRecommendationsRefreshResponse;
    await fetchRecommendations();
    return body;
  };

  const applyAction = async (candidateId: string, payload: Omit<TargetRecommendationActionRequest, 'user_id'>) => {
    const res = await fetch(`${API_BASE}/targets/recommendations/${candidateId}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: LINKEDIN_USER_ID, ...payload }),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    const body = await res.json() as TargetRecommendationActionResponse;
    await fetchRecommendations();
    return body;
  };

  return {
    data,
    loading,
    refresh: fetchRecommendations,
    runRefresh,
    applyAction,
  };
}
