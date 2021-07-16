import React, { useState } from 'react';
import GameList from './GameList';
import GenryList from './GenryList';

const Home = () => {
  const [genryName, setGenryName] = useState('테마');

  return (
    <section className="inner">
      <GenryList setGenryName={setGenryName} />
      <GameList genryName={genryName} />
    </section>
  );
};

export default Home;
