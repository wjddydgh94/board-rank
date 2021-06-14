import firebase from 'firebase/app';

// const firebaseConfig = {
//   apiKey: 'AIzaSyBgr1XSIQm5ydSgOIAPFvlgNa-UG54yYmk',
//   authDomain: 'board-rank.firebaseapp.com',
//   projectId: 'board-rank',
//   storageBucket: 'board-rank.appspot.com',
//   messagingSenderId: '47989076113',
//   appId: '1:47989076113:web:021691286042dcf6780f30',
//   measurementId: 'G-GQ6PF1HMNC',
// };

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export default firebase.initializeApp(firebaseConfig);
