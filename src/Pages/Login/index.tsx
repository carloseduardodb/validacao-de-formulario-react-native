import React, { useRef, useCallback } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Logo from "../../Components/Logo";
import { Form } from "@unform/mobile";
import { FormHandles } from "@unform/core";
import Input from "../../Components/Input";
import getValidationsErrors from "../../utils/getValidationsErrors";
import * as Yup from "yup";

interface credentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  function seedData(data: credentials) {
    Alert.alert(
      `Agora é só enviar os dados pra api, porque os dados:`,
      `email:${data.email} e password:${data.password} ja estão validados!`
    );
  }

  const handleSubmit = useCallback(async (data: credentials) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório!")
          .email("Digite um e-mail válido!"),
        password: Yup.string()
          .min(8, "A tamanho minimo de uma senha é 8 caracteres!")
          .max(
            80,
            "Você esta querendo colocar uma senha muito grande! Memória fotografica?"
          )
          .required("Senha obrigatória!"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await seedData(data);

      //navigation.navigate("Dashboard");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <View style={styles.content}>
      <Logo />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" icon="not" placeholder="Digite o email" />
        <Input name="password" icon="not" placeholder="Digite a senha" />
        <TouchableOpacity
          onPress={() => {
            formRef.current?.submitForm();
          }}
          style={styles.buttonLogin}
        >
          <Text style={styles.buttonText}>ENTRAR</Text>
        </TouchableOpacity>
      </Form>
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

export default Login;
