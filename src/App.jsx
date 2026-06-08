import { useMemo, useState } from 'react'
import AuthPage from './components/AuthPage.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ProjectIntro from './components/ProjectIntro.jsx'
import DonationPage from './components/DonationPage.jsx'
import CommunityStories from './components/CommunityStories.jsx'
import EducationResources from './components/EducationResources.jsx'
import ProfilePage from './components/ProfilePage.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'

const defaultProfile = {
  name: 'Lan Anh',
  email: 'lananh.demo@gmail.com',
  avatar: '/assets/img/plant-in-hands.jpg',
  phone: '0900 000 000',
  city: 'Đà Nẵng',
  bio: 'Tôi muốn góp những trang giấy cũ thành tri thức xanh cho các bạn nhỏ.',
}

function WelcomeOverlay({ user }) {
  return (
    <div className="welcome-overlay">
      <div className="welcome-card">
        <div className="leaf-loader"><span /><span /><span /></div>
        <h2>Xin chào, {user?.name || 'bạn'} 🌿</h2>
        <p>Chào mừng bạn đến với hành trình tái sinh những trang giấy</p>
      </div>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useLocalStorage('tsg_user', null)
  const [profile, setProfile] = useLocalStorage('tsg_profile', defaultProfile)
  const [activeTab, setActiveTab] = useState('project')
  const [showWelcome, setShowWelcome] = useState(false)

  const appUser = useMemo(() => user ? { ...profile, ...user } : null, [profile, user])

  const handleLogin = (loginUser) => {
    const nextUser = {
      name: loginUser.name || defaultProfile.name,
      email: loginUser.email || defaultProfile.email,
      loginType: loginUser.loginType || 'gmail-demo',
      createdAt: new Date().toISOString(),
    }
    setUser(nextUser)
    setProfile((prev) => ({ ...prev, name: nextUser.name, email: nextUser.email }))
    setShowWelcome(true)
    window.setTimeout(() => setShowWelcome(false), 1800)
  }

  const handleLogout = () => {
    setUser(null)
    setActiveTab('project')
  }

  if (!user) {
    return <AuthPage onLogin={handleLogin} />
  }

  return (
    <div className="app-shell">
      {showWelcome && <WelcomeOverlay user={appUser} />}
      <Header activeTab={activeTab} onChangeTab={setActiveTab} user={appUser} onLogout={handleLogout} />
      <main className="page-container">
        {activeTab === 'project'    && <ProjectIntro onChangeTab={setActiveTab} />}
        {activeTab === 'donation'   && <DonationPage user={appUser} />}
        {activeTab === 'community'  && <CommunityStories user={appUser} />}
        {activeTab === 'education'  && <EducationResources />}
        {activeTab === 'profile'    && (
          <ProfilePage
            profile={profile}
            setProfile={setProfile}
            user={appUser}
            onLogout={handleLogout}
            onChangeTab={setActiveTab}
          />
        )}
      </main>
      <Footer onChangeTab={setActiveTab} />
    </div>
  )
}
