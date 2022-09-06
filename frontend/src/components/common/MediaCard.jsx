import React from "react";
import commonStyle from "./common.css";
import { Button ,Popover , Badge, Card} from 'antd';


export default function MediaCard(props) {

  const { title, imageUrl, toNext, downLoad, movieId, isMinted} = props;
  const downLoadImg = ()=>{
    const url ='https://image.tmdb.org/t/p/w500/'+imageUrl;
    downLoad(url, title, movieId);
  }

  const content = (
    <div>
      <p>1、Afeter click Mint button, you can get movies poster</p>
      <p>2、You can upload this Poster</p>
    </div>
  );

  return (
    <>
    {
      isMinted ?
      <Badge.Ribbon text="Minted" color="purple">
        <Card className="item" >
          <section className="item" onClick={toNext}> 
            <img 
              className="img-size" 
              src={'https://image.tmdb.org/t/p/w300'+imageUrl} 
              alt=""
            />
            <div className="film-title">{title}</div>
          </section>
          <section className="item">
            
          <Popover content={content} title="TIPS">
            <Button type="primary" className="mint-btn" disabled>Mint</Button>
          </Popover>
          </section>
          </Card>
      </Badge.Ribbon>
      :
      <Card className="item" >
          <section className="item" onClick={toNext}> 
            <img 
              className="img-size" 
              src={'https://image.tmdb.org/t/p/w300'+imageUrl} 
              alt=""
            />
            <div className="film-title">{title}</div>
          </section>
          <section className="item">
            
          <Popover content={content} title="TIPS">
            <Button type="primary" className="mint-btn" onClick={downLoadImg}>Mint</Button>
          </Popover>
          </section>
          </Card>
    }
    </>
  );
}
