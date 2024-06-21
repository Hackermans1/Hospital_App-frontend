import React, { useState, useEffect } from 'react';
import './SelectDate.css';
import BookNow from '../bookNow/BookNow';

const SelectDate = ({ id, email }) => {
  const [selectedBookNow, setSelectedBookNow] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    const next6Days = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return date;
    });

    setDates(next6Days);
    setSelectedDate(today.toLocaleDateString().split('T')[0]);
  }, []);

  const showSlots = (date, index) => {
    setSelectedDate(date.toLocaleDateString().split('T')[0]);
    setSelectedBookNow((prevSelected) => {
      const isSelected = prevSelected.includes(index);
      return isSelected ? prevSelected.filter((selected) => selected !== index) : [...prevSelected, index];
    });
  };

  return (
    <div className='selectdate'>
      {dates.map((date, index) => (
        <div key={index} className='selectdate1'>
          <div>
            <button
              className={`selectdatebutton ${selectedDate === date.toLocaleDateString().split('T')[0] ? 'active' : ''}`}
              onClick={() => showSlots(date, index)}
            >
              {date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                timeZone: 'Asia/Kolkata',
              })}
            </button>
          </div>
        </div>
      ))}
      <div className='timingcss'>
        {selectedBookNow.length > 0 && <BookNow date={selectedDate} id={id} email={email} />}
      </div>
    </div>
  );
};

export default SelectDate;
