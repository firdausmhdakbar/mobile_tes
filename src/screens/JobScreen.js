import {Text, View, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Dimensions} from 'react-native';
import React, {Component} from 'react';
import customData from './positions.json';


const dataJson = customData;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  cardTitle: {
    fontSize: width > 360 ? 18 : 16,
    marginLeft: 12,
    color: '#1870F0',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  cardDetails: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  textDetail: {
    fontSize: width > 360 ? 14 : 12,
    color: 'grey',
    fontFamily: 'Roboto',
  },
  headerContainer: {
    backgroundColor: '#1870F0', 
    paddingVertical: 16,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Warna teks header
  }   
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataJson: dataJson.slice(0, 10),
      isLoading: false,
      currentPage: 1,
      isFetchingMore: false,
      searchText: '', 
      filteredData: dataJson.slice(0, 10), 
    };
  }
  
  handleSearch = () => {
    const { searchText } = this.state;
   
    const filteredData = dataJson.filter(item =>
      item.productName.toLowerCase().includes(searchText.toLowerCase())
    );
    this.setState({ filteredData });
  };
  
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
  };

  renderLoading() {
    return (
      this.state.isLoading ? (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#aaa" />
        </View>
      ) : null
    );
  }

  loadMoreItem() {
    if (!this.state.isFetchingMore) {
      this.setState({
        isFetchingMore: true,
      });

      setTimeout(() => {
        const startIndex = this.state.currentPage * 10;
        const endIndex = startIndex + 10;
        const newData = dataJson.slice(startIndex, endIndex);

        this.setState(prevState => ({
          dataJson: [...prevState.dataJson, ...newData],
          currentPage: prevState.currentPage + 1,
          isFetchingMore: false,
        }));
      }, 3000);
    }
  }

  componentDidMount() {
    console.log('DATA', this.state.dataJson);
    this.getData()
  }

  separator = () => <View style={{height: 10, backgroundColor: '#eceff1'}} />;


  itemRender = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // this.props.navigation.navigate('JobDetail');
        }}
      >
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Image source={{ uri: item.new_logo }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.productName}</Text>
          </View>
          <View style={styles.cardDetails}>
            <Text style={styles.textDetail}>{item.quantity} Item</Text>
            <Text style={styles.textDetail}>$ {item.totalPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>List Order</Text>
        </View>
        <FlatList
          data={this.state.dataJson}
          renderItem={this.itemRender}
          ItemSeparatorComponent={this.separator}
          ListFooterComponent={() => (
            this.state.isFetchingMore ? (
              <View style={styles.paginationLoader}>
                <ActivityIndicator size="large" color="#1870F0" />
              </View>
            ) : null
          )}
          onEndReached={this.loadMoreItem.bind(this)}
          onEndReachedThreshold={0.1}
        />
      </View>
    )
  }
}
