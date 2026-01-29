import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF9F6',
        borderRadius: '24%',
        border: '1px solid #E5D5D1',
      }}
    >
      <svg width='24' height='24' viewBox='0 0 100 100' fill='none'>
        {/* Ring Band */}
        <circle cx='50' cy='62' r='28' stroke='#7A4544' strokeWidth='8' />
        {/* Diamond */}
        <path d='M50 15 L68 32 L50 50 L32 32 Z' fill='#7A4544' />
      </svg>
    </div>,
    {
      ...size,
    },
  );
}
