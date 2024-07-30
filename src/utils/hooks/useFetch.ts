import { useState, useEffect, useCallback, use } from "react";

// Custom hook
export default function useCustomFetch<T>(url: string, options: RequestInit = {}): { data: T | null, error: any, loading: boolean, fetchData: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(baseUrl + url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, url, options]);

  useEffect(() => {
    console.log('Fetching data from:', baseUrl + url);
    if (url) {
      fetchData();
    }
  }, [url]);  

  return { data, error, loading, fetchData };
}

// Helper functions for different request types
export const useGet = <T>(url: string, options?: RequestInit): { data: T | null, error: any, loading: boolean } =>
  useCustomFetch<T>(url, { ...options, method: "GET" });

export const usePost = <T>(url: string, body: any, options: RequestInit = {}, fetchData: () => void): { data: T | null, error: any, loading: boolean, fetchData: () => void } =>
  useCustomFetch<T>(url, {
    ...options,
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", ...options.headers },
  });

export const usePut = <T>(url: string, body: any, options: RequestInit = {}): { data: T | null, error: any, loading: boolean } =>
  useCustomFetch<T>(url, {
    ...options,
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", ...options.headers },
  });

export const useDelete = <T>(url: string, options: RequestInit = {}): { data: T | null, error: any, loading: boolean } =>
  useCustomFetch<T>(url, { ...options, method: "DELETE" });


export const useFetch = <T>(url: string): { data: T | null, loading: boolean, error: any } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

  useEffect(() => {
    if (!url) {
      setError('URL is required');
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl + url, {headers});
        console.log(baseUrl + url)
        if (!response.ok) {
          throw new Error('Could not fetch the data for that resource');
        }
        const data = await response.json();
        setData(data);
        setError(null);
      } catch (err: any) {
        console.log(err.message ?? err.error ?? err);
        setError(err.message ?? err.error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, baseUrl]);

  return { data, loading, error };
};

