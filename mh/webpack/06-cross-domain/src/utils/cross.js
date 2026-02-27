import axios from 'axios'

function getGoods() {
  let url = "http://localhost:3001/goodsList";
  let res = axios(url);
  return res;
}

let goodsList = getGoods();
console.log(goodsList);
