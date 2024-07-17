import logo from './logo_user.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import csvFilePath from './data.csv'; // Ensure this path is correct

const App = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    Wann: '',
    Testuser: '',
    AnzahlDerTestuser: '',
    Ziel: '',
    Setting: ''
  });

  useEffect(() => {
    fetch(csvFilePath)
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            setData(results.data);
          }
        });
      });
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredData = data.filter(item => {
    return Object.keys(filters).every(key => {
      return filters[key] === '' || item[key] === filters[key];
    });
  });

  const uniqueValues = (key) => {
    return [...new Set(data.map(item => item[key]))];
  };

  return (
    <div className="custom-container container my-h5">
      <div className="header-container">
        <img src={logo} alt="" width={75} height={100} />
        <h1>Find your User-Test</h1>
      </div>
      <div className="row">
        <div className="col-md-2">
          <div className="mb-3">
            <label htmlFor="wann_dropdown" className="form-label">When am I doing user tests (during, at benchmarks or at the end of development)?</label>
            <select id="wann_dropdown" name="wann_dropdown" className="form-select" onChange={handleFilterChange}>
              <option value=""> - </option>
              {uniqueValues('wann_dropdown').map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="testuser_dropdown" className="form-label">Who is the user group (demographical, social, educational, gender, mixture)?</label>
            <select id="testuser_dropdown" name="testuser_dropdown" className="form-select" onChange={handleFilterChange}>
              <option value=""> - </option>
              {uniqueValues('testuser_dropdown').map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="testuser_anzahl_dropdown" className="form-label">How large should be my test-user group?</label>
            <select id="testuser_anzahl_dropdown" name="testuser_anzahl_dropdown" className="form-select" onChange={handleFilterChange}>
              <option value=""> - </option>
              {uniqueValues('testuser_anzahl_dropdown').map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Ziel" className="form-label">What is the aim of the user testing?</label>
            <select id="Ziel" name="Ziel" className="form-select" onChange={handleFilterChange}>
              <option value=""> - </option>
              {uniqueValues('Ziel').map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="Setting" className="form-label">Where will you do the user testing?</label>
            <select id="Setting" name="Setting" className="form-select" onChange={handleFilterChange}>
              <option value=""> - </option>
              {uniqueValues('Setting').map(value => <option key={value} value={value}>{value}</option>)}
            </select>
          </div>
        </div>
        <div className="col-md-10">
          <div className="table-responsive table-scroll ">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Testart</th>
                  <th>Wann</th>
                  <th>Testuser</th>
                  <th>Anzahl der Testuser</th>
                  <th>Ziel</th>
                  <th>Rückmeldung</th>
                  <th>Skala</th>
                  <th>Zeit pro Teilnehmer</th>
                  <th>Setting</th>
                  <th>Links</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Testart}</td>
                    <td>{item.Wann}</td>
                    <td>{item.Testuser}</td>
                    <td>{item['Anzahl der Testuser']}</td>
                    <td>{item.Ziel}</td>
                    <td>{item.Rückmeldung}</td>
                    <td>{item.Skala}</td>
                    <td>{item['Zeit pro Teilnehmer']}</td>
                    <td>{item.Setting}</td>
                    <td>{item.Literatur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
