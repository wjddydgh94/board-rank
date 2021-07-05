import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Home = () => {
  const [gameList, setGameList] = useState([]);

  const getGameList = async () => {
    const gameLists = await dbService.collection('game-list').get();
    gameLists.forEach((document) => {
      const gameListObject = {
        ...document.data(),
        id: document.id,
      };
      console.log(gameListObject);
      setGameList((prev) => [gameListObject, ...prev]);
    });
  };

  useEffect(() => {
    getGameList();
  }, []);

  return (
    <>
      <StyledGenryUl>
        <li className="active">전략</li>
        <li>추상</li>
        <li>컬렉터블</li>
        <li>가족</li>
        <li>어린이</li>
        <li>파티</li>
        <li>테마</li>
      </StyledGenryUl>
      {gameList.map((game) => (
        <div key={game.id}>{game.detail}</div>
      ))}
    </>
  );
};

const StyledGenryUl = styled.ul`
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;

  li {
    margin: 0 25px;
    font-weight: normal;
    font-size: 16px;
    line-height: 100%;
    color: #494949;
    padding-bottom: 20px;
    cursor: pointer;
    &.active {
      font-weight: bold;
      color: #272727;
      border-bottom: 2px solid #000;
    }
    &:hover {
      font-weight: bold;
      color: #272727;
      border-bottom: 2px solid #000;
    }
  }
`;

export default Home;
