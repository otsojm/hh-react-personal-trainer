import React, { useState, useEffect } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import MateriUIDrawer from './Drawer';

function Calendar() {
    const [training, setTraining] = useState([]);

    const fetchTrainingData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings').then(async response => {

            try {

                const data = await response.json()
                const trainingArray = [];

                data.forEach(training => {
                    const title = training.activity + " (" + training.duration + " min) " + training.customer.firstname + " " + training.customer.lastname;

                    const date = new Date(training.date);
                    
                    date.setHours( parseInt(date.getHours() - 2), date.getMinutes(), date.getSeconds(), date.getMilliseconds() );

                    const trainingEvent = { title: title, date: date };

                    trainingArray.push(trainingEvent);
                })

                setTraining(trainingArray);
            } catch (error) {
                console.log(error);
            }
        })
    }

    useEffect(() => {
        fetchTrainingData();
    }, []);

    return (
        <div>
            <MateriUIDrawer />
            <FullCalendar
                plugins={[dayGridPlugin]}
                headerToolbar={{
                    left: "today,prev,next",
                    center: "title",
                    right: "dayGridDay,dayGridWeek,dayGridMonth"
                }}
                eventDisplay='block'
                events={training}
            />
        </div>
    );
}

export default Calendar;
