export default function ResourceCard({ resource, onOpen }) {
  return (
    <article className="resource-card">
      <img src={resource.image} alt={resource.title} />
      <div>
        <div className="resource-meta">
          <span>{resource.age}</span>
          <span>{resource.readTime}</span>
        </div>
        <h3>{resource.title}</h3>
        <p>{resource.description}</p>
        <button className="small-primary" onClick={() => onOpen(resource)}>
          Xem tài liệu →
        </button>
      </div>
    </article>
  )
}
