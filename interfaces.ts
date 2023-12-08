export interface ICalendarComponent {
    selectedDate: Date,
    type: string, 
    onChangeMonth: () => void, 
    onDayPress: () => void,
}

export interface IDayComponent {
    day: Date, 
    currentMonth: Date, 
    selectedDay: Date,
    minDate: Date, 
    maxDate: Date,
}

export interface IHeaderComponent {
    monthName: string, 
    onHandleNext: () => void, 
    onHandlePrev: () => void,
}