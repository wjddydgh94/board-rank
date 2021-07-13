import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from 'styles/palette';

const GenryList = ({ setGenryName }) => {
  const [genryLists, setGenryLists] = useState([]);
  const [genryNum, setGenryNum] = useState(0);

  const getGenryLists = async () => {
    const dbGenryLists = await dbService.collection('genryList').get();
    dbGenryLists.forEach((document) => {
      const genryListObject = {
        ...document.data(),
        id: document.id,
      };
      setGenryLists((prev) => [genryListObject, ...prev]);
    });
  };

  const onClickGenry = (event, idx) => {
    setGenryNum(idx);
    setGenryName(event.target.innerText);
  };

  useEffect(() => {
    getGenryLists();
  }, []);

  return (
    <StyledGenryUl>
      {genryLists.map((genry, idx) => (
        <li
          key={genry.id}
          name={genry.id}
          className={idx === genryNum ? 'active' : ''}
          onClick={(event) => onClickGenry(event, idx)}
        >
          {genry.id}
        </li>
      ))}
    </StyledGenryUl>
  );
};

const StyledGenryUl = styled.ul`
  margin-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${palette.grey_5};

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

export default GenryList;
