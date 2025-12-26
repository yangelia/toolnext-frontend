import MiniLoader from '@/components/MiniLoader/MiniLoader';

export default function UserProfileLoading() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MiniLoader />
    </div>
  );
}
