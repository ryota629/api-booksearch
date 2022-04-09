import { useState } from 'react';
import axios from 'axios';

// Rakuten APIで用意されているエンドポイント
const BASE_URL =
  'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json';

const useFetchData = () => {
  // エラーを管理するstate
  const [error, setError] = useState({
    freeWord: false,
  });
  // ローディングする際に使うstate
  const [fetching, setFetching] = useState(false);
  // レスポンスを格納するstate
  const [result, setResult] = useState({});

  // submitボタン押下
  const handleSubmit = (value) => {
    const params = value.freeWord;
    console.log(params);

    if (params) {
      // ローディング開始
      setFetching(true);

      const encodedParams = encodeFreeWord(params);
      const appId= process.env.REACT_APP_APPLICATION_ID;
      // apiコール
      axios
        .get(
          // envは後述
        

          `${BASE_URL}&keyword=${encodedParams}&page=1&applicationId=${appId}`
          
          // `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${encodedParams}&page1&applicationId=1000309266213649376`
        )
        .then((response) => {
          // レスポンスデータを格納
          setResult(response.data);
          // ローディング終了
          setFetching(false);
        })
        .catch((error) => {
          console.log(error.response);
          setFetching(false);
        });
    } else {
      // nullの時はエラー
      console.log('検索条件を入力してください。');
      setError({
        freeWord: true,
      });
      setFetching(false);
    }
  };

  // エンコードする関数
  // 日本語 => エンコードされる
  // ex) アイフォン => %E3%82%A2%E3%82%A4%E3%83%95%E3%82%A9%E3%83%B3
  // 英語 => そのまま
  // ex) iphone => iphone
  const encodeFreeWord = (params) => {
    var urlEncode = require('urlencode');
    return urlEncode(params);
  };

  // データをオブジェクト型で返す
  return { error, setError, fetching, result, handleSubmit };
};
export default useFetchData;
