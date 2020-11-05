import React, { useEffect, useState } from "react";
import Axios from "axios";

const show = (props) => {
  const [jokeState, setJokeState] = useState({
    fact: "Please click the Joke button",
    imgSource: ""
  });

  const Joke = () => {
    let selected = document.getElementById("cat");

    if (selected.value === "random") {
      Axios({
        method: "get",
        url: "https://api.chucknorris.io/jokes/random",
        responseType: "stream"
      }).then((response) => {
        setJokeState({
          fact: response.data.value,
          imgSource: response.data.icon_url
        });
      });
    } //if random

    if (selected.value !== "random") {
      Axios({
        method: "get",
        url:
          "https://api.chucknorris.io/jokes/random?category=" + selected.value,
        responseType: "stream"
      }).then((response) => {
        setJokeState({
          fact: response.data.value,
          imgSource: response.data.icon_url
        });
      });
    } //if random
  };

  const [catstate, setCatState] = useState([]);

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/categories")
      .then((res) => res.json())
      .then(setCatState);
  }, []);

  return (
    <div className="Norris">
      <h1> Chuck Norris Jokes </h1>
      <img src={jokeState.imgSource} alt="" />
      <p> {jokeState.fact} </p>
      <input type="button" value="joke" onClick={Joke} />
      <select id="cat">
        <option key="random" value="random">
          random
        </option>
        {catstate.map((elemen, key) => (
          <option key={elemen} value={elemen}>
            {elemen}
          </option>
        ))}
      </select>
    </div>
  );
};

export default show;
