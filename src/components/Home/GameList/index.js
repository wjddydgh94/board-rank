import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from 'styles/palette';

const GameList = ({ genryName }) => {
  const [gameList, setGameList] = useState([]);

  const getGameList = async () => {
    const gameLists = await dbService
      .collection('game-list')
      .where('genry', 'array-contains-any', [genryName])
      .get();

    gameLists.forEach((document) => {
      const gameListObject = {
        ...document.data(),
      };
      setGameList((prev) => [gameListObject, ...prev]);
    });
  };

  useEffect(() => {
    setGameList([]);
    getGameList();
  }, [genryName]);

  return (
    <StyledGameUl>
      {gameList.map((game) => (
        <li key={game.id}>
          <figure>
            <img src={game.image} alt={`${game.name} 프로필 이미지`} />
          </figure>
          <div className="info-wrapper">
            <div className="title-box">
              <div className="title">
                <h3>
                  <Link to={`/detail/${game.id}`}>{game.name}</Link>
                </h3>
                <p>
                  {game.personnel}명 / {game.recommendation}명추천
                </p>
              </div>
              <div className="user-point font-jost">
                User point
                <span className="font-jost">
                  {game.rating !== 0
                    ? parseFloat(Math.round(game.rating)).toFixed(1)
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
  );
};

const StyledGameUl = styled.ul`
  li {
    border-bottom: 1px solid ${palette.grey_5};
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
            a {
              font-weight: 900;
              font-size: 26px;
              line-height: 100%;
              color: ${palette.grey_9};
              margin-right: 20px;
            }
          }
          p {
            font-weight: 500;
            font-size: 16px;
            line-height: 100%;
            color: ${palette.grey_6};
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
        color: ${palette.grey_8};
        padding: 0 10px;
        margin-bottom: 15px;
      }
      .tag {
        padding: 0 10px;
        font-weight: normal;
        font-size: 15px;
        line-height: 160%;
        color: ${palette.grey_7};
      }
    }
  }
`;

export default GameList;
