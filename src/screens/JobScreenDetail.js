import {Text, View, FlatList, StyleSheet, Image, ActivityIndicator} from 'react-native';
import React, {Component} from 'react';
import customData from './positions.json';
import { Card} from 'react-native-elements'


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
    textAlign:'justify'
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
           <Text style={{padding: 10, textAlign:'center'}}></Text>
        </View>
        <Image
            style={{
              alignSelf: 'center',
              position: 'relative',
              width: 40,
              height: 40,
              zIndex: 1,
            }}
            source={{uri: 'https://www.ag-it.com/img/logo.png'}}
          />
        <Card containerStyle={{borderRadius:10, backgroundColor:'#fafafa'}}>
            <Card.Title
              style={{
                paddingTop: 35,
                color: '#003E9C',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {item.title}
            </Card.Title>
            <Card.Divider />
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, paddingBottom: 20}}>
                <Text style={{color: 'grey'}}>{item.company}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{textAlign: 'right', fontWeight: 'bold'}}>
                  {item.type}
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 13, color: '#333', textAlign: 'justify', color:'#003E9C'}}>
              {item.company_url}
              {'\n'} {'\n'}
            </Text>
          <View style={{paddingHorizontal: 10, flex: 1}}>
            <Text style={styles.textDetail}>{item.description}</Text>
            <Text></Text>
            <Text>{item.how_to_apply}</Text>
          </View>
          </Card>
        {/* <View style={{padding: 15, flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: item.new_logo}} style={{width: 60, height: 60}} />
          <Text style={{fontSize: 14, marginLeft: 7, color:'#1870F0', fontWeight:'bold', flex: 1}}>{item.title}</Text>
        </View> */}
        <Text></Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <FlatList 
        data={this.state.dataJson} 
        renderItem={this.itemRender}
        ItemSeparatorComponent={this.separator}
        />
      </View>
    );
  }
}
