import React, {useEffect} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';
import RemoteData from './RemoteData';
import LocalData from './LocalData';
import {BackHandler, ToastAndroid, useWindowDimensions} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Realm from 'realm';
import {REALM_PATH, SCHEMA_LIST} from './Schema';
const renderScene = SceneMap({
  first: RemoteData,
  second: LocalData,
});
export default function MyTabPager({navigation}) {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Remote'},
    {key: 'second', title: 'Local'},
  ]);
  async function deleteData() {
    const realm = await Realm.open(databaseOptions);
    try {
      realm.write(() => {
        realm.deleteAll();
      });
      ToastAndroid.show('logged out successfully', ToastAndroid.SHORT);
      navigation.goBack();
    } catch (e) {
      console.error(e);
    }
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name="logout"
          size={30}
          color="#fff"
          onPress={() => {
            deleteData();
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}
const databaseOptions = {
  path: REALM_PATH,
  schema: SCHEMA_LIST,
  schemaVersion: 0,
};
