import PropTypes from 'prop-types';
import { useState } from 'react';
import instance from 'shared/instance';

import canvas from '../../../img/picture.png';
import logo from '../../../img/logo.png';

import css from './TweetCard.module.css';

const TweetCard = ({
  user: { id, avatar, tweets, followers, isFollowers },
  setUsers,
}) => {
  const [value, setValue] = useState(followers);
  const text = isFollowers ? 'Following' : 'Follow';
  const [texBtn, setTextBtn] = useState(text);
  const [isFollow, setIsFollow] = useState(isFollowers);

  const formatted = value.toLocaleString('en-US', { useGrouping: true });

  const handleClick = () => {
    const updatedValue = isFollow === true ? false : true;
    const newValue = isFollow === true ? value - 1 : value + 1;

    setIsFollow(updatedValue);
    setValue(newValue);
    fetchUpdateTweet(id, newValue, updatedValue);
    toggleButton();
    return;
  };

  const fetchUpdateTweet = async (id, value, isFollow) => {
    try {
      const { data } = await instance.put(`/tweets/${id}`, {
        followers: value,
        isFollowers: isFollow,
      });

      setUsers(prevUsers =>
        prevUsers.map(user => {
          if (user.id === id) {
            return {
              ...user,
              followers: value,
              isFollowers: isFollow,
            };
          }
          return user;
        })
      );

      if (!data) {
        throw new Error();
      }

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleButton = () => {
    const text = !isFollow ? 'Following' : 'Follow';
    setTextBtn(text);
    return;
  };

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

TweetCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    tweets: PropTypes.number.isRequired,
    followers: PropTypes.number.isRequired,
    isFollowers: PropTypes.bool.isRequired,
  }).isRequired,
};
