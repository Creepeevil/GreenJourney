const size = 21

function isFinder(row, col, top, left) {
  return row >= top && row < top + 7 && col >= left && col < left + 7
}

function finderCell(row, col, top, left) {
  const r = row - top
  const c = col - left
  if (r === 0 || r === 6 || c === 0 || c === 6) return true
  if (r >= 2 && r <= 4 && c >= 2 && c <= 4) return true
  return false
}

function buildCells() {
  const cells = []
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      let filled = false
      const finders = [
        [0, 0],
        [0, 14],
        [14, 0],
      ]
      const inFinder = finders.find(([top, left]) => isFinder(row, col, top, left))
      if (inFinder) filled = finderCell(row, col, inFinder[0], inFinder[1])
      else filled = ((row * 7 + col * 11 + row * col) % 5 === 0) || ((row + col) % 7 === 0)
      cells.push(filled)
    }
  }
  return cells
}

export default function QRMockup({ compact = false }) {
  const cells = buildCells()
  return (
    <div className={compact ? 'qr-card compact' : 'qr-card'}>
      {!compact && <p className="qr-label">QR quyên góp mô phỏng</p>}
      <div className="qr-grid" aria-label="Mã QR mô phỏng">
        {cells.map((filled, index) => <i key={index} className={filled ? 'filled' : ''} />)}
        <b className="qr-logo">📖</b>
      </div>
      {!compact && (
        <div className="qr-info">
          <strong>Dự án Tái sinh trang giấy</strong>
          <span>ACB - Á Châu</span>
          <code>1234 5678 9999</code>
          <small>QR mô phỏng, không thực hiện giao dịch thật.</small>
        </div>
      )}
    </div>
  )
}
