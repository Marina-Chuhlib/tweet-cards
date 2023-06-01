import { useState } from 'react';
import axios from 'axios';

const TweetCard = ({ user: { id, user, avatar, tweets, followers } }) => {
  const [value, setValue] = useState(followers);
  const [texBtn, setTextBtn] = useState('Follow');

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

  return (
    <>
      <h3>{user}</h3>
      <img src={avatar} alt="avatar" />
      <p>Tweets: {tweets}</p>
      <p>Followers: {formatted}</p>
      <button type="button" onClick={handleClick}>
        {texBtn}
      </button>
    </>
  );
};

export default TweetCard;
