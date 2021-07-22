import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { dbService } from 'fbase';

const Detail = ({ userObj }) => {
  const { gameId } = useParams();
  const [gameObj, setGameObj] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [isInit, setIsInit] = useState(false);

  const getGameObj = async () => {
    const dbGameObj = await dbService
      .collection('game-list')
      .where('id', '==', gameId)
      .get();
    dbGameObj.forEach((document) => {
      const gameObjData = {
        ...document.data(),
      };
      setGameObj(() => gameObjData);
    });
    setIsInit(true);
  };

  const onMyRatingChange = (e) => {
    e.preventDefault();
    const {
      target: { value },
    } = e;
    const numberValue = parseInt(value);
    setMyRating(numberValue);
  };

  const onRatingSubmit = (e) => {
    e.preventDefault();
    setRating();
  };

  const setRating = async () => {
    const nowUserNumber = gameObj.user ? gameObj.user : 0;
    const userNumber = nowUserNumber + 1;
    const resultRating =
      (gameObj.rating * nowUserNumber + myRating) / userNumber;

    await dbService.doc(`game-list/${gameId}`).update({
      rating: resultRating,
      user: userNumber,
      ratedUserList: gameObj.ratedUserList
        ? [...gameObj.ratedUserList, userObj.email]
        : [userObj.email],
    });

    setGameObj({
      ...gameObj,
      rating: resultRating,
      user: userNumber,
      ratedUserList: gameObj.ratedUserList
        ? [...gameObj.ratedUserList, userObj.email]
        : [userObj.email],
    });
  };

  useEffect(() => {
    getGameObj();
  }, []);

  return (
    <>
      {isInit && (
        <>
          {gameObj.name}
          <p>{gameObj.rating}</p>
          {(gameObj.ratedUserList &&
            gameObj.ratedUserList.includes(userObj.email)) || (
            <form onSubmit={onRatingSubmit}>
              <input type="number" onChange={onMyRatingChange} />
            </form>
          )}
        </>
      )}
    </>
  );
};

export default Detail;
