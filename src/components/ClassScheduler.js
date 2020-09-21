import React, {useState} from 'react';
import {fade, Paper, Typography, withStyles} from '@material-ui/core';
import {
    Scheduler,
    WeekView,
    Appointments,
    AppointmentTooltip,
    AppointmentForm, DayView, ViewSwitcher, MonthView, Toolbar
} from '@devexpress/dx-react-scheduler-material-ui';
import {ViewState} from "@devexpress/dx-react-scheduler";

const schedulerData = [
    {startDate: '2020-07-23T09:45', endDate: '2020-07-23T11:00', title: 'Meeting'},
    {startDate: '2020-07-23T12:00', endDate: '2020-07-23T13:30', title: 'Go to a gym'},
    {startDate: '2020-07-25T08:45', endDate: '2020-07-25T10:00', title: 'Meeting'},
    {startDate: `2020-07-25T12:00`, endDate: `2020-07-25T13:30`, title: 'Go to a gym'},
];


const ClassScheduler = () => {
    const classes = useState();


    return (
        <Paper style={{height:"calc(100vh - 370px)"}}>
            <Scheduler
                data={schedulerData}
            >
                <ViewState
                    defaultCurrentDate={'2020-07-25'}
                    defaultCurrentViewName="Week"
                />
                <WeekView
                    startDayHour={8}
                    endDayHour={18}

                />
                <MonthView/>
                <DayView
                    startDayHour={8}
                    endDayHour={18}

                />
                <Toolbar/>
                <ViewSwitcher/>
                <Appointments/>
                <AppointmentTooltip
                    showCloseButton
                    showOpenButton

                />
                <AppointmentForm
                    readOnly
                />

            </Scheduler>
        </Paper>
    );
};

export default ClassScheduler;