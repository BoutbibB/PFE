import {
  Table,
} from "flowbite-react";
import { type FC} from "react";
import useFetchTransactions from "./useFetchTransactions";

interface AllTransactionsTableProps {
  search: string;
}


const AllTransactionsTable: FC<AllTransactionsTableProps> = function ({search}) {
  const { transactions, loading, error } = useFetchTransactions();

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return dateObject.toLocaleDateString('en-US', options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) { 
    return <div>Error: {error.message}</div>;
  }

  const TransactionStatusBadge = ({ status }) => {
    let badgeColor = '';

    switch (status) {
        case 'Failed':
            badgeColor = 'bg-red-100 text-red-800 dark:bg-red-500';
            break;
        case 'Completed':
            badgeColor = 'bg-green-100 text-green-800 dark:bg-green-500';
            break;
        case 'In Progress':
            badgeColor = 'bg-purple-100 text-purple-800 dark:bg-purple-500';
            break;
        default:
            badgeColor = 'bg-blue-100 text-blue-800';
    }

    return (
        <span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:text-gray-300 ${badgeColor}`}>
            {status}
        </span>
    );
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.party.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
        <div>
          <Table
            striped
            className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
          >
            <Table.Head className="bg-gray-50 dark:bg-gray-700">
              <Table.HeadCell>Transaction</Table.HeadCell>
              <Table.HeadCell>Date &amp; Time</Table.HeadCell>
              <Table.HeadCell>Amount</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
            </Table.Head>
            <Table.Body className="bg-white dark:bg-gray-800">
              {filteredTransactions.map((transaction) => (
                <Table.Row key={transaction.id}>
                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                    {transaction.type} to {transaction.party}
                    <span className="font-semibold"># {transaction.id}</span>
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap p-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {transaction.amount} MAD
                  </Table.Cell>
                  <Table.Cell className="flex whitespace-nowrap p-4">
                    <TransactionStatusBadge status={transaction.status} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AllTransactionsTable;
