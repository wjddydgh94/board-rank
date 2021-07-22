import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { dbService } from 'fbase';

const Detail = () => {
  let { gameId } = useParams();

  const [gameObj, setGameObj] = useState([]);

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
  };

  useEffect(() => {
    getGameObj();
  }, []);

  return <>{gameObj.name}</>;
};

export default Detail;
