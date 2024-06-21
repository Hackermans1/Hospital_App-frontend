import React, { useState, useEffect } from 'react';
import './Inventory.css';
import axios from 'axios';
import * as XLSX from 'xlsx';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [inputValues, setInputValues] = useState({});

  const getInventoryData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`https://hospital-app-backend-1.onrender.com/getinventorydata`, {
        headers: {
          'Authorization': `${token}`
        }
      });
      if (response && Array.isArray(response.data)) {
        setInventory(response.data);
      } else {
        setInventory([]);
      }
    } catch (error) {
      alert('Error fetching inventory data');
      setInventory([]);
    }
  };

  useEffect(() => {
    getInventoryData();
  }, []);

  const handleAdd = async(index) => {
    const addQuantity = parseInt(inputValues[index]?.add_quantity || '0', 10);
    if (isNaN(addQuantity) || addQuantity <= 0) {
      alert('Please enter a valid quantity to add');
      return;
    }

    const updatedInventory = [...inventory];
    updatedInventory[index].available_quantity = parseInt(updatedInventory[index].available_quantity, 10) + addQuantity;

    setInventory(updatedInventory);

    const token = localStorage.getItem('authToken');
    await axios.patch(`https://hospital-app-backend-1.onrender.com/updateinventory`, updatedInventory[index], {
      headers: {
        'Authorization': `${token}`
      }
    });
    alert("added");
  };

  const handleRemove = async(index) => {
    const removeQuantity = parseInt(inputValues[index]?.remove_quantity || '0', 10);
    if (isNaN(removeQuantity) || removeQuantity <= 0) {
      alert('Please enter a valid quantity to remove');
      return;
    }

    const updatedInventory = [...inventory];
    if (updatedInventory[index].available_quantity - removeQuantity < 0) {
      alert('Quantity cannot be negative');
      return;
    } else {
      updatedInventory[index].available_quantity = parseInt(updatedInventory[index].available_quantity, 10) - removeQuantity;
    }

    setInventory(updatedInventory);

    const token = localStorage.getItem('authToken');
    await axios.patch(`https://hospital-app-backend-1.onrender.com/updateinventory`, updatedInventory[index], {
      headers: {
        'Authorization': `${token}`
      }
    });
    alert("removed");
  };

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(inventory);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inventory');
    XLSX.writeFile(wb, 'inventory.xlsx');
  };

  const handleImport = async(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);
      setInventory(jsonData);

      const token = localStorage.getItem('authToken');
      await axios.post(`https://hospital-app-backend-1.onrender.com/bulkinventory`, {data:jsonData}, {
        headers: {
          'Authorization': `${token}`
        }
      });
      alert("Data imported successfully");
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="inventory">
      <h1>Inventory</h1>
      <div className="action-buttons">
        <button className='exportbutton' onClick={handleExport}>Export</button>
        <label className="custom-file-upload">
          <input type="file" accept=".xlsx" onChange={handleImport} />
          Import
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Add Quantity</th>
            <th>Remove Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.medicine_name}</td>
              <td>{item.available_quantity}</td>
              <td>
                <input
                  type="number"
                  name='add_quantity'
                  value={inputValues[index]?.add_quantity || ''}
                  onChange={(e) => setInputValues({ ...inputValues, [index]: { ...inputValues[index], add_quantity: e.target.value } })}
                />
                <button onClick={() => handleAdd(index)}>Add</button>
              </td>
              <td>
                <input
                  type="number"
                  name='remove_quantity'
                  value={inputValues[index]?.remove_quantity || ''}
                  onChange={(e) => setInputValues({ ...inputValues, [index]: { ...inputValues[index], remove_quantity: e.target.value } })}
                />
                <button onClick={() => handleRemove(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
