import { useMemo, useState } from 'react'
import { initialStories } from '../data/mockData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import StoryCard from './StoryCard.jsx'

const categories = ['Tất cả', 'Bảo vệ rừng', 'Vệ sinh kinh nguyệt', 'Workshop', 'Trao tặng']

export default function CommunityStories({ user }) {
  const [stories, setStories] = useLocalStorage('tsg_stories', initialStories)
  const [category, setCategory] = useState('Tất cả')
  const [form, setForm] = useState({
    message: '',
    hashtags: '#TaiSinhTrangGiay #SongXanh',
    category: 'Workshop',
    image: '',
  })

  const filteredStories = useMemo(() => {
    if (category === 'Tất cả') return stories
    return stories.filter((story) => story.category === category)
  }, [category, stories])

  const toggleSave = (id) => {
    setStories(stories.map((story) => story.id === id ? { ...story, saved: !story.saved } : story))
  }

  const handleImage = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }))
    reader.readAsDataURL(file)
  }

  const submitStory = (event) => {
    event.preventDefault()
    if (!form.message.trim()) return
    const nextStory = {
      id: `story-${Date.now()}`,
      name: user?.name || 'Người gieo mầm xanh',
      time: 'Vừa xong',
      category: form.category,
      message: form.message.trim(),
      hashtags: form.hashtags.trim() || '#TaiSinhTrangGiay',
      image: form.image || '/assets/img/plant-in-hands.jpg',
      likes: 0,
      saved: false,
    }
    setStories([nextStory, ...stories])
    setForm({ message: '', hashtags: '#TaiSinhTrangGiay #SongXanh', category: 'Workshop', image: '' })
  }

  return (
    <div className="community-page page-fade">

      <section className="page-hero">
        <div>
          <h1>Cộng đồng kể chuyện xanh</h1>
          <p>
            Chia sẻ khoảnh khắc của bạn với quyển vở tái chế và một thông điệp tích cực.
            Người khác có thể xem và lưu cảm hứng. Mạng xã hội mini — không bình luận, chỉ cảm hứng.
          </p>
        </div>
        <img src="/assets/img/robot-earth.jpg" alt="Hành tinh xanh" />
      </section>

      {/* Story composer */}
      <section className="section-block story-composer">
        <h2 style={{ margin: '0 0 18px', fontStyle: 'italic', color: 'var(--green-950)' }}>
          Chia sẻ một khoảnh khắc
        </h2>
        <form className="eco-form compact-form" onSubmit={submitStory}>
          <label>
            Thông điệp của bạn
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Viết một thông điệp ngắn về hành trình xanh của bạn..."
            />
          </label>
          <div className="field-grid three">
            <label>
              Chủ đề
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {categories.filter((c) => c !== 'Tất cả').map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label>
              Hashtag
              <input value={form.hashtags} onChange={(e) => setForm({ ...form, hashtags: e.target.value })} />
            </label>
            <label>
              Ảnh
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>
          </div>
          {form.image && <img className="preview-image" src={form.image} alt="Ảnh xem trước" />}
          <button className="primary-btn" type="submit">💚 Đăng câu chuyện</button>
        </form>
      </section>

      {/* Filter + Grid */}
      <section className="section-block">
        <div className="filter-row">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? 'filter-chip active' : 'filter-chip'}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="stories-grid">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} onToggleSave={toggleSave} />
          ))}
        </div>
      </section>
    </div>
  )
}
