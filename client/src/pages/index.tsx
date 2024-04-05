/* eslint-disable jsx-a11y/anchor-is-valid */
import { Table, useTheme } from "flowbite-react";
import { useEffect, type FC, useState, useRef } from "react";
import Chart from "react-apexcharts";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";

const DashboardPage: FC = function () {
  return (
    <NavbarSidebarLayout>
      <div className="px-4 pt-6">
        <SalesThisWeek />
        <div className="my-6">
          <CategoriesPie />
          <LatestTransactions />
        </div>
        <LatestCustomers />
        <div className="my-6">
          <AcquisitionOverview />
        </div>
      </div>
    </NavbarSidebarLayout>
  );
};


const SalesThisWeek: FC = function () {
  const [chartData, setChartData] = useState({});
  const [totalSales, setTotalSales] = useState(0);
 
  useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch("http://localhost:5000/dailystats");
         if (!response.ok) {
           throw new Error("Failed to fetch data");
         }
         const data = await response.json();
 
         if (Array.isArray(data)) {
          data.forEach(item => {
            const dateParts = item.ds.split("/");
            item.date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1]);
          });
  
          data.sort((a, b) => b.date - a.date);
  
          const lastSevenRecords = data.slice(0, 7);
  
          const latestSevenDates = lastSevenRecords.map(item => {
            const formattedDate = item.date;
            const month = formattedDate.toLocaleString("en-US", { month: "long" });
            const day = formattedDate.getDate();
            return `${month} ${day}`;
          });
  
          const latestSevenYValues = lastSevenRecords.map(item => item.y);

          latestSevenDates.reverse();
          latestSevenYValues.reverse();

          const total = latestSevenYValues.reduce((acc, val) => acc + val, 0);
          setTotalSales(total);
  
 
           setChartData({
             categories: latestSevenDates,
             series: [{ name: "Revenue", data: latestSevenYValues, color: "#1A56DB" }],
           });
         } else {
           console.error("Invalid response data format:", data);
         }
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };
 
     fetchData();
  }, []);
 
  return (
     <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
       <div className="mb-4 flex items-center justify-between">
         <div className="shrink-0">
           <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
             {totalSales.toFixed(2)} MAD
           </span>
           <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
             Sales this week
           </h3>
         </div>
         <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
          {((totalSales/4500)-1).toFixed(2)}%
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
       </div>
       <SalesChart chartData={chartData} />
       <div className="mt-5 flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <div className="shrink-0">
          <a
            href="/ai-analysis"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            Sales Predictions
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
     </div>
  );
 };


 const SalesChart: FC<{ chartData: any }> = function ({ chartData }) {
  const { mode } = useTheme();
  const isDarkTheme = mode === "dark";

  const borderColor = isDarkTheme ? "#374151" : "#F3F4F6";
  const labelColor = isDarkTheme ? "#93ACAF" : "#6B7280";
  const opacityFrom = isDarkTheme ? 0 : 1;
  const opacityTo = isDarkTheme ? 0 : 1;


  const options: ApexCharts.ApexOptions = {
    stroke: {
      curve: "smooth",
    },
    chart: {
      type: "area",
      fontFamily: "Inter, sans-serif",
      foreColor: labelColor,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom,
        opacityTo,
        type: "vertical",
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontSize: "14px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      show: true,
      borderColor: borderColor,
      strokeDashArray: 1,
      padding: {
        left: 35,
        bottom: 15,
      },
    },
    markers: {
      size: 5,
      strokeColors: "#ffffff",
      hover: {
        size: undefined,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: chartData.categories || [],
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
      },
      axisBorder: {
        color: borderColor,
      },
      axisTicks: {
        color: borderColor,
      },
      crosshairs: {
        show: true,
        position: "back",
        stroke: {
          color: borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [labelColor],
          fontSize: "14px",
          fontWeight: 500,
        },
        formatter: function (value) {
          return value + ' DH';
        },
      },
    },
    legend: {
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: [labelColor],
      },
      itemMargin: {
        horizontal: 10,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: {
              show: false,
            },
          },
        },
      },
    ],
  };
  const series = chartData.series || [];

  return <Chart height={420} options={options} series={series} type="area" />;
};

