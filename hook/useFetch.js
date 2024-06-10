import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(endpoint, query) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: {
      ...query,
    },
    headers: {
      "x-rapidapi-key": "ff1f6d8fc6mshaebc82378763338p1bacf7jsnecbf8704c176",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
}
