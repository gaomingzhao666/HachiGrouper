// stores/localStorage.js
import { writable } from 'svelte/store';

const key = 'members';
const storedMemberList = JSON.parse(localStorage.getItem(key)) || [];

export const memberStore = writable(storedMemberList);

memberStore.subscribe((value) => {
  localStorage.setItem(key, JSON.stringify(value));
}, () => {
  return JSON.parse(localStorage.getItem(key)) || [];
});


