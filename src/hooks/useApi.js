import { useEffect, useState } from 'react';
import axios from 'axios';

const useApi = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData);
    const [url, setUrl] = useState(initialUrl);
    const [isLoading, setIsLoading] = useState(!!initialUrl);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const source = axios.CancelToken.source();
        const fetchData = async () => {
            setIsError(false);
            setError(null);
            setIsLoading(true);

            try {
                const result = await axios(url);
                setData(result.data);
                setIsLoading(false);
            } catch (e) {
                setError(e.response);
                setIsError(true);
            }
        };

        if (url) {
            fetchData();
        }

        return () => {
            source.cancel('Cancelling in cleanup');
        };
    }, [url]);

    return [{ data, isLoading, isError, error }, setUrl];
};

export default useApi;