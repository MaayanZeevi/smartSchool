import * as React from "react";
import { Header } from "@rneui/base";

export default ({ leftIcon, rightIcon, title }) => {
  return (
    <Header
      barStyle="default"
      centerComponent={{
        text: title,
        style: { fontWeight: "bold", fontSize: 20 },
      }}
      containerStyle={{
        width: "100%",
        backgroundColor: "white",
        height: 90,
        paddingLeft: 20,
        borderBottomColor: "#F7F7F8",
        borderBottomWidth: 2,
      }}
      rightComponent={rightIcon}
      placement="center"
      leftComponent={leftIcon}
    />
  );
};
