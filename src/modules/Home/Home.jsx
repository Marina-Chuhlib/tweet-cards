import { Link } from 'react-router-dom';

import follow from '../../img/follow.jpg';
import following from '../../img/following.jpg';

import css from './Home.module.css';

const Home = () => {
  return (
    <section>
      <h1 style={{ marginTop: '120px', textAlign: 'center', color: '#5cd3a8' }}>
        Home page 🏡
      </h1>

      <Link to="/tweets" className={css.link}>
        Go to tweets
      </Link>
      <div className={css.imgWrapper}>
        <img src={follow} alt="" width="280px" height="360px" />
        <img src={following} alt="" width="280px" height="360px" />
      </div>
    </section>
  );
};

export default Home;
