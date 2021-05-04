import React, { Component } from 'react';
import { Row, InputGroup, FormControl } from 'react-bootstrap';
import {DateTime} from 'luxon';

class BonusCalculator extends Component {
    state = {
        currentDate: DateTime.now().set({hour: 0, minute: 0}),
        firstDate: DateTime.now().startOf('year'),
        dates: [],
        bookedDays: 0,

        cutOffDate: new Date(),
        publicHolidays: [
            new Date('2021-01-01'),
            new Date('2021-04-02'),
            new Date('2021-05-03'),
            new Date('2021-05-31'),
            new Date('2021-08-30'),
            new Date('2021-12-27'),
            new Date('2021-12-28')
        ]
    }

    componentDidMount = () => {
        for (let i = 0; i < this.getDaysInYear(this.state.currentDate); i++) {
            let date = this.state.firstDate.plus({days: i})
            this.state.dates.push({
                date: date,
                weekDay: date.getDay() >= 1 && date.getDay() <= 5,
                publicHoliday: this.state.publicHolidays.findIndex(item => item.toString() === date.toString()) >= 0
            }
            );
        }
    }

    getDaysInYear = (date) => {
        let year = date.getFullYear();
        if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
            return 366;
        } else {
            return 365;
        }
    }

    getWorkingDaysLeft = () => {
        let result = this.state.dates.filter((value) => {
            return value.date > this.state.currentDate && value.weekDay && !value.publicHoliday;
        });
        return result.length;
    }

    getCutOffDate = (bookedDays) => {
        let remainingDays = [];
        let dateList = this.state.dates;
        dateList.forEach(item => {
            remainingDays.push({
                date: item.date,
                isPossible: (this.getWorkingDaysLeft() + bookedDays) > 156
            });
        });
        let result = new Date();
        if (remainingDays.find(value => !value.isPossible)) {
            result.setDate(remainingDays.find(value => !value.isPossible).date.getDate() - 1);
        }
        console.log(result.getDate());
        return result;
    }

    handleBookedDaysChange = (bookedDays) => {
        this.setState({
            bookedDays: bookedDays,
            cutOffDate: this.getCutOffDate(bookedDays)
        });
    }

    render() {
        return (<Row>
            <InputGroup>
                <InputGroup.Prepend>
                    <InputGroup.Text>Booked Days</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl 
                    placeholder='0' 
                    onChange={(e) => this.handleBookedDaysChange(e.target.value)} 
                    type='number'
                />
            </InputGroup>
            <h1>{this.state.cutOffDate.toString()}</h1>
        </Row>);
    }
}

export default BonusCalculator;