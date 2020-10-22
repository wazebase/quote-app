import React, { useState} from 'react';
import './App.css';
import { useEffect } from "react";
import {useSpring, animated} from 'react-spring';
import {Spring} from 'react-spring/renderprops';

const App = () => {
  
  const [quotes, setQuotes] = React.useState([]);
  const allQuotes = [];
  const allAuthors = [];
  let randomNum;
  //get data from json
  useEffect(() => {
  fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
  .then(response => response.json())
  .then(data => {
  
    setQuotes(data.quotes);
  });

}, []);
//set all quotes and authors to separate arrays
quotes.map(quote => {
  allQuotes.push(quote.quote);
  allAuthors.push(quote.author);
  return quotes;
});
//set random number
randomNum = [Math.floor(Math.random() * quotes.length)];

  return( 
    <>
   
    <Quote quote= {allQuotes[randomNum]} author = {allAuthors[randomNum]} 
    allQuotes = {allQuotes} allAuthors= {allAuthors}/>
   

     
    </>
    );
}


const Quote = props => { 
  let [quote, setQuote] = useState("");
  let [author, setAuthor] = useState("");
  let [toggle,setToggle] = useState(true);
  let [color, setColor] = useState(0);

  let colorArray = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];  
  let linkText = "https://twitter.com/intent/tweet?hashtags=quotes&text="  + '"' + quote + '"' + author;
  

  if(author === undefined && quote === undefined) {
    setQuote(props.quote);
    setAuthor(props.author);
  }

  useEffect(() => {

      setTimeout(() => {
        let newRandomNum = Math.floor(Math.random() * props.allQuotes.length);

        setQuote(props.allQuotes[newRandomNum]);
        setAuthor(props.allAuthors[newRandomNum]);
    // align to self to rewrite link with new quote and author parameters
      linkText = linkText;
      },1000);
      
  }, [color]);
  
  const handleClick = () => {
   
    setToggle(true);
    if(color>=2){
      setColor(0);
    }
    else{
    setColor(color+1);
    }
   
    
  }

  const fade = useSpring(
    toggle
      ? {
          to: [{ opacity: 0 }, { opacity: 1, color: colorArray[color] }],
          from: { opacity: 1, color: colorArray[color] },
          config: { duration: 1000 }
        }
      : 0
  );
 
  const colorChange = useSpring(toggle?{to:{color:colorArray[color],backgroundColor:colorArray[color]},
    config:{duration:1500}}:0);
return (
  
<animated.div style={colorChange}>
  
<div id = "wrapper">
<div id = "quote-box" className="center-block">
<animated.div style ={fade}>
  <div id="text">{quote}</div>
  <div id="author"><em>by {author}</em></div>
  </animated.div>
  
  <div className = "row">
    <div className = "col-md-8">
     <a className="twitter-share-button" id ="tweet-quote"
  href= {linkText} data-size="large" target="_blank">
    <Spring
  config={{duration:1500}}
  from={{ color:colorArray[color],borderColor:colorArray[color] }}
  to={{  color:colorArray[color],borderColor:colorArray[color]}}>
   {props =>
<i className="fa fa-twitter-square fa-3x" style={props} aria-hidden="true"></i>}
</Spring>
</a>

</div>

<div className = "col-md-3">
  <Spring
  config={{duration:1500}}
  from={{ backgroundColor:colorArray[color],borderColor:colorArray[color] }}
  to={{  backgroundColor:colorArray[color],borderColor:colorArray[color]}}>
  {props => <button style = {props} id="new-quote" className="button" onClick ={handleClick}>New Quote</button>}
  
  </Spring>
  </div>
 
</div>
</div>
</div>


 </animated.div>


);}
  
  
      

export default App;