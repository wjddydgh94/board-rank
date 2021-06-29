import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';

const Home = () => {
  const [gameList, setGameList] = useState([]);
  const getGameList = async () => {
    const gameLists = await dbService.collection('game-list').get();
    let gameName = [];
    gameLists.forEach((document) => {
      gameName = [...gameName, document.id];
    });
    setGameList(gameName);
  };
  useEffect(() => {
    getGameList();
  }, []);
  return <>{gameList}</>;
};

export default Home;
