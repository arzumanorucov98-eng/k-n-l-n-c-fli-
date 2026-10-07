'use client';

export default function DeleteButton() {
  return (
    <button 
      type="submit" 
      className="btn btn-secondary btn-sm" 
      style={{ padding: 'var(--space-2) var(--space-3)', color: 'var(--color-danger)' }} 
      onClick={(e) => {
        if (!confirm('Silmək istədiyinizə əminsiniz?')) e.preventDefault();
      }}
    >
      Sil
    </button>
  );
}
