'use strict';

var React = require('react-native');
var { AppRegistry, ListView, Navigator, StyleSheet, Text, TouchableWithoutFeedback, View } = React;

var models = [{title:"A"}, {title:"B"}, {title:"C"}, {title:"D"}, {title:"E"}]

var ReactBug = React.createClass({
  render: function() {
    return (
      <Navigator
      initialRoute={{name: 'My First Scene', index: 0}}
      renderScene={(route, navigator) =>
      <ListOfCards
        name={route.name}
        onForward={(data) => {
          var nextIndex = route.index + 1;
          navigator.push({
            name: 'Scene ' + nextIndex,
            index: nextIndex,
            data: data,
          });
        }}
        onBack={() => {
          if (route.index > 0) {
            navigator.pop();
          }
        }}
      />
    }
  />
    );
  }
});

var ListOfCards = React.createClass({
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
        <Card model={rowData} onForward={this.props.onForward} />
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

  userClickedDealCard(model) {
    console.log('userClickedDealCard');
    // debugger
    this.props.onForward(model);
  },
});

var DetailPage = React.createClass({
  render: function() {
    return (
      <View style={{flex:1}}>
        <Text>{this.props.model.title}</Text>
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
