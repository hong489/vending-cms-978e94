import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Chart } from "primereact/chart";
import { Divider } from "primereact/divider";

const Kanban = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Hard-coded chart data
    const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    // Hard-coded chart options
    const options = {
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="col-12 flex flex-column align-items-center">
      <div className="flex w-10">
        <div className="w-12">
          <div className="w-full flex justify-content-center flex-wrap">
            <div className="col-12 w-8 lg:col-6 xl:col-4">
              <div
                className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom"
                style={{ height: "20rem" }}
              >
                <div className="text-900 font-medium text-lg">
                  Active Report/ maintenance rate
                </div>
              </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
              <div
                className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom"
                style={{ height: "20rem" }}
              >
                <div className="text-900 font-medium text-lg">
                  Latest Report
                </div>
              </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
              <div
                className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom"
                style={{ height: "25rem" }}
              >
                <div className="text-900 font-medium text-lg">
                  Service rate by location
                  <Chart type="bar" data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
              <div
                className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom"
                style={{ height: "25rem" }}
              >
                <div className="text-900 font-medium text-lg">
                  Service rate by model
                </div>
                <Chart type="line" data={chartData} options={chartOptions} />
              </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-4">
              <div
                className="card mb-0 flex flex-column align-items-center justify-content-center hover zoom"
                style={{ height: "15rem" }}
              >
                <div className="text-900 font-medium text-lg">
                  Report rate by location
                </div>
                <Divider type="solid" />
                Selangor
                <Divider type="dashed" />
                penang
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect()(Kanban);
