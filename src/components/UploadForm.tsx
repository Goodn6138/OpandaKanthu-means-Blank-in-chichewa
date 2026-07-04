'use client';

import { useState, useCallback } from 'react';
import ModelViewer from './ModelViewer';

export default function UploadForm() {
  const [mode, setMode] = useState<'sketch' | 'image'>('sketch');
  const [file, setFile] = useState<File | null>(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setModelUrl(null);

    const form = new FormData();
    form.append(mode === 'sketch' ? 'image' : 'image_upload', file);
    if (mode === 'sketch') form.append('description', description);

    const endpoint = mode === 'sketch' ? '/upload' : '/image_upload';
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        body: form,
      });

      if (!res.ok) throw new Error('Generation failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setModelUrl(url);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 560, width: '100%', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        gap: 0,
        marginBottom: 40,
        border: '1px solid #2A2A2A',
      }}>
        {(['sketch', 'image'] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              flex: 1,
              border: 'none',
              borderBottom: mode === m ? '1px solid #F5F5F0' : '1px solid transparent',
              background: mode === m ? 'rgba(245,245,240,0.03)' : 'transparent',
              padding: '16px',
              fontSize: 13,
              textTransform: 'uppercase',
            }}
          >
            {m === 'sketch' ? 'From Sketch' : 'From Image'}
          </button>
        ))}
      </div>

      {mode === 'sketch' && (
        <textarea
          rows={3}
          placeholder="Describe what you want to build..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ marginBottom: 24, resize: 'none' }}
        />
      )}

      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById('file-input')?.click()}
        style={{
          border: '2px dashed #2A2A2A',
          padding: '60px 24px',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s',
          marginBottom: 32,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#F5F5F0')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#2A2A2A')}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
        />
        {file ? (
          <p style={{ fontSize: 15 }}>{file.name}</p>
        ) : (
          <>
            <p style={{ fontSize: 15, marginBottom: 8, opacity: 0.8 }}>Drop an image here</p>
            <p style={{ fontSize: 13, opacity: 0.4 }}>or click to browse</p>
          </>
        )}
      </div>

      {error && (
        <p style={{ color: '#ff4444', fontSize: 14, marginBottom: 16, textAlign: 'center' }}>
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={!file || loading || (mode === 'sketch' && !description)}
        style={{ width: '100%', padding: '16px' }}
      >
        {loading ? 'Generating...' : 'Generate Model'}
      </button>

      {modelUrl && <ModelViewer url={modelUrl} onClose={() => setModelUrl(null)} />}
    </div>
  );
}
