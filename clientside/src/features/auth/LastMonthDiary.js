import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { useGetDiseasesQuery } from '../disease/diseasesApiSlice';

const LastMonthDiary = () => {
  const [dailyCounts, setDailyCounts] = useState({});

  // Fetch diseases from the API
  const { data: diseases = [], error, isLoading } = useGetDiseasesQuery();

  useEffect(() => {
    if (diseases.length > 0) {
      // Calculate the date one month ago
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      // Filter diseases that occurred within the last month
      const diseasesLastMonth = diseases.filter(disease => new Date(disease.datePositive) >= oneMonthAgo);

      // Group diseases by day
      const counts = diseasesLastMonth.reduce((acc, disease) => {
        const date = new Date(disease.datePositive).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      setDailyCounts(counts);
    }
  }, [diseases]);

  useEffect(() => {
    // Draw chart once dailyCounts are updated
    if (Object.keys(dailyCounts).length > 0) {
      const ctx = document.getElementById('diseaseChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: Object.keys(dailyCounts),
          datasets: [{
            label: 'Number of Diseases',
            data: Object.values(dailyCounts),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }, [dailyCounts]);

  return (
    <div>
      <h2>Last Month's Disease Diary</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : Object.keys(dailyCounts).length === 0 ? (
        <p>No diseases recorded in the last month.</p>
      ) : (
        <canvas id="diseaseChart" width="400" height="200"></canvas>
      )}
    </div>
  );
};

export default LastMonthDiary;
