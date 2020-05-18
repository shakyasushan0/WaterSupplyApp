import React, { Component } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

export default class RadioButton extends Component {
  state = {
    value: null,
  };

  render() {
    const { PROP } = this.props;
    const { value } = this.state;
    this.props.getValue(this.state.value);
    return (
      <View>
        {PROP.map((res) => {
          return (
            <View key={res.key} style={styles.container}>
              <TouchableOpacity
                style={styles.radioCircle}
                onPress={() => {
                  this.setState({
                    value: res.key,
                  });
                }}
              >
                {value === res.key && <View style={styles.selectedRb} />}
              </TouchableOpacity>
              <Text style={styles.radioText}>{res.text}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    alignItems: "center",
    flexDirection: "row",
    //justifyContent: "space-evenly",
  },
  radioText: {
    marginLeft: 5,
    fontSize: 16,
    //color: "#000",
    fontWeight: "600",
  },
  radioCircle: {
    height: 22,
    width: 22,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#2183f2",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: "green",
  },
  result: {
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    backgroundColor: "#F3FBFE",
  },
});
