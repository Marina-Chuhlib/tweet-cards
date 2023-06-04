import { useEffect, useState, useRef } from 'react';
import instance from 'shared/instance';
import { useNavigate } from 'react-router-dom';

import Loader from 'shared/Loader/Loader';
import TweetCard from './TweetCard/TweetCard';

import * as toasty from '../../shared/toastify';

import css from './Tweets.module.css';

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPage, setHasPage] = useState(true);
  const [activeFilter, setActiveFilter] = useState('');
  const lastCardRef = useRef(null);

  const navigate = useNavigate();

  const getUsers = async page => {
    try {
      setIsLoading(true);
      const { data: users } = await instance.get('/tweets', {
        params: {
          completed: false,
          limit: 3,
          page: page,
        },
      });
      if (page === 1) {
        setUsers(users);
      }
      return users;
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const loadMoreBtn = async () => {
    const nextPage = currentPage + 1;
    setIsLoading(true);
    const newUsers = await getUsers(nextPage);
    setUsers([...users, ...newUsers]);
    setIsLoading(false);
    setCurrentPage(nextPage);
    if (newUsers.length === 0) {
      setHasPage(false);
      return;
    }
  };

  const followingFilter = async () => {
    const getAllUsers = await getUsers();
    const followers = getAllUsers.filter(user => user.isFollowers === true);
    if (followers.length === 0) {
      return toasty.toastInfo('Following list empty');
    }
    setActiveFilter('following');
    return setUsers(followers);
  };

  const followFilter = async () => {
    const getAllUsers = await getUsers();
    const followers = getAllUsers.filter(user => user.isFollowers !== true);
    if (followers.length === 0) {
      return toasty.toastInfo('Follow list empty');
    }
    setActiveFilter('follow');

    return setUsers(followers);
  };

  const allTweetsFilter = async () => {
    const allUsers = await getUsers();
    setUsers(allUsers);
    setHasPage(false);
    setActiveFilter('allTweets');
    return;
  };

  const goBackBtn = () => {
    navigate('/');
  };

  return (
    <>
      <section className={css.container}>
        {isLoading && <Loader />}
        <h2 className={css.visuallyHidden}>Tweets</h2>

        {users.length > 0 && !isLoading && (
          <div className={css.cardWrapper}>
            <ul className={css.list}>
              {users.map((user, index) => {
                const isLastCard = index === users.length - 1;
                return (
                  <li
                    key={user.id}
                    className={css.item}
                    ref={isLastCard ? lastCardRef : null}
                  >
                    <TweetCard user={user} id={user.id} setUsers={setUsers} />
                  </li>
                );
              })}
            </ul>
            {hasPage && !activeFilter ? (
              <>
                <button onClick={loadMoreBtn} className={css.loadMoreBtn}>
                  Load more tweets
                </button>
              </>
            ) : (
              <p className={css.notification}>Reached the end of the list</p>
            )}
            <button onClick={goBackBtn} className={css.goBackBtn}>
              Back
            </button>
          </div>
        )}

        <div className={css.filter}>
          <button
            onClick={followingFilter}
            className={`${css.filterBtn} ${
              activeFilter === 'following' ? 'active' : ''
            }`}
          >
            Show following
          </button>
          <button
            onClick={followFilter}
            className={`${css.filterBtn} ${
              activeFilter === 'follow' ? 'active' : ''
            }`}
          >
            Show Follow
          </button>
          <button
            onClick={allTweetsFilter}
            className={`${css.filterBtn} ${
              activeFilter === 'allTweets' ? 'active' : ''
            }`}
          >
            Show all tweets
          </button>
        </div>
      </section>
    </>
  );
};

export default Tweets;
