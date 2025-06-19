import { useState, useRef, useEffect } from 'react';

const kategoriList = [
  { value: 'keyboard', label: 'Keyboard' },
  { value: 'mouse', label: 'Mouse' },
  { value: 'headphone', label: 'Headphone' },
  { value: 'speaker', label: 'Speaker' },
  { value: 'monitor', label: 'Monitor' },
];

export default function KategoriDropdown({ selected, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className={`kategori-dropdown${open ? ' open' : ''}`} ref={ref}>
      <button
        className="kategori-dropdown-btn"
        onClick={() => setOpen((o) => !o)}
      >
        {kategoriList.find((k) => k.value === selected)?.label || 'Pilih Kategori'} ▼
      </button>
      <div className="kategori-dropdown-list">
        {kategoriList.map((kat) => (
          <div
            key={kat.value}
            className="kategori-dropdown-item"
            style={{
              background: selected === kat.value ? '#c49b63' : undefined,
              color: selected === kat.value ? '#111' : undefined,
              fontWeight: selected === kat.value ? 'bold' : undefined,
            }}
            onClick={() => { setOpen(false); onSelect(kat.value); }}
          >
            {kat.label}
          </div>
        ))}
      </div>
    </div>
  );
}