const CategoriesPie: FC = function () {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new ApexCharts(chartRef.current, getChartOptions());
      chart.render();

      const checkboxes = document.querySelectorAll('#devices input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', (event) => handleCheckboxChange(event, chart));
      });
    }
  }, []);

  const getChartOptions = () => {
    return {
      series: [35, 23, 2, 5],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: "Total Products",
                fontFamily: "Inter, sans-serif",
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  return sum;
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: function (value) {
                  return value + "k";
                },
              },
            },
            size: "80%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: ["Laptops", "Smart Phones", "Accessories", "Bags"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return value + "k";
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return value + "k";
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex justify-center items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1">Products by Category</h5>
        </div>
        <div>
        </div>
      </div>
      <div>
        <div className="flex" id="devices">
        </div>
      </div>
      <div className="py-6" id="donut-chart" ref={chartRef}></div>
      <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
        <div className="flex justify-between items-center pt-5">
        </div>
      </div>
    </div>
  );
};

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const options = { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  };
  return dateObject.toLocaleDateString('en-US', options);
};

const LatestCustomers: FC = function () {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/user/latest');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setUsers(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="mb-4 h-full rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Latest Customers
        </h3>
        <a
          href="/users"
          className="inline-flex items-center rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
        >
          View all
        </a>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {users.map((user) => (
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/user.png"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-medium text-gray-900 dark:text-white">
                
              <p className="truncate text-sm text-gray-500 dark:text-gray-400">Joined &nbsp;</p>
                {formatDate(user.createdAt)}
              </div>
            </div>
          </li>
        ))}
        </ul>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 pt-3 dark:border-gray-700 sm:pt-6">
        <p />
        <div className="shrink-0">
          <a
            href="/users"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            All Users
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

const AcquisitionOverview: FC = function () {
  return (
    <></>
  );
};



const LatestTransactions: FC = function () {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/transaction/latest');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTransactions(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const TransactionStatusBadge = ({ status }) => {
    let badgeColor = '';

    switch (status) {
        case 'Failed':
            badgeColor = 'bg-red-100 text-red-800 dark:text-gray-200 dark:bg-red-700';
            break;
        case 'Completed':
            badgeColor = 'bg-green-100 text-green-800 dark:text-gray-200 dark:bg-green-700';
            break;
        case 'In Progress':
            badgeColor = 'bg-purple-100 text-purple-800 dark:text-gray-200 dark:bg-purple-700';
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


  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Latest Transactions
          </h3>
          <span className="text-base font-normal text-gray-600 dark:text-gray-400">
            This is a list of latest transactions
          </span>
        </div>
        <div className="shrink-0">
          <a
            href="/transactions"
            className="rounded-lg p-2 text-sm font-medium text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
          >
            View all
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="overflow-x-auto rounded-lg">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow sm:rounded-lg">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-50 dark:bg-gray-700">
                  <Table.HeadCell>Transaction</Table.HeadCell>
                  <Table.HeadCell>Date &amp; Time</Table.HeadCell>
                  <Table.HeadCell>Amount</Table.HeadCell>
                  <Table.HeadCell>Status</Table.HeadCell>
                </Table.Head>
                <Table.Body className="bg-white dark:bg-gray-800">
                  
                  {transactions.map((transaction) => (
                  <Table.Row>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      {transaction.type} to 
                      <span className="font-semibold"> {transaction.party}</span>
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
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 sm:pt-6">
        <p />
        <div className="shrink-0">
          <a
            href="/transactions"
            className="inline-flex items-center rounded-lg p-2 text-xs font-medium uppercase text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700 sm:text-sm"
          >
            All Transactions
            <svg
              className="ml-1 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
