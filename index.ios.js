'use strict';

var React = require('react-native');
var { AppRegistry, ListView, StyleSheet, Text, TouchableWithoutFeedback, View } = React;

var models = [{title:"A"}, {title:"B"}, {title:"C"}, {title:"D"}, {title:"E"}]

var ReactBug = React.createClass({
  render: function() {
    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.getDataSource()}
        renderRow={this.renderRow}
        onEndReachedThreshold={0} />
    );
  },

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableWithoutFeedback onPress={this.userClickedDealCard}>
        <View style={styles.card}>
          <Text style={styles.text}>{rowData.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  userClickedDealCard() {
    console.log('userClickedDealCard');
  },

  getDataSource() {
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.title !== r2.title});

    return dataSource.cloneWithRows(models);
  },
});

var styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
  },
  card: {
    backgroundColor: 'green',
    justifyContent: 'center',
    width: 320,
    height: 340,
    margin: 10,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactBug', () => ReactBug);
