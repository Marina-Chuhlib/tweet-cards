import { useEffect, useState, useRef } from 'react';

import TweetCard from './TweetCard/TweetCard';

import instance from 'shared/instance';

import Loader from 'shared/Loader/Loader';

import css from './Tweets.module.css';

const Tweets = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasPage, setHasPage] = useState(true);
  const lastCardRef = useRef(null);

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

  const handleFilterChange = async event => {
    const selectedFilter = event.target.value;

    switch (selectedFilter) {
      case 'following':
        await followingFilter();
        break;
      case 'follow':
        await followFilter();
        break;
      case 'allTweets':
        await allTweetsFilter();
        break;
      default:
        break;
    }
  };

  const followingFilter = async () => {
    const getAllUsers = await getUsers();
    const followers = getAllUsers.filter(user => user.isFollowers === true);
    if (followers.length === 0) {
      alert('List empty');
      return;
    }
    return setUsers(followers);
  };

  const followFilter = async () => {
    const getAllUsers = await getUsers();
    const followers = getAllUsers.filter(user => user.isFollowers !== true);
    if (followers.length === 0) {
      alert('List empty');
      return;
    }

    return setUsers(followers);
  };

  const allTweetsFilter = async () => {
    const allUsers = await getUsers();
    setUsers(allUsers);
    setHasPage(false);
    return;
  };

  return (
    <>
      <section className={css.container}>
        {isLoading && <Loader />}
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
            {hasPage ? (
              <>
                <button onClick={loadMoreBtn} className={css.loadMoreBtn}>
                  Load more tweets
                </button>
              </>
            ) : (
              <p className={css.notification}>Reached the end of the list</p>
            )}
          </div>
        )}

        <div className={css.filter}>
          <select onChange={handleFilterChange} className={css.select}>
            <option disabled selected value="">
              Select Filter
            </option>
            <option value="following">Show Following</option>
            <option value="follow">Show Follow</option>
            <option value="allTweets">Show all tweets</option>
          </select>

          {/* <select onChange={handleFilterChange} className={css.select}>
            <option disabled selected value="Hello">
              Select Filter
            </option>
            <option value="allTweets">Show all tweets</option>
            <option value="following">Show Following</option>
            <option value="follow">Show Follow</option>
          </select> */}
        </div>
      </section>
    </>
  );
};

export default Tweets;
