import React, { useState, useEffect } from "react";

//Components
import DayComponent from "./DayCompnent";
import HeaderComponent from "./HeaderComponent";

//Interfaces
import { ICalendarComponent } from "./interfaces";

//Utils
import { getMonthName, getMonthFromDate, getNextMonth, getPrevMonth, getDays } from "./utils";

/**
 * CalendarComponent render main calendar container
 * props:
 * selectedDay - day selected by user
 * type - type of calendar selected in Settings (everyDay, everyWeek, everyMonth, period, lastDayofMonth, onceAtMonth)
 * onChangeMonth - method is fired when user change month,
 * onDayPress - method is fired when user press on day
 */
const CalendarComponent = ({
  selectedDate,
  type,
  onChangeMonth,
  onDayPress,
}: ICalendarComponent) => {
  //State
  const [currentMonth, setCurrentMonth] = useState(
    getMonthFromDate(selectedDate)
  );
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  //Methods
  /**
   * onHandleNext - this method fired when user press Next button in header
   * in this method we get next month after currentMonth save it into state with method setCurrentMonth
   * if in props we have method nextMonth we run it
   */
  const onHandleNext = () => {
    const nextMonth = getNextMonth(currentMonth);
    if (onChangeMonth) {
      onChangeMonth(nextMonth);
    }
    setCurrentMonth(nextMonth);
  };

  /**
   * onHandlePrev - this method fired when user press Prev button in header
   * in this method we get prev month from currentMonth save it into state with method setCurrentMonth
   * if in props we have method nextMonth we run it
   */
  const onHandlePrev = () => {
    const prevMonth = getPrevMonth(currentMonth);
    if (onChangeMonth) {
      onChangeMonth(prevMonth);
    }
    setCurrentMonth(prevMonth);
  };

  /**
   * onHandleDayPress - fired when user pess on day cell
   *
   */
  const onHandleDayPress = (day) => {
    if (type === "period") {
      if (!maxDate && !minDate) {
        setMinDate(day);
      } else if (minDate && !maxDate) {
        setMaxDate(day);
      }
    } else {
      onDayPress(day);
    }
  };
  /**
   * renderMonth - get array of days for selected month,
   * run through this array and generate new array 'weeks' with chanks of days (7 days in each chunk),
   * Method call another method 'renderWeek' for each chunk
   * return array of week components
   */
  const renderMonth = () => {
    const days = getDays(currentMonth);
    const weeks = [];
    while (days.length) {
      weeks.push(renderWeek(days.splice(0, 7), weeks.length));
    }
    return <View style={style.monthView}>{weeks}</View>;
  };

  /**
   * renderWeek - accept array of days 'weekDays'
   * run through thi array 'weekDays' and generate new array 'week'
   * for each 'day' run 'renderDay' to get DayComponent
   * Return array of day componentns
   */
  const renderWeek = (weekDays) => {
    const week = [];
    weekDays.forEach((day) => {
      week.push(renderDay(day));
    }, this);

    return week;
  };

  /**
   * renderDay - accept parameter 'day' and pass it into DayComponent
   * Return DayComponent
   */
  const renderDay = (day) => {
    return (
      <DayComponent
        day={day}
        month={currentMonth}
        type={type}
        onDayPress={onHandleDayPress}
        minDate={minDate}
        maxDate={maxDate}
      />
    );
  };

  /**
   * renderDay - render header component
   * Return HeaderComponent
   */
  const renderHeader = () => {
    return (
      <HeaderComponent
        month={getMonthName(currentMonth)}
        onHandleNext={onHandleNext}
        onHandlePrev={onHandlePrev}
      />
    );
  };

  return (
    <View style={styles.calendarContainer}>
      {renderHeader()}
      {renderMonth()}
    </View>
  );
};
