import {useState, useEffect, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';

import {x} from  './obj.js';

const  App = () => {

  const picSize = 200;
  const [count, setCount] = useState(0);
  const [maxCount, setMaxCount] = useState(0);

  useEffect(() => {
    if (count > maxCount)
      setMaxCount(count);
  }, [count]);

  const changeCount = (d) => {
    let nc = count + d;
    if (nc < 0)
      nc = 0;
    if (nc > x.list.length - 1)
      nc = x.list.length - 1;
    let el = document.getElementsByClassName("crs")[0];
    el.scroll(nc * picSize, 0);
  };

  

  const maxBufferSize = useMemo( () => {
    return maxCount + 10;
  }, [maxCount]);

  const carouselBuffer = useMemo(() => {
    let arr = [count - 1, count, count + 1];
    arr = arr.filter((i) => i >= 0);
    return x.list.slice(0, -1);
    // return arr.map((i) => x.list[i]);
  }, [count]);

  const scrollHandle = (e) => {
    // return;
    let el = e.target;
    let sl = el.scrollLeft;
    setCount(Math.floor(sl / picSize));
  };
  
  return (
    <div className="App">
      <div
        onScroll={
          scrollHandle
        }
        className="crs"
      >
        {
          carouselBuffer.map((i, pos) =>
            <div key={pos} className="imgCont">
              <img src={i.imgUrl} className="App-logo" loading="lazy" alt="logo" />
            </div>
          )
        }

      </div>

      <div>
        {count}
      </div>
      <div className="buttonsBlock">
                <button onClick={
          () => {
            changeCount(-100000);
          }
        }>
          fst
        </button>
        <button
          onClick={() =>
            changeCount(-1)
          }
        >
          left
        </button>
        <button
          onClick={() =>
            changeCount(1)
          }
        >
          right
        </button>

      </div>
      <div className="dn">
        {x.list.slice(0, maxBufferSize).map((i, pos) =>
          <img key={pos} src={i.imgUrl}/>
    )
    }
      </div>
    </div>

  );
};

export default App;
