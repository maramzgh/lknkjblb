import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Chart from 'chart.js/auto';
import '../assets/Compare.css';
import { Link } from 'react-router-dom';


const Compare = ({ voilier }) => {
  const [sailboat1, setSailboat1] = useState('');
  const [sailboat2, setSailboat2] = useState('');
  const [sailboat1Data, setSailboat1Data] = useState(null);
  const [sailboat2Data, setSailboat2Data] = useState(null);
  const [sailboatOptions, setSailboatOptions] = useState([]);
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);

  useEffect(() => {
    // Fetch sailboat names from the server and update the options
    const fetchSailboatNames = async () => {
      try {
        const response = await fetch('http://localhost:5000/voiliers/names');
        const data = await response.json();
        setSailboatOptions(data.names);
      } catch (error) {
        console.log('Error fetching sailboat names:', error);
      }
    };

    fetchSailboatNames();
  }, []);

  
  useEffect(() => {
    if (sailboat1Data && sailboat2Data) {
      const ctx = chartRef1.current.getContext('2d');
  
      // Destroy the existing chart if it exists
      if (chartRef1.current.chart) {
        chartRef1.current.chart.destroy();
      }
  
      chartRef1.current.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Sailboat 1', 'Sailboat 2'],
          datasets: [
            {
              label: 'Visitors',
              data: [sailboat1Data.visitors, sailboat2Data.visitors],
              backgroundColor: [
                'rgba(13, 92, 117, 0.8)', // Blue
                'rgba(192, 192, 192, 0.8)', // Silver or Gray
              ],
              
              borderColor: [
                'rgba(13, 92, 117, 1)', // Blue
                'rgba(192, 192, 192, 1)', // Silver or Gray
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          width: 300,
          height: 300,
          plugins: {
            tooltip: {
              callbacks: {
                title: () => '', // Disable the default title
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: ${value} visitors`;
                },
              },
            },
          },
        },
      });
    }
  }, [sailboat1Data, sailboat2Data]);
  
  useEffect(() => {
    if (sailboat1Data && sailboat2Data) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy the existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Convert Length values to numeric format
      const sailboat1Length = parseFloat(sailboat1Data.Longueur);
      const sailboat2Length = parseFloat(sailboat2Data.Longueur);

      chartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Sailboat 1', 'Sailboat 2'],
          datasets: [
            {
              label: 'Length',
              data: [sailboat1Length, sailboat2Length],
              backgroundColor: [
                'rgba(13, 92, 117, 0.8)', // Blue
                'rgba(192, 192, 192, 0.8)', // Silver or Gray
              ],
              
              borderColor: [
                'rgba(13, 92, 117, 1)', // Blue
                'rgba(192, 192, 192, 1)', // Silver or Gray
              ],}
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          indexAxis: 'y', // Change the orientation of the chart
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [sailboat1Data, sailboat2Data]);


  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const sailboat1Data = await fetch(
        `http://localhost:5000/voiliers/name/${sailboat1}`
      );
      const sailboat2Data = await fetch(
        `http://localhost:5000/voiliers/name/${sailboat2}`
      );

      if (!sailboat1Data.ok || !sailboat2Data.ok) {
        throw new Error('Failed to fetch sailboat data');
      }

      const boat1Json = await sailboat1Data.json();
      const boat2Json = await sailboat2Data.json();

      // Store the fetched sailboat data in state
      setSailboat1Data(boat1Json);
      setSailboat2Data(boat2Json);

      // Reset the input fields
      setSailboat1('');
      setSailboat2('');
    } catch (error) {
      console.log('Error fetching sailboat data:', error);
    }
  };

  return (
    <div>
      <h2 className="title">Compare Sailboats</h2>
      <div className="Compare">
        <Form onSubmit={handleSearchSubmit}>
          <div>
            <Form.Group controlId="sailboat1">
              <Form.Label><strong>Sailboat 1:</strong></Form.Label>
              <Typeahead
                id="sailboat1Typeahead"
                options={sailboatOptions}
                selected={sailboat1 ? [sailboat1] : []}
                onChange={(selected) => setSailboat1(selected[0] || '')}
                onInputChange={(input) => setSailboat1(input)}
                placeholder="Search for a sailboat..."
              />
            </Form.Group>
          </div>

          <div>
            <Form.Group controlId="sailboat2">
              <Form.Label><strong>Sailboat 2:</strong></Form.Label>
              <Typeahead
                id="sailboat2Typeahead"
                options={sailboatOptions}
                selected={sailboat2 ? [sailboat2] : []}
                onChange={(selected) => setSailboat2(selected[0] || '')}
                onInputChange={(input) => setSailboat2(input)}
                placeholder="Search for a sailboat..."
              />
            </Form.Group>
          </div>

          <Button variant="primary" type="submit" className="compare-button">
            Compare
          </Button>
        </Form>
      </div>

      { sailboat1Data && sailboat2Data && (
      <div className="SailboatInfo">
        <Card
          style={{
            width: '20%',
          }}
          className="m-3 hover-shadow"
        >
          <Link
            to={`/voiliers/${sailboat1Data._id}`}
            className="link-no-decoration"
          >
            <Card.Img
              variant="top"
              src={require(`../y_imgs/${sailboat1Data.Image}`)}
              alt={sailboat1Data.Nom}
            />
          </Link>
          <Card.Title className="bold">Sailboat 1:</Card.Title>
          <Card.Text><span className="bold">Name:</span> {sailboat1Data.Nom}</Card.Text>
          <Card.Text><span className="bold">Price:</span> {sailboat1Data.Prix}</Card.Text>
        </Card>

        <Card
          style={{
            width: '20%',
          }}
          className="m-3 hover-shadow"
        >
          <Link
            to={`/voiliers/${sailboat2Data._id}`}
            className="link-no-decoration"
          >
            <Card.Img
              variant="top"
              src={require(`../y_imgs/${sailboat2Data.Image}`)}
              alt={sailboat2Data.Nom}
            />
          </Link>
          <Card.Title className="bold">Sailboat 2:</Card.Title>
          <Card.Text><span className="bold">Name:</span> {sailboat2Data.Nom}</Card.Text>
          <Card.Text><span className="bold">Price:</span> {sailboat2Data.Prix}</Card.Text>
        </Card>
      </div>
    )}

<div class="charts">
  {sailboat1Data && sailboat2Data && (
    <div>
      <h3 class="description-label">Number of Visitors for Each Sailboat</h3>
      <div id="lengthChartContainer">
        <canvas id="lengthChart" ref={chartRef1}></canvas>
      </div>
      <p>
        <span class="description-label">Description:</span>{" "}
        <span class="description-text">
          This graph compares the number of visitors for each sailboat. It provides insights into the popularity and interest of each sailboat among users.
        </span>
      </p>
    </div>
  )}
  {sailboat1Data && sailboat2Data && (
    <div>
      <h3 class="description-label">Difference in Length</h3>
      <div id="visitorsChartContainer">
        <canvas id="visitorsChart" ref={chartRef}></canvas>
      </div>
      <p>
        <span class="description-label">Description:</span>{" "}
        <span class="description-text">
          This graph illustrates the difference in length between the two sailboats. It highlights the variations in size and dimensions, which can impact sailing performance and handling.
        </span>
      </p>
    </div>
  )}
</div>



  </div>
);
};

export default Compare;