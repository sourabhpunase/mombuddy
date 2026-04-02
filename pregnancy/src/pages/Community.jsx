import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, Heart, Calendar, Video, Share2, Trophy, Zap, Brain, Target, X } from 'lucide-react';
import { useToast } from '../context/ToastContext.jsx';
import {
  joinCommunityGroup,
  joinCommunityEvent,
  joinCommunityChallenge,
  connectSimilarUser,
} from '../services/mombuddyApi.js';
import CareOverviewPanel from '../components/CareOverviewPanel.jsx';

const tabItems = [
  { id: 'feed', label: 'For you', icon: Brain },
  { id: 'discussions', label: 'Discussions', icon: MessageSquare },
  { id: 'groups', label: 'Groups', icon: Users },
  { id: 'events', label: 'Events', icon: Video },
  { id: 'challenges', label: 'Challenges', icon: Trophy },
];

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('feed');
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [likedIds, setLikedIds] = useState(() => new Set());
  const [joinedGroups, setJoinedGroups] = useState(() => new Set());
  const [joinedEvents, setJoinedEvents] = useState(() => new Set());
  const [joinedChallenges, setJoinedChallenges] = useState(() => new Set());
  const [connectedIds, setConnectedIds] = useState(() => new Set());
  const [replyExtra, setReplyExtra] = useState({});

  const [userBehavior] = useState({
    engagementScore: 85,
    interactionPattern: 'supportive',
    preferredTopics: ['nutrition', 'symptoms', 'exercise'],
    activityLevel: 'high',
  });

  const aiModels = {
    community: 'SocialAI-Community-Moderator-v2.3',
    behavior: 'BehaviorAnalytics-Pregnancy-v1.9',
    content: 'ContentCuration-Maternal-v3.1',
    matching: 'PeerMatching-Algorithm-v2.7',
    wellness: 'WellnessTracker-Social-v1.5',
  };

  const [communityInsights, setCommunityInsights] = useState({
    similarUsers: [],
    recommendedGroups: [],
    trendingTopics: [],
    personalizedContent: [],
  });

  const discussions = [
    {
      id: 1,
      title: 'Week 20 anatomy scan - what to expect?',
      author: 'Sarah M.',
      avatar: '👩‍🦰',
      replies: 23,
      likes: 45,
      time: '2 hours ago',
      category: 'Second Trimester',
      engagement: 'high',
      aiTags: ['medical', 'milestone', 'anxiety-support'],
    },
    {
      id: 2,
      title: 'Homemade prenatal smoothie recipes 🥤',
      author: 'Emma K.',
      avatar: '👩‍🦱',
      replies: 31,
      likes: 67,
      time: '4 hours ago',
      category: 'Nutrition',
      engagement: 'viral',
      aiTags: ['nutrition', 'diy', 'wellness'],
    },
    {
      id: 3,
      title: 'Partner support during morning sickness',
      author: 'Lisa R.',
      avatar: '👩‍🦳',
      replies: 18,
      likes: 34,
      time: '6 hours ago',
      category: 'Relationships',
      engagement: 'moderate',
      aiTags: ['support', 'relationships', 'first-trimester'],
    },
  ];

  const liveEvents = [
    {
      id: 1,
      title: 'Live Q&A with Dr. Martinez - Prenatal Nutrition',
      time: 'Today 7:00 PM EST',
      attendees: 234,
      type: 'expert',
      category: 'nutrition',
      aiRecommended: true,
    },
    {
      id: 2,
      title: 'Virtual Prenatal Yoga Session',
      time: 'Tomorrow 6:00 AM EST',
      attendees: 89,
      type: 'wellness',
      category: 'exercise',
      aiRecommended: true,
    },
    {
      id: 3,
      title: 'Birth Story Sharing Circle',
      time: 'Friday 8:00 PM EST',
      attendees: 156,
      type: 'support',
      category: 'birth',
      aiRecommended: false,
    },
  ];

  const groups = [
    {
      id: 1,
      name: 'First-Time Moms Circle',
      members: 1250,
      description: 'Structured support with gentle guidance for first-time mothers.',
      category: 'stage-based',
      aiMatch: 95,
      activity: 'very-high',
      features: ['Weekly check-ins', 'Clinician Q&A', 'Peer support'],
    },
    {
      id: 2,
      name: 'Balanced Pregnancy Wellness',
      members: 890,
      description: 'Nutrition, movement, and rest routines that feel realistic.',
      category: 'lifestyle',
      aiMatch: 88,
      activity: 'high',
      features: ['Habit prompts', 'Recipe threads', 'Gentle exercise'],
    },
    {
      id: 3,
      name: 'PCOS & Pregnancy Support',
      members: 650,
      description: 'Support for mothers managing PCOS alongside pregnancy.',
      category: 'condition-specific',
      aiMatch: 76,
      activity: 'moderate',
      features: ['Condition-aware tips', 'Shared experiences', 'Medical prep'],
    },
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day Prenatal Wellness Challenge',
      participants: 1200,
      progress: 65,
      reward: 'Wellness badge + premium features',
      category: 'wellness',
      aiPersonalized: true,
    },
    {
      id: 2,
      title: 'Mindful Pregnancy Journey',
      participants: 800,
      progress: 40,
      reward: 'Meditation mastery badge',
      category: 'mental-health',
      aiPersonalized: true,
    },
  ];

  const generatePersonalizedFeed = () =>
    discussions.filter((discussion) =>
      userBehavior.preferredTopics.some(
        (topic) => discussion.aiTags.includes(topic) || discussion.category.toLowerCase().includes(topic),
      ),
    );

  const generateAIInsights = () => {
    setCommunityInsights({
      similarUsers: [
        { name: 'Jennifer L.', similarity: 94, commonInterests: ['nutrition', 'exercise'], week: 22 },
        { name: 'Maria S.', similarity: 89, commonInterests: ['symptoms', 'wellness'], week: 20 },
        { name: 'Ashley T.', similarity: 87, commonInterests: ['first-time', 'anxiety'], week: 24 },
      ],
      recommendedGroups: groups.filter((group) => group.aiMatch > 85),
      trendingTopics: ['prenatal-yoga', 'gestational-diabetes', 'baby-movement', 'third-trimester-prep'],
      personalizedContent: generatePersonalizedFeed(),
    });
  };

  useEffect(() => {
    generateAIInsights();
  }, []);

  const toggleLike = (postId) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      const wasLiked = next.has(postId);
      if (wasLiked) next.delete(postId);
      else next.add(postId);
      window.setTimeout(
        () => toast(wasLiked ? 'Removed reaction.' : 'Thanks — saved on this device (demo).', 'success'),
        0,
      );
      return next;
    });
  };

  const displayLikes = (post) => post.likes + (likedIds.has(post.id) ? 1 : 0);

  const bumpReply = (postId) => {
    setReplyExtra((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
    toast('Opening thread (demo). Connect POST /api/community/replies to save.', 'success');
  };

  const sharePost = (title) => {
    const text = `${title} — via MomBuddy`;
    if (navigator.share) {
      navigator.share({ title: 'MomBuddy', text }).catch(() => toast('Link copied to clipboard.', 'success'));
    } else {
      navigator.clipboard?.writeText(text).then(() => toast('Copied to clipboard.', 'success')).catch(() => toast(text, 'info'));
    }
  };

  const handleJoinGroup = async (group) => {
    if (joinedGroups.has(group.id)) return;
    await joinCommunityGroup(group.id);
    setJoinedGroups((prev) => new Set(prev).add(group.id));
    toast(`You're in "${group.name}" (demo). Wire POST /api/community/groups/:id/join for production.`, 'success');
  };

  const handleJoinEvent = async (event) => {
    if (joinedEvents.has(event.id)) return;
    await joinCommunityEvent(event.id);
    setJoinedEvents((prev) => new Set(prev).add(event.id));
    toast(`Registered for "${event.title}" (demo).`, 'success');
  };

  const handleJoinChallenge = async (challenge) => {
    if (joinedChallenges.has(challenge.id)) return;
    await joinCommunityChallenge(challenge.id);
    setJoinedChallenges((prev) => new Set(prev).add(challenge.id));
    toast(`Joined "${challenge.title}" (demo).`, 'success');
  };

  const handleConnect = async (user, idx) => {
    if (connectedIds.has(idx)) return;
    await connectSimilarUser(`similar-${idx}`);
    setConnectedIds((prev) => new Set(prev).add(idx));
    toast(`Connection request sent to ${user.name} (demo).`, 'success');
  };

  const feedTone = (engagement) => {
    if (engagement === 'viral') return 'bg-[#f9efe7] text-[#9f6e3b] dark:bg-[#3c2918] dark:text-[#f2d2a6]';
    if (engagement === 'high') return 'bg-[#f7e7ee] text-[#9f5874] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]';
    return 'bg-[var(--care-surface-muted)] text-[var(--care-text-muted)]';
  };

  const eventTone = (type) => {
    if (type === 'expert') return 'bg-[#f7e7ee] text-[#9f5874] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]';
    if (type === 'wellness') return 'bg-[#edf5ef] text-[#4b7561] dark:bg-[#163226] dark:text-[#b8d8c8]';
    return 'bg-[#f4edf9] text-[#7d5e8c] dark:bg-[#2d2037] dark:text-[#d8c5e6]';
  };

  return (
    <div className="page-shell max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.4rem] border border-[var(--care-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,242,236,0.92))] p-6 shadow-[var(--care-shadow)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] sm:p-8"
        >
          <div className="pointer-events-none absolute -right-16 top-0 h-52 w-52 rounded-full bg-[color:var(--care-lavender)]/20 blur-3xl" />
          <div className="pointer-events-none absolute -left-12 bottom-0 h-44 w-44 rounded-full bg-[color:var(--care-primary)]/20 blur-3xl" />
          <div className="relative grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-start">
            <div>
              <div className="theme-badge inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                <Users className="h-4 w-4" />
                Community
              </div>
              <h1 className="mt-5 bg-gradient-to-r from-[var(--care-primary)] via-[var(--care-primary-strong)] to-[var(--care-lavender)] bg-clip-text text-4xl font-semibold tracking-[-0.05em] text-transparent sm:text-5xl lg:text-6xl">
                A calmer support space for every stage of motherhood
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-body sm:text-lg">
                Personalized discussions, matched groups, and live support in one professional system that still feels warm and easy to trust.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Matched circles', `${communityInsights.recommendedGroups.length} groups`],
                  ['Similar mothers', `${communityInsights.similarUsers.length} profiles`],
                  ['Trending topics', `${communityInsights.trendingTopics.length} live now`],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white/74 p-4 shadow-sm dark:bg-white/10">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--care-text-muted)] dark:text-slate-300">{label}</div>
                    <div className="mt-2 text-lg font-semibold text-[var(--care-text)] dark:text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            <CareOverviewPanel
              title="Community overview"
              summary="Matched groups, thread quality, and live sessions stay grounded in the same weekly context instead of feeling like separate tools."
            />
          </div>
        </motion.section>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d9b2c1,#b27d93)] text-white shadow-sm">
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">Matching models</h2>
                <p className="text-sm text-muted">Professional, stage-aware recommendations</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {Object.entries(aiModels).map(([key, model]) => (
                <div key={key} className="surface-muted rounded-2xl p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9f5874] dark:text-[#dfc4cf]">{key}</div>
                  <div className="mt-1 text-sm text-body">{model}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-surface p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f0c6d6,#c692a7)] text-white shadow-sm">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">Your profile</h2>
                <p className="text-sm text-muted">Clear signals used to shape your feed</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              <div className="surface-muted rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Engagement score</span>
                  <span className="text-lg font-semibold text-[#8e6074] dark:text-[#dfc4cf]">{userBehavior.engagementScore}%</span>
                </div>
              </div>
              <div className="surface-muted rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Activity level</span>
                  <span className="text-sm font-semibold capitalize text-[#4b7561] dark:text-[#b8d8c8]">{userBehavior.activityLevel}</span>
                </div>
              </div>
              <div className="surface-muted rounded-2xl p-4">
                <div className="text-sm text-muted">Preferred topics</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {userBehavior.preferredTopics.map((topic) => (
                    <span key={topic} className="rounded-full bg-[#f7e7ee] px-3 py-1 text-xs font-medium text-[#9f5874] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5d7b2,#d0a06d)] text-white shadow-sm">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">Community signals</h2>
                <p className="text-sm text-muted">What the app is surfacing for you now</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="surface-muted rounded-2xl p-4">
                <div className="text-sm text-muted">Similar mothers found</div>
                <div className="mt-1 text-2xl font-semibold text-[var(--care-text)] dark:text-white">{communityInsights.similarUsers.length}</div>
              </div>
              <div className="surface-muted rounded-2xl p-4">
                <div className="text-sm text-muted">Recommended groups</div>
                <div className="mt-1 text-2xl font-semibold text-[var(--care-text)] dark:text-white">{communityInsights.recommendedGroups.length}</div>
              </div>
              <button
                type="button"
                onClick={() => setShowAnalysisModal(true)}
                className="w-full rounded-2xl bg-[linear-gradient(135deg,#c28aa0,#9f5874)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(159,88,116,0.5)] transition hover:-translate-y-0.5"
              >
                View full analysis
              </button>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 surface-glass p-2">
          <div className="nav-scrollbar flex gap-2 overflow-x-auto">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-[linear-gradient(135deg,#c28aa0,#9f5874)] text-white shadow-md'
                    : 'text-[var(--care-text-muted)] hover:bg-white/60 hover:text-[var(--care-text)] dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.55fr_0.75fr]">
          <div>
            <AnimatePresence mode="wait">
              {activeTab === 'feed' && (
                <motion.div key="feed" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="space-y-5">
                  <div className="surface-glass p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-[var(--care-text)] dark:text-white">Your personalized feed</h2>
                        <p className="mt-2 text-sm text-muted">
                          Based on your interest in {userBehavior.preferredTopics.join(', ')} and how you engage with support content.
                        </p>
                      </div>
                      <div className="rounded-full bg-[#f7e7ee] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9f5874] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]">
                        Powered by {aiModels.content}
                      </div>
                    </div>
                  </div>

                  {communityInsights.personalizedContent.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="card-surface p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--care-surface-muted)] text-2xl shadow-sm">
                            {post.avatar}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-[var(--care-text)] dark:text-white">{post.author}</div>
                            <div className="text-sm text-muted">{post.time}</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${feedTone(post.engagement)}`}>
                            {post.engagement}
                          </span>
                          <span className="rounded-full bg-[var(--care-surface-muted)] px-3 py-1 text-xs font-semibold text-[#8e6074] dark:text-[#dfc4cf]">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <h3 className="mt-5 text-xl font-semibold text-[var(--care-text)] dark:text-white">{post.title}</h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.aiTags.map((tag) => (
                          <span key={tag} className="rounded-full bg-[#f4edf9] px-3 py-1 text-xs font-medium text-[#7d5e8c] dark:bg-[#2d2037] dark:text-[#d8c5e6]">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--care-border)] pt-4">
                        <div className="flex flex-wrap items-center gap-4">
                          <button
                            type="button"
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1 text-sm transition ${
                              likedIds.has(post.id) ? 'text-[#9f5874]' : 'text-muted hover:text-[#9f5874]'
                            }`}
                          >
                            <Heart className={`h-4 w-4 ${likedIds.has(post.id) ? 'fill-current' : ''}`} />
                            {displayLikes(post)}
                          </button>
                          <button type="button" onClick={() => bumpReply(post.id)} className="flex items-center gap-1 text-sm text-muted transition hover:text-[#8e6074]">
                            <MessageSquare className="h-4 w-4" />
                            {post.replies + (replyExtra[post.id] || 0)}
                          </button>
                          <button type="button" onClick={() => sharePost(post.title)} className="flex items-center gap-1 text-sm text-muted transition hover:text-[#4b7561]">
                            <Share2 className="h-4 w-4" />
                            Share
                          </button>
                        </div>
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9f5874] dark:text-[#dfc4cf]">AI match 94%</div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {activeTab === 'discussions' && (
                <motion.div key="discussions" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="space-y-5">
                  <div className="surface-glass p-6">
                    <h2 className="text-2xl font-semibold text-[var(--care-text)] dark:text-white">Open discussions</h2>
                    <p className="mt-2 text-sm text-muted">A cleaner thread list for quick scanning on mobile and desktop.</p>
                  </div>
                  {discussions.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="card-surface p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--care-surface-muted)] text-2xl">{post.avatar}</div>
                          <div>
                            <div className="font-semibold text-[var(--care-text)] dark:text-white">{post.author}</div>
                            <div className="text-sm text-muted">{post.time}</div>
                          </div>
                        </div>
                        <span className="rounded-full bg-[#f7e7ee] px-3 py-1 text-xs font-semibold text-[#9f5874] dark:bg-[#3a1e2c] dark:text-[#dfc4cf]">{post.category}</span>
                      </div>
                      <h3 className="mt-5 text-xl font-semibold text-[var(--care-text)] dark:text-white">{post.title}</h3>
                      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-[var(--care-border)] pt-4">
                        <button type="button" onClick={() => toggleLike(post.id)} className={`flex items-center gap-1 text-sm ${likedIds.has(post.id) ? 'text-[#9f5874]' : 'text-muted hover:text-[#9f5874]'}`}>
                          <Heart className={`h-4 w-4 ${likedIds.has(post.id) ? 'fill-current' : ''}`} />
                          {displayLikes(post)}
                        </button>
                        <button type="button" onClick={() => bumpReply(post.id)} className="flex items-center gap-1 text-sm text-muted hover:text-[#8e6074]">
                          <MessageSquare className="h-4 w-4" />
                          {post.replies + (replyExtra[post.id] || 0)} replies
                        </button>
                        <button type="button" onClick={() => sharePost(post.title)} className="flex items-center gap-1 text-sm text-muted hover:text-[#4b7561]">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {activeTab === 'groups' && (
                <motion.div key="groups" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="grid gap-5 md:grid-cols-2">
                  {groups.map((group, index) => (
                    <motion.article
                      key={group.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="card-surface p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-[var(--care-text)] dark:text-white">{group.name}</h3>
                          <p className="mt-2 text-sm leading-7 text-body">{group.description}</p>
                        </div>
                        <div className="rounded-2xl bg-[#f7e7ee] px-3 py-2 text-right dark:bg-[#3a1e2c]">
                          <div className="text-lg font-semibold text-[#9f5874] dark:text-[#dfc4cf]">{group.aiMatch}%</div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-muted">Match</div>
                        </div>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {group.features.map((feature) => (
                          <span key={feature} className="rounded-full bg-[var(--care-surface-muted)] px-3 py-1 text-xs font-medium text-[var(--care-text-muted)]">
                            {feature}
                          </span>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between text-sm text-muted">
                        <span>{group.members.toLocaleString()} members</span>
                        <span className="capitalize">{group.activity.replace('-', ' ')} activity</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJoinGroup(group)}
                        disabled={joinedGroups.has(group.id)}
                        className="mt-5 w-full rounded-2xl bg-[linear-gradient(135deg,#c28aa0,#9f5874)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(159,88,116,0.5)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {joinedGroups.has(group.id) ? 'Joined' : 'Join group'}
                      </button>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {activeTab === 'events' && (
                <motion.div key="events" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="grid gap-5 md:grid-cols-2">
                  {liveEvents.map((event, index) => (
                    <motion.article
                      key={event.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="card-surface p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-semibold text-[var(--care-text)] dark:text-white">{event.title}</h3>
                            {event.aiRecommended && (
                              <span className="rounded-full bg-[#edf5ef] px-3 py-1 text-xs font-semibold text-[#4b7561] dark:bg-[#163226] dark:text-[#b8d8c8]">
                                AI recommended
                              </span>
                            )}
                          </div>
                          <div className="mt-4 space-y-2 text-sm text-muted">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {event.attendees} attending
                            </div>
                          </div>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${eventTone(event.type)}`}>{event.type}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJoinEvent(event)}
                        disabled={joinedEvents.has(event.id)}
                        className="mt-6 w-full rounded-2xl bg-[linear-gradient(135deg,#a7c9b8,#4b7561)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(75,117,97,0.5)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {joinedEvents.has(event.id) ? 'Registered' : 'Join event'}
                      </button>
                    </motion.article>
                  ))}
                </motion.div>
              )}

              {activeTab === 'challenges' && (
                <motion.div key="challenges" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="grid gap-5 md:grid-cols-2">
                  {challenges.map((challenge, index) => (
                    <motion.article
                      key={challenge.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="card-surface p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-semibold text-[var(--care-text)] dark:text-white">{challenge.title}</h3>
                            {challenge.aiPersonalized && (
                              <span className="rounded-full bg-[#f9efe7] px-3 py-1 text-xs font-semibold text-[#9f6e3b] dark:bg-[#3c2918] dark:text-[#f2d2a6]">
                                AI personalized
                              </span>
                            )}
                          </div>
                          <div className="mt-3 text-sm text-muted">{challenge.participants} participants</div>
                          <div className="mt-1 text-sm font-medium text-[#9f6e3b] dark:text-[#f2d2a6]">{challenge.reward}</div>
                        </div>
                        <div className="rounded-2xl bg-[#f9efe7] px-3 py-2 text-right dark:bg-[#3c2918]">
                          <div className="text-lg font-semibold text-[#9f6e3b] dark:text-[#f2d2a6]">{challenge.progress}%</div>
                          <div className="text-[11px] uppercase tracking-[0.18em] text-muted">Progress</div>
                        </div>
                      </div>
                      <div className="mt-5 h-2.5 rounded-full bg-[var(--care-surface-muted)]">
                        <div className="h-2.5 rounded-full bg-[linear-gradient(90deg,#d9b2c1,#c28aa0,#d0a06d)]" style={{ width: `${challenge.progress}%` }} />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleJoinChallenge(challenge)}
                        disabled={joinedChallenges.has(challenge.id)}
                        className="mt-6 w-full rounded-2xl bg-[linear-gradient(135deg,#d0a06d,#9f6e3b)] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(159,110,59,0.5)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {joinedChallenges.has(challenge.id) ? 'Participating' : 'Join challenge'}
                      </button>
                    </motion.article>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-5">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card-surface p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d9b2c1,#b27d93)] text-white">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">Similar mothers</h3>
                  <p className="text-sm text-muted">High-confidence stage matches</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {communityInsights.similarUsers.map((user, index) => (
                  <div key={index} className="surface-muted rounded-2xl p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-[var(--care-text)] dark:text-white">{user.name}</div>
                        <div className="text-sm text-muted">Week {user.week} • {user.similarity}% match</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleConnect(user, index)}
                        disabled={connectedIds.has(index)}
                        className="rounded-full bg-[linear-gradient(135deg,#c28aa0,#9f5874)] px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {connectedIds.has(index) ? 'Sent' : 'Connect'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }} className="card-surface p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f5d7b2,#d0a06d)] text-white">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--care-text)] dark:text-white">Trending topics</h3>
                  <p className="text-sm text-muted">Topics people in your stage are opening most</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {communityInsights.trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => toast(`Topic #${topic} — filter will use GET /api/community/topics when live.`, 'info')}
                    className="rounded-full bg-[#f9efe7] px-3 py-2 text-xs font-medium text-[#9f6e3b] transition hover:-translate-y-0.5 dark:bg-[#3c2918] dark:text-[#f2d2a6]"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAnalysisModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm"
            onClick={() => setShowAnalysisModal(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="card-surface w-full max-w-lg p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-[var(--care-text)] dark:text-white">Full AI analysis</h3>
                  <p className="mt-2 text-sm text-muted">Mock output for the production community insights panel.</p>
                </div>
                <button type="button" onClick={() => setShowAnalysisModal(false)} className="rounded-xl p-2 text-muted transition hover:bg-[var(--care-surface-muted)] hover:text-[var(--care-text)]" aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-body">
                <li>Engagement aligns with high-trust support behavior and reflective question patterns.</li>
                <li>Recommended focus this week: nutrition, symptom reassurance, and appointment prep content.</li>
                <li>Peer match confidence averages 91% for your current stage cohort.</li>
              </ul>
              <p className="mt-5 text-xs text-muted">Replace this modal with `GET /api/community/insights` when the backend is ready.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
