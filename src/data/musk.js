import avatarImg from '../assets/avatar.jpg'
import backgroundImg from '../assets/background.jpg'

export const muskProfile = {
  name: 'Elon Musk',
  handle: '@elonmusk',
  avatar: avatarImg,
  cover: backgroundImg,
  joined: 'Joined June 2009',
  following: '1,216',
  followers: '226.7M',
  bio: '',
  website: 'votetesla.com',
  posts: '86.4K posts',
  followedBy: 'Followed by WaveSpeedAI, Kimi.ai, and 134 others you follow',
}

export const initialTweets = [
  { 
    id: 1, 
    text: 'Occupy Mars 🚀', 
    likes: 1200, 
    liked: false, 
    time: '2h', 
    category: 'Posts',
    commentCount: 5,
    comments: [
      {
        id: 101,
        author: 'Gwynne Shotwell',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop',
        text: 'The SpaceX team is making incredible progress on this! Mars is closer than ever.',
        time: '1h',
        likes: 89,
        isVerified: true
      },
      {
        id: 102,
        author: 'SpaceEnthusiast',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        text: 'When do you think we\'ll see the first human colony on Mars?',
        time: '1h',
        likes: 23,
        isVerified: false
      },
      {
        id: 103,
        author: 'Tom Mueller',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        text: 'The Raptor engines are performing beautifully. Mars, here we come! 🔥',
        time: '45m',
        likes: 67,
        isVerified: true
      },
      {
        id: 104,
        author: 'AerospaceEngineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        text: 'The engineering challenges are massive, but that\'s what makes it exciting!',
        time: '30m',
        likes: 34,
        isVerified: false
      },
      {
        id: 105,
        author: 'Tim Dodd',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
        text: 'Can\'t wait to cover the first Mars landing for Everyday Astronaut! 📹',
        time: '25m',
        likes: 45,
        isVerified: true
      }
    ]
  },
  { 
    id: 2, 
    text: 'Engineering is magic made real.', 
    likes: 860, 
    liked: false, 
    time: '4h', 
    category: 'Posts',
    commentCount: 5,
    comments: [
      {
        id: 201,
        author: 'JB Straubel',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        text: 'Couldn\'t agree more! Tesla\'s battery tech feels like pure wizardry sometimes. ⚡',
        time: '3h',
        likes: 78,
        isVerified: true
      },
      {
        id: 202,
        author: 'CodeWizard',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
        text: 'This is why I love being an engineer. Every day feels like casting spells! ⚡',
        time: '3h',
        likes: 45,
        isVerified: false
      },
      {
        id: 203,
        author: 'Drew Baglino',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        text: 'The 4680 cells are indeed magical! The physics is beautiful.',
        time: '2h',
        likes: 56,
        isVerified: true
      },
      {
        id: 204,
        author: 'InnovationLab',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
        text: 'Absolutely! The line between science fiction and reality keeps getting blurrier.',
        time: '2h',
        likes: 28,
        isVerified: true
      },
      {
        id: 205,
        author: 'Grimes',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop',
        text: 'You\'re literally building the future! So proud of everything you\'re creating 💫',
        time: '1h',
        likes: 234,
        isVerified: true
      }
    ]
  },
  { 
    id: 3, 
    text: 'Replying to @sama',
    replyText: 'OpenAI has made remarkable progress, but true AGI requires more than just scaling existing models. We need fundamental breakthroughs in reasoning and understanding. 🤖',
    likes: 4200, 
    liked: false, 
    time: '12h', 
    category: 'Replies',
    commentCount: 3,
    quotedTweet: {
      author: 'Sam Altman',
      handle: '@sama',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
      text: 'We are getting closer to AGI than most people realize. The next few years will be transformative.',
      time: 'Sep 25',
      isVerified: true
    },
    comments: [
      {
        id: 301,
        author: 'AIResearcher',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop',
        text: 'The competition between xAI and OpenAI is driving incredible innovation!',
        time: '10h',
        likes: 156,
        isVerified: true
      },
      {
        id: 302,
        author: 'TechCritic',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
        text: 'Both companies are overpromising. True AGI is still decades away.',
        time: '8h',
        likes: 89,
        isVerified: false
      },
      {
        id: 303,
        author: 'FutureBuilder',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        text: 'The race to AGI will define the next decade. Exciting times ahead! 🚀',
        time: '6h',
        likes: 234,
        isVerified: false
      }
    ]
  },
  {
    id: 5,
    text: 'Replying to @Teslaconomics and @SawyerMerritt',
    replyText: 'Making life multiplanetary is expensive, but it is necessary for the long-term survival of consciousness',
    likes: 2300,
    liked: false,
    time: 'Sep 20',
    category: 'Highlights',
    commentCount: 1,
    comments: [
      {
        id: 501,
        author: 'PhilosophyOfSpace',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop',
        text: 'The philosophical implications of this are profound. We are the universe becoming aware of itself.',
        time: 'Sep 20',
        likes: 89,
        isVerified: false
      }
    ]
  },
  {
    id: 6,
    text: 'Replying to @EricRWeinstein @Tesla and 4 others',
    replyText: 'Consciousness must expand from Earth or face certain extinction in a short amount of time by cosmic standards',
    likes: 5000,
    liked: false,
    time: 'Sep 19',
    category: 'Highlights',
    commentCount: 1,
    comments: [
      {
        id: 601,
        author: 'CosmicPerspective',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100&auto=format&fit=crop',
        text: 'The Great Filter theory suggests most civilizations don\'t make it to become spacefaring. We must be different.',
        time: 'Sep 19',
        likes: 156,
        isVerified: true
      }
    ]
  },
  {
    id: 7,
    text: 'Replying to @SemiAnalysis_ and @BrentM_SpaceX',
    replyText: '😉\n\nStill small fry at 1GW.\n\nFor serious power in the 100GW continuous range (~1/5 of USA average power consumption), it probably needs to be solar/battery powered.\n\nAt 1TW+, solar/battery is the only realistic option.',
    likes: 4900,
    liked: false,
    time: 'Sep 18',
    category: 'Highlights',
    commentCount: 1,
    comments: [
      {
        id: 701,
        author: 'EnergyExpert',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        text: 'The scale of energy infrastructure needed for civilization is mind-boggling. Solar is indeed the only path forward.',
        time: 'Sep 18',
        likes: 234,
        isVerified: true
      }
    ]
  }
]

// 媒体图片数据
export const mediaImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&auto=format&fit=crop', type: 'gif' },
  { id: 2, url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop', type: 'image' },
  { id: 3, url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=400&auto=format&fit=crop', type: 'meme' },
  { id: 4, url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=400&auto=format&fit=crop', type: 'image' },
  { id: 5, url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=400&auto=format&fit=crop', type: 'image' },
  { id: 6, url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop', type: 'video' },
  { id: 7, url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=400&auto=format&fit=crop', type: 'image' },
  { id: 8, url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&auto=format&fit=crop', type: 'image' },
  { id: 9, url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400&auto=format&fit=crop', type: 'image' },
  { id: 10, url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=400&auto=format&fit=crop', type: 'chart' },
  { id: 11, url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=400&auto=format&fit=crop', type: 'image' },
  { id: 12, url: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?q=80&w=400&auto=format&fit=crop', type: 'meme' }
]

