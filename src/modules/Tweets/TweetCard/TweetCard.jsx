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
  const [texBtn, setTextBtn] = useState('Follow');
  const [isFollow, setIsFollow] = useState(false);

  const formatted = value.toLocaleString('en-US', { useGrouping: true });

  useEffect(() => {
    const localValue = JSON.parse(localStorage.getItem('users'));
    if (localValue) {
      const user = localValue.find(user => user.id === id);
      if (user && user.isFollowing) {
        setTextBtn('Following');
        setIsFollow(true);
      }
    }
  }, [id]);

  const noteToLocalStorage = (id, updatedValue) => {
    const localValue = localStorage.getItem('users');
    let usersData = [];
    const newData = { id, isFollowing: updatedValue };

    if (localValue) {
      usersData = JSON.parse(localValue);
      const existingUserIndex = usersData.findIndex(user => user.id === id);

      if (existingUserIndex !== -1) {
        usersData[existingUserIndex].isFollowing = updatedValue;
        localStorage.setItem('users', JSON.stringify(usersData));
        return;
      }
    }
    usersData.push(newData);
    localStorage.setItem('users', JSON.stringify(usersData));
  };

  const handleClick = () => {
    const updatedValue = isFollow ? false : true;
    const newValue = isFollow ? value - 1 : value + 1;

    setIsFollow(updatedValue);
    setValue(newValue);
    fetchUpdateTweet(id, newValue, updatedValue);
    toggleButton();
    noteToLocalStorage(id, updatedValue);

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
    setTextBtn(prevState =>
      prevState === 'Following' ? 'Follow' : 'Following'
    );

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
