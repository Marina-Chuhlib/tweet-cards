// https://647874fa362560649a2dceb2.mockapi.io/app

import { useEffect, useState } from 'react';

import TweetCard from './TweetCard/TweetCard';

import instance from 'shared/app';

import css from './Tweets.module.css';

const Tweets = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const { data: users } = await instance.get('/tweets');
    setUsers(users);
    return users;
  };

  return (
    <>
      <section>
        {/* <img
          src="../../../../img/picture.jpg"
          alt="picture"
          className={css.picture}
        /> */}
        <div className={css.cardWrapper}>
          {users.length > 0 && (
            <ul className={css.list}>
              {users.map(user => {
                return (
                  <li key={user.id} className={css.item}>
                    <TweetCard user={user} id={user.id} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default Tweets;
