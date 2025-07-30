import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, MessageSquare, Heart, Calendar, Video, Mic, Camera, Share2, Trophy, Star, Zap, Brain, Target } from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [userBehavior, setUserBehavior] = useState({
    engagementScore: 85,
    interactionPattern: 'supportive',
    preferredTopics: ['nutrition', 'symptoms', 'exercise'],
    activityLevel: 'high'
  });

  const aiModels = {
    community: 'SocialAI-Community-Moderator-v2.3',
    behavior: 'BehaviorAnalytics-Pregnancy-v1.9',
    content: 'ContentCuration-Maternal-v3.1',
    matching: 'PeerMatching-Algorithm-v2.7',
    wellness: 'WellnessTracker-Social-v1.5'
  };

  const [communityInsights, setCommunityInsights] = useState({
    similarUsers: [],
    recommendedGroups: [],
    trendingTopics: [],
    personalizedContent: []
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
      aiTags: ['medical', 'milestone', 'anxiety-support']
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
      aiTags: ['nutrition', 'diy', 'wellness']
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
      aiTags: ['support', 'relationships', 'first-trimester']
    }
  ];

  const liveEvents = [
    { 
      id: 1,
      title: 'Live Q&A with Dr. Martinez - Prenatal Nutrition',
      time: 'Today 7:00 PM EST',
      attendees: 234,
      type: 'expert',
      category: 'nutrition',
      aiRecommended: true
    },
    { 
      id: 2,
      title: 'Virtual Prenatal Yoga Session',
      time: 'Tomorrow 6:00 AM EST',
      attendees: 89,
      type: 'wellness',
      category: 'exercise',
      aiRecommended: true
    },
    { 
      id: 3,
      title: 'Birth Story Sharing Circle',
      time: 'Friday 8:00 PM EST',
      attendees: 156,
      type: 'support',
      category: 'birth',
      aiRecommended: false
    }
  ];

  const groups = [
    { 
      id: 1,
      name: 'AI-Optimized First Time Moms', 
      members: 1250, 
      description: 'Data-driven pregnancy journey for first-time mothers',
      category: 'stage-based',
      aiMatch: 95,
      activity: 'very-high',
      features: ['AI insights', 'Personalized content', 'Expert AMAs']
    },
    { 
      id: 2,
      name: 'Biohacking Pregnancy', 
      members: 890, 
      description: 'Optimize your pregnancy with science-backed methods',
      category: 'lifestyle',
      aiMatch: 88,
      activity: 'high',
      features: ['Wearable integration', 'Lab result sharing', 'Protocol optimization']
    },
    { 
      id: 3,
      name: 'PCOS & Pregnancy Success', 
      members: 650, 
      description: 'Support for mothers with PCOS navigating pregnancy',
      category: 'condition-specific',
      aiMatch: 76,
      activity: 'moderate',
      features: ['Medical guidance', 'Success stories', 'Treatment protocols']
    }
  ];

  const challenges = [
    {
      id: 1,
      title: '30-Day Prenatal Wellness Challenge',
      participants: 1200,
      progress: 65,
      reward: 'Wellness Badge + Premium Features',
      category: 'wellness',
      aiPersonalized: true
    },
    {
      id: 2,
      title: 'Mindful Pregnancy Journey',
      participants: 800,
      progress: 40,
      reward: 'Meditation Master Badge',
      category: 'mental-health',
      aiPersonalized: true
    }
  ];

  const generatePersonalizedFeed = () => {
    // AI-powered content curation based on user behavior
    return discussions.filter(discussion => 
      userBehavior.preferredTopics.some(topic => 
        discussion.aiTags.includes(topic) || 
        discussion.category.toLowerCase().includes(topic)
      )
    );
  };

  const generateAIInsights = () => {
    setCommunityInsights({
      similarUsers: [
        { name: 'Jennifer L.', similarity: 94, commonInterests: ['nutrition', 'exercise'], week: 22 },
        { name: 'Maria S.', similarity: 89, commonInterests: ['symptoms', 'wellness'], week: 20 },
        { name: 'Ashley T.', similarity: 87, commonInterests: ['first-time', 'anxiety'], week: 24 }
      ],
      recommendedGroups: groups.filter(group => group.aiMatch > 85),
      trendingTopics: ['prenatal-yoga', 'gestational-diabetes', 'baby-movement', 'third-trimester-prep'],
      personalizedContent: generatePersonalizedFeed()
    });
  };

  useEffect(() => {
    generateAIInsights();
  }, [userBehavior]);

  return (
    <div className="min-h-screen py-20 px-6 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI-Powered Community
          </h1>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Connect with like-minded mothers through intelligent matching, personalized content, and AI-driven insights.
          </p>
        </motion.div>

        {/* AI Models & User Insights */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700"
          >
            <div className="flex items-center mb-4">
              <Brain className="w-6 h-6 text-blue-400 mr-2" />
              <h3 className="text-lg font-bold text-white">AI Models</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(aiModels).map(([key, model]) => (
                <div key={key} className="text-xs">
                  <div className="text-blue-400 font-semibold uppercase">{key}</div>
                  <div className="text-gray-400 font-mono">{model}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-800/50 to-purple-900/50 backdrop-blur-xl rounded-3xl p-6 border border-purple-700"
          >
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-purple-400 mr-2" />
              <h3 className="text-lg font-bold text-white">Your Profile</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Engagement Score</span>
                <span className="text-purple-400 font-bold">{userBehavior.engagementScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Activity Level</span>
                <span className="text-green-400 font-bold capitalize">{userBehavior.activityLevel}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Preferred Topics</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {userBehavior.preferredTopics.map(topic => (
                    <span key={topic} className="bg-purple-900/50 text-purple-300 px-2 py-1 rounded text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-pink-800/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-6 border border-pink-700"
          >
            <div className="flex items-center mb-4">
              <Zap className="w-6 h-6 text-pink-400 mr-2" />
              <h3 className="text-lg font-bold text-white">AI Insights</h3>
            </div>
            <div className="space-y-2">
              <div className="text-sm text-gray-300">Similar Users Found: {communityInsights.similarUsers.length}</div>
              <div className="text-sm text-gray-300">Recommended Groups: {communityInsights.recommendedGroups.length}</div>
              <div className="text-sm text-gray-300">Trending Topics: {communityInsights.trendingTopics.length}</div>
              <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-2 rounded-lg text-sm hover:shadow-lg transition-all">
                View Full Analysis
              </button>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-2 border border-gray-700">
            {[
              { id: 'feed', label: 'AI Feed', icon: Brain },
              { id: 'discussions', label: 'Discussions', icon: MessageSquare },
              { id: 'groups', label: 'Smart Groups', icon: Users },
              { id: 'events', label: 'Live Events', icon: Video },
              { id: 'challenges', label: 'Challenges', icon: Trophy }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl transition-all flex items-center ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* AI-Personalized Feed */}
              {activeTab === 'feed' && (
                <motion.div
                  key="feed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-blue-800/50 to-purple-800/50 backdrop-blur-xl rounded-3xl p-6 border border-blue-700">
                    <div className="flex items-center mb-4">
                      <Brain className="w-6 h-6 text-blue-400 mr-2" />
                      <h2 className="text-2xl font-bold text-white">Personalized for You</h2>
                      <div className="ml-auto text-xs text-blue-400">Powered by {aiModels.content}</div>
                    </div>
                    <div className="text-sm text-gray-300 mb-4">
                      Based on your interests in {userBehavior.preferredTopics.join(', ')} and engagement patterns
                    </div>
                  </div>

                  {communityInsights.personalizedContent.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">{post.avatar}</div>
                          <div>
                            <div className="font-semibold text-white">{post.author}</div>
                            <div className="text-sm text-gray-400">{post.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            post.engagement === 'viral' ? 'bg-red-900/50 text-red-400' :
                            post.engagement === 'high' ? 'bg-orange-900/50 text-orange-400' :
                            'bg-gray-900/50 text-gray-400'
                          }`}>
                            {post.engagement}
                          </span>
                          <span className="bg-blue-900/50 text-blue-400 px-2 py-1 rounded text-xs">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-white mb-3">{post.title}</h3>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.aiTags.map(tag => (
                          <span key={tag} className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button className="flex items-center text-gray-400 hover:text-red-400 transition-colors">
                            <Heart className="w-4 h-4 mr-1" />
                            <span className="text-sm">{post.likes}</span>
                          </button>
                          <button className="flex items-center text-gray-400 hover:text-blue-400 transition-colors">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            <span className="text-sm">{post.replies}</span>
                          </button>
                          <button className="flex items-center text-gray-400 hover:text-green-400 transition-colors">
                            <Share2 className="w-4 h-4 mr-1" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>
                        <div className="text-xs text-blue-400">AI Match: 94%</div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Smart Groups */}
              {activeTab === 'groups' && (
                <motion.div
                  key="groups"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-xl rounded-3xl p-6 border border-purple-700">
                    <div className="flex items-center mb-4">
                      <Users className="w-6 h-6 text-purple-400 mr-2" />
                      <h2 className="text-2xl font-bold text-white">AI-Matched Groups</h2>
                      <div className="ml-auto text-xs text-purple-400">Powered by {aiModels.matching}</div>
                    </div>
                  </div>

                  {groups.map((group, index) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{group.name}</h3>
                          <p className="text-gray-400 mb-3">{group.description}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{group.members.toLocaleString()} members</span>
                            <span className="mx-2">•</span>
                            <span className="capitalize">{group.activity.replace('-', ' ')} activity</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-400">{group.aiMatch}%</div>
                          <div className="text-xs text-purple-300">AI Match</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {group.features.map(feature => (
                          <span key={feature} className="bg-purple-900/30 text-purple-400 px-2 py-1 rounded text-xs">
                            {feature}
                          </span>
                        ))}
                      </div>

                      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all">
                        Join Group
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Live Events */}
              {activeTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-green-800/50 to-teal-800/50 backdrop-blur-xl rounded-3xl p-6 border border-green-700">
                    <div className="flex items-center mb-4">
                      <Video className="w-6 h-6 text-green-400 mr-2" />
                      <h2 className="text-2xl font-bold text-white">Live & Upcoming Events</h2>
                    </div>
                  </div>

                  {liveEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border transition-all ${
                        event.aiRecommended ? 'border-green-500/50' : 'border-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                            {event.aiRecommended && (
                              <span className="ml-2 bg-green-900/50 text-green-400 px-2 py-1 rounded text-xs">
                                AI Recommended
                              </span>
                            )}
                          </div>
                          <div className="flex items-center text-gray-400 mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{event.attendees} attending</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          event.type === 'expert' ? 'bg-blue-900/50 text-blue-400' :
                          event.type === 'wellness' ? 'bg-green-900/50 text-green-400' :
                          'bg-purple-900/50 text-purple-400'
                        }`}>
                          {event.type}
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl hover:shadow-lg transition-all">
                        Join Event
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Challenges */}
              {activeTab === 'challenges' && (
                <motion.div
                  key="challenges"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-r from-orange-800/50 to-red-800/50 backdrop-blur-xl rounded-3xl p-6 border border-orange-700">
                    <div className="flex items-center mb-4">
                      <Trophy className="w-6 h-6 text-orange-400 mr-2" />
                      <h2 className="text-2xl font-bold text-white">Personalized Challenges</h2>
                    </div>
                  </div>

                  {challenges.map((challenge, index) => (
                    <motion.div
                      key={challenge.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                            {challenge.aiPersonalized && (
                              <span className="ml-2 bg-orange-900/50 text-orange-400 px-2 py-1 rounded text-xs">
                                AI Personalized
                              </span>
                            )}
                          </div>
                          <div className="text-gray-400 mb-2">{challenge.participants} participants</div>
                          <div className="text-sm text-orange-400">{challenge.reward}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-400">{challenge.progress}%</div>
                          <div className="text-xs text-orange-300">Complete</div>
                        </div>
                      </div>

                      <div className="bg-gray-700 rounded-full h-2 mb-4">
                        <div 
                          className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full transition-all"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 rounded-xl hover:shadow-lg transition-all">
                        Join Challenge
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Similar Users */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Similar Users</h3>
              </div>
              <div className="space-y-3">
                {communityInsights.similarUsers.map((user, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-xl">
                    <div>
                      <div className="font-semibold text-white text-sm">{user.name}</div>
                      <div className="text-xs text-gray-400">Week {user.week} • {user.similarity}% match</div>
                    </div>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-700"
            >
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-yellow-400 mr-2" />
                <h3 className="text-lg font-bold text-white">Trending Topics</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {communityInsights.trendingTopics.map((topic, index) => (
                  <span key={index} className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded text-xs hover:bg-yellow-900/50 cursor-pointer transition-colors">
                    #{topic}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;