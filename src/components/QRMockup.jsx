import qr from '../../public/assets/img/qree-qrcode.png'

export default function QRMockup({ compact = false }) {
  return (
    <div className={compact ? 'qr-card compact' : 'qr-card'}>
      {!compact && <p className="qr-label">QR quyên góp mô phỏng</p>}
      <div className="qr-grid" aria-label="Mã QR mô phỏng">
        <img src={qr} alt="qr-code" style={{ width: '100%', height: '100%' }} />
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
