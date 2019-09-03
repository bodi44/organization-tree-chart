import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAw8G1ZKxtpaN7rBxO13CoRV0TLmfHR4Tc',
  authDomain: 'organization-tree-chart.firebaseapp.com',
  databaseURL: 'https://organization-tree-chart.firebaseio.com',
  projectId: 'organization-tree-chart',
  storageBucket: 'organization-tree-chart.appspot.com',
  messagingSenderId: '351683037308',
  appId: '1:351683037308:web:5791af3370d10559',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
