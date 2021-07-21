import React from 'react';
import { useParams } from 'react-router';

const Detail = () => {
  let { gameId } = useParams();
  return <>{gameId}</>;
};

export default Detail;
