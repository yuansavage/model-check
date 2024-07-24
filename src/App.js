import './App.css';
import api from "./api"
import {useEffect} from "react"

const  App=()=> {
  useEffect(()=>{
    api.checkAPIHealth()
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error("checkAPIHealth", error);
      });
    
    api.getModelsList()
      .then(json => {
        console.log(json)
        json.forEach(el => {
          api.getModelMetaData(el.id)
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.error("getModelMetaData", error);
      });
        });
      })
      .catch(error => {
        console.error('getModelsList', error);
      });},[])
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
