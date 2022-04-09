import React, { useState } from 'react';
import useFetchData from '../hooks/useFetch';

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import  CircularProgress  from '@mui/material/CircularProgress';

import Result from './Result';
import ItemSearch from './ItemSearch';

const Home = () => {
  const {error,setError,fetching,result,handleSubmit} = useFetchData();

  const [value,setValue] = useState({
    freeWord:'',
  });
  //検索フィールド
const handleFreeWord = (e) => {
  setError({
    freeWord:false,
  });
  setValue({[e.target.name]:e.target.value});
  console.log({[e.target.name]:e.target.value})
};

return(
  <>
  <ItemSearch
    value={value}
    error={error}
    handleFreeWord={handleFreeWord}
    handleSubmit={handleSubmit}
  />
  <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        {/* フェッチ中はローディングがクルクルする */}
        {fetching ? (
          <Box m={10}>
            <CircularProgress />
          </Box>
        ) : (
          // フェッチが完了したらレスポンスデータを表示
          <Result result={result} />
        )}
      </Grid>
  </>    
);

};
export default Home;
