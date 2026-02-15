export interface Post {
  post_id: string;
  text: string;
  type: string;
  created_at: string;
  impressions: number;
  reactions: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  visibility: string;
}

export interface FollowerData {
  total: number;
  new_this_week: number;
}

export interface FollowerHistory {
  date: string;
  total: number;
  gained: number;
}

export interface ProfileView {
  date: string;
  views: number;
}

export interface PeriodStats {
  avg_impressions: number;
  avg_engagement_rate: number;
  prev_impressions: number | null;
  engagement_change: number;
  follower_gain_week: number;
}

export interface WeeklyStats {
  posts_published: number;
  total_impressions: number;
  total_reactions: number;
  total_comments: number;
  avg_engagement_rate: number;
  follower_gain: number;
  growth_trend: string;
}

export interface Summary {
  user_id: string;
  period_stats: PeriodStats;
  weekly_stats: WeeklyStats;
  followers: FollowerData;
  total_posts: number;
}

export interface Trends {
  follower_history: FollowerHistory[];
  profile_views: ProfileView[];
  post_timeline: {
    date: string;
    impressions: number;
    engagement_rate: number;
    reactions: number;
    comments: number;
  }[];
}

export interface RecommendedTopic {
  topic: string;
  reason: string;
  example_title: string;
  expected_type: string;
}

export interface Analysis {
  high_performing_patterns: string[];
  low_performing_patterns: string[];
  best_posting_time: string;
  recommended_topics: RecommendedTopic[];
  overall_strategy: string;
}

export interface Recommendations {
  generated_at: string;
  posts_analyzed: number;
  analysis: Analysis;
}

export interface Target {
  id: string;
  name: string;
  profile_url: string;
  headline: string;
  topics: string[];
  priority: string;
  added_at: string;
  last_engaged: string | null;
  engagement_count: number;
  notes: string;
}

export interface CommentDraft {
  id: string;
  target_id: string;
  target_name: string;
  post_url: string;
  post_preview: string;
  tone: string;
  text: string;
  quality_score: number;
  status: 'pending' | 'approved' | 'posted' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
  posted_at: string | null;
}

export interface QueueStats {
  total: number;
  pending: number;
  approved: number;
  posted: number;
  rejected: number;
}

export interface ContentInsight {
  title: string;
  metric: string;
  description: string;
  type: 'topic' | 'format' | 'timing' | 'trend';
  impact: 'high' | 'medium' | 'low';
}

export interface Insights {
  user_id: string;
  period_days: number;
  insights: ContentInsight[];
  summary: string;
  data_quality: 'excellent' | 'good' | 'fair' | 'poor';
}

export type ProfileDnaType = 'builder' | 'insight' | 'connector' | 'storyteller';

export interface ProfileDnaScores {
  content_fit: number;
  interaction_style: number;
  operating_rhythm: number;
}

export interface ProfileDNA {
  type: ProfileDnaType;
  scores: ProfileDnaScores;
  window_days?: number;
  updated_at?: string;
}

export type PopularityGrade = 'seed' | 'rising' | 'growing' | 'authority';

export interface PopularityComponents {
  reach_score: number;
  engagement_quality_score: number;
  growth_velocity_score: number;
}

export interface PopularityIndex {
  pi: number;
  grade: PopularityGrade;
  components: PopularityComponents;
}

export type RecommendationAction = 'connect' | 'follow' | 'watch' | 'skip';

export type RecommendationState = 'active' | 'hidden' | 'snoozed' | 'converted';

export interface RecommendationRecentActivity {
  posts_30d: number;
  avg_engagement_rate: number;
  last_posted_at: string;
}

export interface RecommendationScores {
  trs: number;
  topic_fit: number;
  response_probability: number;
  popularity_fit: number;
  network_distance_fit: number;
  recent_activity: number;
  penalty: number;
}

export interface TargetRecommendationCandidate {
  candidate_id: string;
  name: string;
  profile_url: string;
  headline: string;
  topics: string[];
  network_distance: number;
  mutual_count: number;
  recent_activity: RecommendationRecentActivity;
  scores: RecommendationScores;
  recommended_action: RecommendationAction;
  reasons: string[];
  state: RecommendationState;
}

export interface TargetRecommendationWeights {
  topic_fit: number;
  response_probability: number;
  popularity_fit: number;
  network_distance_fit: number;
  recent_activity: number;
}

export interface TargetRecommendationsMeta {
  total: number;
  returned: number;
  cached: boolean;
}

export interface TargetRecommendationsResponse {
  user_id: string;
  generated_at: string;
  window_days: number;
  profile_dna: ProfileDNA;
  popularity: PopularityIndex;
  weights: TargetRecommendationWeights;
  candidates: TargetRecommendationCandidate[];
  meta: TargetRecommendationsMeta;
}

export interface TargetRecommendationsRefreshResponse {
  ok: boolean;
  job_id?: string;
  status?: 'queued' | 'running' | 'completed';
  user_id?: string;
  generated_at?: string;
  total_candidates?: number;
}

export type RecommendationMutationAction = 'connect' | 'follow' | 'add_target' | 'hide' | 'snooze' | 'skip';

export interface TargetRecommendationActionRequest {
  user_id: string;
  action: RecommendationMutationAction;
  note?: string;
  snooze_days?: number;
}

export interface TargetRecommendationActionResponse {
  ok: boolean;
  candidate_id?: string;
  action?: RecommendationMutationAction;
  state?: RecommendationState;
  target_id?: string;
  updated_at?: string;
  error?: string;
}
