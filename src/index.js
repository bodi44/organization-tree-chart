import * as M from 'materialize-css';

import { db } from './firebaseConfig';
import update from './helpers/update';

const modal = document.querySelector('.modal');
M.Modal.init(modal);

const form = document.querySelector('form');
const name = document.querySelector('#name');
const parent = document.querySelector('#parent');
const department = document.querySelector('#department');

form.addEventListener('submit', event => {
  event.preventDefault();

  db.collection('employees').add({
    name: name.value,
    parent: parent.value,
    department: department.value,
  });

  const instance = M.Modal.getInstance(modal);
  instance.close();

  form.reset();
});

let data = [];

db.collection('employees').onSnapshot(res => {
  res.docChanges().forEach(change => {
    const doc = { ...change.doc.data(), id: change.doc.id };

    switch (change.type) {
      case 'added':
        data.push(doc);
        break;
      case 'modified':
        const index = data.findIndex(item => item.id === doc.id);
        data[index] = doc;
        break;
      case 'removed':
        data = data.filter(item => item.id !== doc.id);
        break;
      default:
        break;
    }

  });

  update(data);
});
