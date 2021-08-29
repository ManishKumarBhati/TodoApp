import React, {Component} from 'react';
import axios from 'axios';
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import CustomeStyle from './component/CustomeStyle';
class RemoteData extends Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: [],
    };
  }
  componentDidMount() {
    this.getToDoList();
  }

  async getToDoList() {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos',
      );

      this.setState({data: response.data});
    } catch (error) {
      console.error(error);
      // this.getToDoList();
    } finally {
      this.setState({isLoading: false});
    }
  }

  render() {
    const renderItem = ({item}) => {
      return <Item item={item} />;
    };

    const Item = ({item, onPress}) => (
      <TouchableOpacity onPress={onPress}>
        <View style={CustomeStyle.card}>
          <Text style={{fontWeight: 'bold'}}>{item.title}</Text>
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

    return (
      <View style={{flex: 1}}>
        {this.state.isLoading ? (
          <ActivityIndicator size={100} />
        ) : (
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    );
  }
}

export default RemoteData;
