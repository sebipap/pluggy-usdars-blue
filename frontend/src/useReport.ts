import useSWR from "swr";
import { api } from "./config";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useReport = () => {
  const { data, error } = useSWR(`${api}/latestreport`, fetcher, { refreshInterval: 15000 });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};


