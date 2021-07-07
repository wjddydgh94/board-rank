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
      setGameList((prev) => [gameListObject, ...prev]);
    });
  };

  useEffect(() => {
    getGameList();
  }, []);

  return (
    <section className="inner">
      <StyledGenryUl>
        <li className="active">전략</li>
        <li>추상</li>
        <li>컬렉터블</li>
        <li>가족</li>
        <li>어린이</li>
        <li>파티</li>
        <li>테마</li>
      </StyledGenryUl>
      <StyledGameUl>
        {gameList.map((game) => (
          <li key={game.id}>
            <figure>
              <img src={game.image} alt={`${game.name} 프로필 이미지`} />
            </figure>
            <div className="info-wrapper">
              <div className="title-box">
                <div className="title">
                  <h3>{game.name}</h3>
                  <p>
                    {game.personnel}명 / {game.recommendation}명추천
                  </p>
                </div>
                <div className="user-point">
                  User point
                  <span>
                    {game.rating !== 0
                      ? parseFloat(Math.round(game.rating) / 10).toFixed(1)
                      : '평가 전'}
                  </span>
                </div>
              </div>

              <p className="detail">{game.detail}</p>

              <p className="tag">
                {game.genry.map((n) => {
                  return '#' + n + ' ';
                })}
              </p>
            </div>
          </li>
        ))}
      </StyledGameUl>
    </section>
  );
};

const StyledGenryUl = styled.ul`
  margin-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #cfcfcf;

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

const StyledGameUl = styled.ul`
  li {
    border-bottom: 1px solid #cfcfcf;
    padding: 60px 93px;
    display: flex;
    align-items: center;

    figure {
      width: 172px;
      margin-right: 30px;
    }
    .info-wrapper {
      width: calc(100% - 295px);
      .title-box {
        border-bottom: 1px solid #000000;
        padding: 0 10px 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 23px;
        .title {
          display: flex;
          align-items: center;
          h3 {
            font-weight: 900;
            font-size: 26px;
            line-height: 100%;
            color: #202020;
            margin-right: 20px;
          }
          p {
            font-weight: 500;
            font-size: 16px;
            line-height: 100%;
            color: #6a6a6a;
          }
        }
        .user-point {
          font-weight: normal;
          font-size: 26px;
          line-height: 100%;
          color: #444444;
          span {
            font-weight: bold;
            font-size: 26px;
            line-height: 100%;
            color: #444444;
            margin-left: 12px;
          }
        }
      }
      .detail {
        font-weight: 500;
        font-size: 15px;
        line-height: 160%;
        color: #3e3e3e;
        padding: 0 10px;
        margin-bottom: 15px;
      }
      .tag {
        padding: 0 10px;
        font-weight: normal;
        font-size: 15px;
        line-height: 160%;
        color: #505050;
      }
    }
  }
`;

export default Home;
