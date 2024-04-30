import React, { useState } from 'react';
import EventList from './EventList';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const bodyStyle = {
        backgroundImage: `url('./calendar.png')`,
        backgroundSize: 'cover',
    };

    return (
        <>
        <br></br> <br></br><br></br> <br></br>
        <div style={bodyStyle}>
            <table bgcolor="lightgrey" align="center" cellSpacing="21" cellPadding="21">
                <caption align="top">April</caption>
                <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td onClick={() => handleDateClick("2024-04-01")}>1</td>
                        <td onClick={() => handleDateClick("2024-04-02")}>2</td>
                    </tr>
                    <tr></tr>
                    <tr>
                        <td onClick={() => handleDateClick("2024-04-03")}>3</td>
                        <td onClick={() => handleDateClick("2024-04-04")}>4</td>
                        <td onClick={() => handleDateClick("2024-04-05")}>5</td>
                        <td onClick={() => handleDateClick("2024-04-06")}>6</td>
                        <td onClick={() => handleDateClick("2024-04-07")}>7</td>
                        <td onClick={() => handleDateClick("2024-04-08")}>8</td>
                        <td onClick={() => handleDateClick("2024-04-09")}>9</td>
                    </tr>
                    <tr>
                        <td onClick={() => handleDateClick("2024-04-10")}>10</td>
                        <td onClick={() => handleDateClick("2024-04-11")}>11</td>
                        <td onClick={() => handleDateClick("2024-04-12")}>12</td>
                        <td onClick={() => handleDateClick("2024-04-13")}>13</td>
                        <td onClick={() => handleDateClick("2024-04-14")}>14</td>
                        <td onClick={() => handleDateClick("2024-04-15")}>15</td>
                        <td onClick={() => handleDateClick("2024-04-16")}>16</td>
                    </tr>
                    <tr>
                        <td onClick={() => handleDateClick("2024-04-17")}>17</td>
                        <td onClick={() => handleDateClick("2024-04-18")}>18</td>
                        <td onClick={() => handleDateClick("2024-04-19")}>19</td>
                        <td onClick={() => handleDateClick("2024-04-20")}>20</td>
                        <td onClick={() => handleDateClick("2024-04-21")}>21</td>
                        <td onClick={() => handleDateClick("2024-04-22")}>22</td>
                        <td onClick={() => handleDateClick("2024-04-23")}>23</td>
                    </tr>
                    <tr>
                        <td onClick={() => handleDateClick("2024-04-24")}>24</td>
                        <td onClick={() => handleDateClick("2024-04-25")}>25</td>
                        <td onClick={() => handleDateClick("2024-04-26")}>26</td>
                        <td onClick={() => handleDateClick("2024-04-27")}>27</td>
                        <td onClick={() => handleDateClick("2024-04-28")}>28</td>
                        <td onClick={() => handleDateClick("2024-04-29")}>29</td>
                        <td onClick={() => handleDateClick("2024-04-30")}>30</td>
                    </tr>
                    <tr>
                        <td onClick={() => handleDateClick("2024-04-31")}>31</td>
                        <td onClick={() => handleDateClick("2024-05-01")}>1</td>
                        <td onClick={() => handleDateClick("2024-05-02")}>2</td>
                        <td onClick={() => handleDateClick("2024-05-03")}>3</td>
                        <td onClick={() => handleDateClick("2024-05-04")}>4</td>
                        <td onClick={() => handleDateClick("2024-05-05")}>5</td>
                        <td onClick={() => handleDateClick("2024-05-06")}>6</td>
                    </tr>
                </tbody>
            </table>
        </div>
        {selectedDate && <EventList date={selectedDate} />}
        </>
    );
}

export default Calendar;