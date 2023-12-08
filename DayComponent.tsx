/**
 * DayComponent - accept parameters day, currentMonth and according this parrameters
 * renders day cell for calendar
 * props:
 * day - day date
 * currentMonth - selected month
 * selectedDay - date of selected day by user
 */

//Interfaces
import { IDayComponent } from "./interfaces";

//Utils
import {
  inCurrentMonth,
  inPast,
  inRange,
  isFirstOrLastDay,
  dayIsEveryMonth,
  dayIsEveryWeek,
  getDate
} from "./utils";

const DayComponet = ({ day, currentMonth, selectedDay, minDate, maxDate }: IDayComponent) => {
  const currentDay = new Date();
  //State
  const [dayDate, setDayDate] = useState("");
  const [dayTitleStyle, setDayTitleStyle] = useState(styles.dayTitle);
  const [dayWrapperStyle, setDayWrapperStyle] = useState(styles.dayWrapper);

  useEffect(() => {
    /**
     * Convert Date obj into date string and set it to local state
     */
    const dayName = getDate(day);
    setDayDate(dayName);
    getStyles();
  }, [day]);

  //Methods
  const getStyles = () => {
    /**
     * If day not in current month
     */
    if (!inCurrentMonth(day, currentMonth)) {
      setDayTitleStyle(styles.dayNotInMonth);
    }
    /**
     * If day is in a past
     */
    if (inPast(day)) {
      setDayTitleStyle(styles.dayInPastTitle);
    }
    /**
     * if day is today
     */
    if (day.date === currentDay) {
      setDayTitleStyle(styles.dayCurrentTitle);
    }
    /**
     * If day is day selected by user
     */
    if (day.date === selectedDay) {
      setDayTitleStyle(styles.daySelectedTitle);
      setDayWrapperStyle(styles.daySelected);
    }
    /**
     * If type = 'period' and if day is range between minDate and maxDate
     * then we need to color this day cell
     */
    if (type === "period") {
      if (isFirstOrLastDay(day, minDate, maxDate)) {
        setDayTitleStyle(styles.daySelectedTitle);
        setDayWrapperStyle(styles.daySelected);
      } else if (inRange(day, minDate, maxDate)) {
        setDayWrapperStyle(styles.dayInRange);
      }
    }

    /**
     * If type = 'everyDay' and day is equel or more then selectedDate
     * then we need to color this day cell
     */
    if (type === "everyDay") {
      if (day.date == selectedDay) {
        setDayTitleStyle(styles.daySelectedTitle);
        setDayWrapperStyle(styles.daySelected);
      } else if (day.date > selectedDay) {
        setDayWrapperStyle(styles.dayInRange);
      }
    }

    /**
     * If type = 'everyWeek' we need colored selectedDate
     * and every sevens day after selectedDate in current month
     */
    if (type === "everyWeek") {
      if (dayIsEveryWeek(selectedDay)) {
        setDayWrapperStyle(styles.dayNextWeek);
      }
    }

    /**
     * If type = 'everyMoth' we need to colored this date in every month
     */
    if (type === "everyMonth") {
      if (dayIsEveryMonth(day.date)) {
        setDayWrapperStyle(styles.dayNextWeek);
      }
    }
  };

  //Render
  return (
    <View style={styles.dayContainer}>
      <View style={dayWrapperStyle}>
        <Text style={dayTitleStyle}> {dayDate} </Text>
      </View>
    </View>
  );
};
