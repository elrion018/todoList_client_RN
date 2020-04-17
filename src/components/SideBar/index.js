import React from "react";
import { AppRegistry, Image, StatusBar, View, Text } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80, width: 30 }}></View>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50
          }}
          onPress={() => {
            this.props.navigation.push("TodoBox");
          }}
        >
          <Text>관리함</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50
          }}
          onPress={() => {
            this.props.navigation.push("Home");
          }}
        >
          <Text>오늘</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50
          }}
          onPress={() => {
            this.props.navigation.push("NextWeek");
          }}
        >
          <Text>다음 7일</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50
          }}
          onPress={() => {}}
        >
          <Text>프로젝트</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50
          }}
          onPress={() => {}}
        >
          <Text>라벨</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50
          }}
          onPress={() => {}}
        >
          <Text>필터</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50
          }}
          onPress={() => {}}
        >
          <Text>설정</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
