import axios from "axios";

const url = "https://fedevtest.azurewebsites.net/";
const token = "7MgoynPHf5raP8BhstcQ3PT7nnbDjqyXSQsP8iTX";
const config = {
  headers:{
    'Authorization':`Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}
const api = {
  checkAPIHealth: ()=>{return axios.get(url+"v1/health", config)
  .then(response => {
      return response.data
  })
  .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
  });},


  getModelsList: () => {
    return axios.get(url+"v1/models", config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
  },
  getModelMetaData:(id)=>{
    return axios.get(url+"v1/models/"+id, config)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
  }
}

export default api