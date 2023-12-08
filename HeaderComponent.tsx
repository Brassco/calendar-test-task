/**
 * HeaderComponent - renders moth name and buttons Next and Prev for swithing between monthes
 * props:
 * monthName - moth selected by user
 * onHandleNext - this method fired when user press Next button
 * onHandlePrev - this method fired when user press Prev button
 */

//Interfaces
import {IHeaderComponent} from './interfaces';

const HeaderComponent = ({ monthName, onHandleNext, onHandlePrev }: IHeaderComponent) => {
  //Render
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerButton}>
        <TouchableOpacity onPress={onHandlePrev}>
          <Text> Prev </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerTitle}>
        <Text> {monthName} </Text>
      </View>
      <View style={styles.headerButton}>
        <TouchableOpacity onPress={onHandleNext}>
          <Text> Next </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
