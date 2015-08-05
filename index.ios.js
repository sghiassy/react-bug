'use strict';

var React = require('react-native');
var { AppRegistry, ListView, Navigator, StyleSheet, Text, TouchableWithoutFeedback, View } = React;

var models = [{title:"A"}, {title:"B"}, {title:"C"}, {title:"D"}, {title:"E"}]

var ReactBug = React.createClass({
  render: function() {
    return (
      <Navigator
        initialRoute={{name: 'My First Scene', index: 0}}
        renderScene={this.renderScene}/>
    );
  },

  renderScene: function(route, navigator) {
    if (route.index == 0) {
      return (
        <ListOfCards
          name={route.name}
          navigator={navigator} />
      );
    } else {
      return (
        <DetailPage
          name={route.name}
          model={route.model} />
      );
    }
  },
});

var ListOfCards = React.createClass({
  render: function() {

    /**
     * To see the app work, without the infinite loop
     * uncomment the 3 lines below
     */

    // return (
    //   <Card model={models[0]} navigator={this.props.navigator} />
    // );

    return (
      <ListView
        contentContainerStyle={styles.list}
        dataSource={this.getDataSource()}
        renderRow={this.renderRow} />
    );
  },

  renderRow(rowData, sectionID, rowID) {
    return (
        <Card model={rowData} navigator={this.props.navigator} />
    );
  },

  getDataSource() {
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.title !== r2.title});

    return dataSource.cloneWithRows(models);
  },
});

var Card = React.createClass({
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this.userClickedDealCard}>
        <View style={styles.card}>
          <Text style={styles.text}>{this.props.model.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },

  userClickedDealCard(evt) {
    this.props.navigator.push({model: this.props.model});
  },
});

var DetailPage = React.createClass({
  render: function() {
    return (
      <View style={{flex:1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 30}}>I am the {this.props.model.title} page</Text>
      </View>
    );
  }
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
