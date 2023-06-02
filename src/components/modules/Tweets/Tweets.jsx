// https://647874fa362560649a2dceb2.mockapi.io/app

import { useEffect, useState, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import TweetCard from './TweetCard/TweetCard';

import instance from 'shared/app';

import css from './Tweets.module.css';

const Tweets = () => {
  const [users, setUsers] = useState([]);
  console.log(users);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const lastCardRef = useRef(null);

  const getUsers = async page => {
    const { data: users } = await instance.get('/tweets', {
      params: {
        completed: false,
        limit: 3,
        page: page,
      },
    });
    setUsers(users);
    setIsLoading(false);
    return users;
  };


  useEffect(() => {
    getUsers(1);
  }, []);

  // useEffect(() => {
  // if (currentPage === 1) {
  //   getUsers(1);
  // }
  // }, [currentPage]);
  

  useEffect(() => {
    if (lastCardRef.current) {
      lastCardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [users]);

  const loadMoreBtn = async () => {
    const nextPage = currentPage + 1;
    const newUsers = await getUsers(nextPage);
    console.log(newUsers, 'newUsers');
    setCurrentPage(nextPage);
    setUsers(prevUsers => [...prevUsers, ...newUsers]);
  };

  // const toggleFilter = () => {
  // };

  return (
    <>
      <section>
        <div className={css.cardWrapper}>
          {users.length > 0 && !isLoading && (
            <ul className={css.list}>
              {users.map((user, index) => {
                console.log(user.id);
                const isLastCard = index === users.length - 1;
                return (
                  <li
                    key={user.id}
                    className={css.item}
                    ref={isLastCard ? lastCardRef : null}
                  >
                    <TweetCard user={user} id={user.id} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <button onClick={loadMoreBtn}>Load more tweets</button>

        {/* <button onClick={toggleFilter}>Show Following</button> */}

        {/* <button onClick={toggleFilter}>
          {isFiltered ? 'Show All' : 'Show Following'}
        </button> */}
      </section>
    </>
  );
};

export default Tweets;
