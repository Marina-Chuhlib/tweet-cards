import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <h1 style={{ marginTop: '120px', textAlign: 'center', color: '#5cd3a8' }}>
        Home page 🏡
      </h1>

      <Link
        to="/tweets"
        style={{ display: 'block', textAlign: 'center', fontSize: '16px' }}
      >
        Go to tweets
      </Link>
    </>
  );
};

export default HomePage;
