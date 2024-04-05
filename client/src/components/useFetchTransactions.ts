import { useEffect, useState } from "react";

interface Transaction {
}

interface FetchTransactionsResult {
 transactions: Transaction[];
 totalPages: number;
 loading: boolean;
 error: Error | null;
}

const useFetchTransactions = (currentPage: number): FetchTransactionsResult => {
 const [transactions, setTransactions] = useState<Transaction[]>([]);
 const [totalPages, setTotalPages] = useState<number>();
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<Error | null>(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/transaction/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTransactions(jsonData);
        setTotalPages(1);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
 }, [currentPage]);

 return { transactions, totalPages, loading, error };
};

export default useFetchTransactions;
