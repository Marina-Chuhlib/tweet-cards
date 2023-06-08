import PropTypes from 'prop-types';
import { useState } from 'react';
import instance from 'shared/instance';

import logo from '../../../img/logo.png';

import css from './TweetCard.module.css';
import { useEffect } from 'react';

const TweetCard = ({
  user: { id, avatar, tweets, followers },
  setUsers,
  activeFilter,
}) => {
  const [value, setValue] = useState(followers);
  const [texBtn, setTextBtn] = useState(() => {
    const existingValue = localStorage.getItem(`following_${id}`);
    const isFollowing = existingValue === 'true';
    if (isFollowing) {
      return 'Following';
    }
    return 'Follow';
  });
  const [isFollow, setIsFollow] = useState(false);

  const formatted = value.toLocaleString('en-US', { useGrouping: true });

  useEffect(() => {
    const local = localStorage.getItem(`following_${id}`);
    if (local === 'true') {
      setIsFollow(true);
    }
  }, [id]);

  const handleClick = () => {
    const updatedValue = isFollow === true ? false : true;
    const newValue = isFollow ? value - 1 : value + 1;

    setIsFollow(updatedValue);
    setValue(newValue);
    fetchUpdateTweet(id, newValue, updatedValue);

    const local = localStorage.getItem(`following_${id}`);
    if (local === 'true') {
      setIsFollow(false);
    }
    localStorage.setItem(`following_${id}`, updatedValue);
    toggleButton();
    return;
  };

  const fetchUpdateTweet = async (id, value) => {
    try {
      const { data } = await instance.put(`/tweets/${id}`, {
        followers: value,
      });

      setUsers(prevUsers =>
        prevUsers
          .map(user => {
            if (user.id === id) {
              if (
                activeFilter &&
                (activeFilter === 'following' || activeFilter === 'follow')
              ) {
                return null;
              } else {
                return {
                  ...user,
                  followers: value,
                };
              }
            }

            return user;
          })
          .filter(user => user !== null)
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
    setTextBtn(prevState => (prevState === 'Follow' ? 'Following' : 'Follow'));

    return;
  };

  const styles = texBtn === 'Following' ? css.followingBtn : css.followBtn;

  return (
    <div className={css.container}>
      <img src={logo} alt="" className={css.logo} />
      <div className={css.logoWrapper}></div>
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
  }).isRequired,
  setUsers: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};
