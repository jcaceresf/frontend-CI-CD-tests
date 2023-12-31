export const msg = 'From Shared Folder';

export const logFxn = () => {
  console.log('This is a function from shared folder');
};

export const add = (a: number, b: number) => {
  return a + b;
};

export const sub = (a: number, b: number) => {
  return a - b;
};

export const mul = (a: number, b: number) => {
  return a * b;
};

export const div = (a: number, b: number) => {
  return a / b;
};

export const modFunction = (a: number, b: number) => {
  return a % b;
};

export const apicall = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await response.json();
  return json;
};
