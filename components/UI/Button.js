import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GlobalStyles } from "../../constants/styles";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.buttonText, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export function FlatButton({ children, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button1, pressed && styles.pressed1]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText1}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 2,
    padding: 8,
  },
  button1: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  buttonText1: {
    color: Colors.primary100,
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
  },
  pressed: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
    opacity: 0.75,
  },
  pressed1: {
    opacity: 0.7,
  },
});
