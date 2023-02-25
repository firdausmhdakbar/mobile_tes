import {Text, View, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import customData from './positions.json';


const dataJson = customData;

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',

    paddingVertical: 16,
    alignItems: 'center',
  },
  textDetail: {
    fontSize: 12,
    color: 'grey',
  },
  loaderStyle: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataJson: dataJson,
      isLoading: false,
      currentPage: 1
    };
  }
  
  getData(){
    this.setState({
      isLoading : true
    })
    if(this.state.dataJson !='') {
      setTimeout(() => {
        this.setState({
          isLoading : false
        })
      }, 3000);
    } 

    // axios.get(``)
    //   .then(res => {
    //     //setUsers(res.data.results);
    //     setUsers([...users, ...res.data.results]);
    //     setIsLoading(false);
    //   });
  };

  renderLoading() {
    return (
      !this.state.isLoading ?
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View> : null
    );
  }

  loadMoreItem() {
    this.setState({
      currentPage : this.state.currentPage + 1
    })
  }

  componentDidMount() {
    console.log('DATA', this.state.dataJson);
    this.getData()
  }

  separator = () => <View style={{height: 10, backgroundColor: '#eceff1'}} />;


  itemRender = ({item}) => {
    return (
      <View>
        <View>
          {/* <Text style={{fontWeight: 'bold'}}>TOP</Text>
           <Text>{item.id}</Text>
           <Text>{item.type}</Text>
           <Text>{item.url}</Text>
           <Text>{item.created_at}</Text>
           <Text>{item.company}</Text>
           <Text>{item.company_url}</Text>
           <Text>{item.location}</Text>
           <Text>{item.title}</Text>
           <Text>{item.description}</Text>
           <Text>{item.how_to_apply}</Text>
           <Text>{item.company_logo}</Text>
           <Text></Text> */}
        </View>
        <TouchableOpacity
         onPress={() => {
          // if (item.id == '7638eee4-4e75-4c06-a920-ea7619a311b5') {
            this.props.navigation.navigate('JobDetail')
          // }
        }}
        // onPress={() => {
        
        // }

        // }
        >
        <View style={{padding: 15, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.new_logo}} style={{width: 60, height: 60}} />
          <Text style={{fontSize: 14, marginLeft: 7, color:'#1870F0', fontWeight:'bold', flex: 1}}> Job {item.title}</Text>
        </View>

        <View style={{paddingHorizontal: 10, flex: 1}}>
          <Text style={styles.textDetail}>{item.company}</Text>
          <Text style={styles.textDetail}>{item.created_at}</Text>
        </View>
        </TouchableOpacity>
        <Text></Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        {/* mapping dengan data json
        {this.state.dataJson.map(x => (
          <View>
            <Text style={{textAlign: 'center'}}>{x.company}</Text>
          </View>
        ))} */}

        <FlatList 
        data={this.state.dataJson} 
        renderItem={this.itemRender}
        ItemSeparatorComponent={this.separator}
        />
      </View>
    );
  }
}
