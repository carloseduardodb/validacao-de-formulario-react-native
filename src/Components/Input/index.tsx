import React, { useEffect, useRef } from "react";
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Text,
} from "react-native";
import { useField } from "@unform/core";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReferences {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReferences>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.buttonText}>
        {name.substring(0, 1).toUpperCase().concat(name.substring(1))}:
      </Text>
      <TextInput
        ref={inputElementRef}
        style={styles.credentialsInput}
        placeholderTextColor="#586984"
        defaultValue={defaultValue}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
      <Text style={{ color: "#fff" }}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 30,
  },
  credentialsInput: {
    backgroundColor: "#3c3440",
    marginVertical: 10,
    height: 50,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
  },
  buttonLogin: {
    backgroundColor: "#FEA443",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Input;
