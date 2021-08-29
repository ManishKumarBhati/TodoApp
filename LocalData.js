import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TextInput,
  Button,
} from 'react-native';

import CustomeStyle from './component/CustomeStyle';
import ActionSheet from 'react-native-actionsheet';
import ActionButton from 'react-native-action-button';
import {SCHEMA_LIST, EVENTS_SCHEMA} from './Schema';
import Realm from 'realm';
import {CheckBox} from 'react-native-elements/dist/checkbox/CheckBox';
class LocalData extends Component {
  constructor() {
    super();
    this.state = {
      alertVisisble: false,
      data: [],
      isUpdate: false,
      selectedItem: null,
      selectedItem1: null,
      checked: false,
      task: '',
    };
  }

  showActionSheet = item => {
    this.setState({
      selectedItem: item,
      selectedItem1: item,
      checked: item.completed,
    });
    this.ActionSheet.show();
  };

  showAddDialog(visible) {
    this.setState({alertVisisble: visible});
  }
  componentDidMount() {
    this.getData();
  }

  async getData() {
    try {
      const realm = await Realm.open(databaseOptions);
      const tasks = realm.objects(EVENTS_SCHEMA);
      this.setState({data: tasks});
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }
  async saveData() {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        realm.create(EVENTS_SCHEMA, {
          id: Math.floor(Date.now() / 100),
          task: this.state.task,
          completed: this.state.checked,
        });
      });
      alert('data save successfully');
      this.showAddDialog(!this.state.alertVisisble);
    } catch (e) {
      console.error(e);
      alert(e);
    }
  }
  async deleteData() {
    try {
      const realm = await Realm.open(databaseOptions);
      realm.write(() => {
        realm.delete(this.state.selectedItem);
      });
      this.getData();
    } catch (e) {
      console.error(e);
    }
  }

  async UpdateData() {
    this.setState({isUpdate: false});
    var task = this.state.task.trim();
    var status = this.state.checked;

    if (task === this.state.selectedItem.task || task === '') {
      task = this.state.selectedItem.task;
    }

    // if (this.state.checked === this.state.selectedItem.completed) {
    //   status = this.state.selectedItem.completed;
    // }

    try {
      const realm = await Realm.open(databaseOptions);

      realm.write(() => {
        this.state.selectedItem.completed = status;
        this.state.selectedItem.task = task;
      });
      alert('data updated successfully');
      this.getData();

      this.showAddDialog(!this.state.alertVisisble);
    } catch (e) {
      console.error(e);
    }
    this.resetValue();
  }

  handleActionCLick(index) {
    if (index === 0) {
      // this.UpdateData();
      this.setState({isUpdate: true});
      this.showAddDialog(true);
    } else if (index === 1) {
      alert('Details');
    } else if (index === 2) {
      this.deleteData();
    }
  }

  resetValue() {
    this.setState({
      isUpdate: false,
      checked: false,
      task: '',
      selectedItem: null,
      selectedItem1: null,
    });
  }
  render() {
    const renderItem = ({item}) => {
      return <Item item={item} onPress={() => this.showActionSheet(item)} />;
    };

    const Item = ({item, onPress}) => (
      <TouchableOpacity onPress={onPress}>
        <View style={CustomeStyle.card}>
          <Text style={{fontWeight: 'bold'}}>{item.task}</Text>
          <Text
            style={{
              color: item.completed ? '#eb3434' : '#ebcc34',
              marginTop: 5,
              fontSize: 10,
            }}>
            {item.completed ? 'Completed' : 'Pending'}
          </Text>
        </View>
      </TouchableOpacity>
    );

    const actionList = ['Update', 'Details', 'Delete', 'Cancel'];

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />

        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          styles={styles}
          options={actionList}
          cancelButtonIndex={actionList.length - 1}
          destructiveButtonIndex={actionList.length}
          onPress={i => {
            this.handleActionCLick(i);
          }}
        />
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {
            // console.log('hi');
            this.showAddDialog(true);
          }}
        />
        <View style={CustomeStyle.modelContainer}>
          <Modal
            visible={this.state.alertVisisble}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => {
              this.resetValue();
              this.showAddDialog(!this.state.alertVisisble);
            }}>
            <View style={CustomeStyle.modalView}>
              <View style={CustomeStyle.alertMainView}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  Add task
                </Text>
                <TextInput
                  style={CustomeStyle.inputText}
                  defaultValue={
                    this.state.isUpdate ? this.state.selectedItem.task : ''
                  }
                  placeholder="Enter Task"
                  onChangeText={e => {
                    this.setState({task: e});
                  }}
                />
                <CheckBox
                  checkedColor="green"
                  center
                  title="Completed Status"
                  checked={this.state.checked}
                  onPress={() => {
                    const status = this.state.checked;
                    this.setState({checked: !status});
                    if (this.state.isUpdate) {
                      this.setState({
                        selectedItem1: {
                          id: this.state.selectedItem1.id,
                          task: this.state.selectedItem1.task,
                          completed: !status,
                        },
                      });
                    }
                  }}
                />
                <Button
                  title="Save"
                  onPress={() => {
                    if (this.state.isUpdate) {
                      this.UpdateData();
                    } else {
                      this.saveData();
                    }
                  }}
                />
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}
// const realm = Realm.open(databaseOptions);
const databaseOptions = {
  path: 'myrealm',
  schema: SCHEMA_LIST,
  schemaVersion: 0,
};

const styles = {
  titleBox: {
    background: 'pink',
  },
  titleText: {
    fontSize: 16,
    color: '#000',
  },
};
export default LocalData;
