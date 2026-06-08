export default function StoryCard({ story, onToggleSave }) {
  return (
    <article className="story-card">
      <div className="story-image-wrap">
        <img src={story.image} alt={`Câu chuyện của ${story.name}`} />
        <button
          className={story.saved ? 'save-btn saved' : 'save-btn'}
          onClick={() => onToggleSave(story.id)}
          aria-label={story.saved ? 'Bỏ lưu' : 'Lưu cảm hứng'}
        >
          {story.saved ? '♥' : '♡'}
        </button>
        <span className="story-category-chip">{story.category}</span>
      </div>
      <div className="story-body">
        <div className="story-meta">
          <strong>{story.name}</strong>
          <span>{story.time}</span>
        </div>
        <p>{story.message}</p>
        <div className="story-hashtags">{story.hashtags}</div>
        <div className="story-footer">
          <span>{story.likes + (story.saved ? 1 : 0)} cảm hứng</span>
        </div>
      </div>
    </article>
  )
}
