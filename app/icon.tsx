import { ImageResponse } from 'next/og';

export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 280,
          background: '#e0e5ec',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '20%',
          boxShadow: 'inset 0 0 0 4px rgba(255,255,255,0.4)', 
          position: 'relative',
        }}
      >
        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '20%',
            borderTop: '8px solid rgba(255,255,255,0.8)',
            borderLeft: '8px solid rgba(255,255,255,0.8)',
        }} />

        <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            borderRadius: '20%',
            borderBottom: '8px solid rgba(163,177,198,0.4)',
            borderRight: '8px solid rgba(163,177,198,0.4)',
        }} />

        <div
          style={{
            color: '#2563eb',
            fontWeight: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -20,
            fontFamily: 'sans-serif',
            textShadow: '2px 2px 4px rgba(163,177,198,0.5), -2px -2px 4px rgba(255,255,255,0.8)',
          }}
        >
          MD
        </div>

        <div style={{
            position: 'absolute',
            bottom: '50px',
            right: '50px',
            width: '40px',
            height: '40px',
            background: '#22c55e',
            borderRadius: '50%',
            border: '6px solid #e0e5ec',
        }} />
      </div>
    ),
    {
      ...size,
    }
  );
}