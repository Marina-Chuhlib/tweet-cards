import { useState } from 'react';
import axios from 'axios';

import canvas from '../../../../img/picture.png';
import logo from '../../../../img/logo.png';

import css from './TweetCard.module.css';

const TweetCard = ({ user: { id, avatar, tweets, followers } }) => {
  const [value, setValue] = useState(followers);
  const [texBtn, setTextBtn] = useState(
    JSON.parse(localStorage.getItem(`status_id_${id}`)) || 'Follow'
  );

  const formatted = value.toLocaleString('en-US', { useGrouping: true });

  const handleClick = () => {
    const newValue = texBtn === 'Following' ? value - 1 : value + 1;

    setValue(newValue);
    fetchUpdateTweet(id, newValue);
    toggleButton();
  };

  const fetchUpdateTweet = async (id, value) => {
    try {
      const { data } = await axios.put(
        `https://647874fa362560649a2dceb2.mockapi.io/app/tweets/${id}`,
        { followers: value }
      );

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleButton = () => {
    setTextBtn(prevText => (prevText !== 'Following' ? 'Following' : 'Follow'));
  };

  if (texBtn === 'Following') {
    localStorage.setItem(`status_id_${id}`, JSON.stringify(texBtn));
  }

  const styles = texBtn === 'Following' ? css.followingBtn : css.followBtn;

  return (
    <div className={css.container}>
      <img src={logo} alt="" className={css.logo} />
      <div className={css.logoWrapper}>
        <img src={canvas} alt="canvas" className={css.picture} />
      </div>
      <div className={css.tweetWrapper}>
        <div className={css.circle}>
          <img src={avatar} alt="avatar" className={css.avatar} />
        </div>
        <p className={css.text}>Tweets: {tweets}</p>
        <p>Followers: {formatted}</p>
        <button
          type="button"
          onClick={handleClick}
          className={`${css.btn} ${styles}`}
        >
          {texBtn}
        </button>
      </div>
    </div>
  );
};

export default TweetCard;
