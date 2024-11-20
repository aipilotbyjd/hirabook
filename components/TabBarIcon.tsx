import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) => {
  return <FontAwesome5 size={24} style={styles.tabBarIcon} {...props} />;
};

const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
