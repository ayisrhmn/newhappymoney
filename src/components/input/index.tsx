import React from 'react';
import {GestureResponderEvent, View, StyleSheet} from 'react-native';
import {Text, TextInput} from 'react-native-paper';

import {Colors, Mixins} from '@utils/index';

interface Props {
  mode?: 'flat' | 'outlined';
  label?: any;
  focus?: any;
  setFocus?: any;
  disabled?: boolean;
  placeholder?: any;
  defaultValue?: any;
  value?: any;
  error?: any;
  secureTextEntry?: boolean;
  type?: 'text' | 'password' | 'select' | 'date';
  multiline?: boolean;
  mask?: any;
  keyboardType?: any | 'default';
  onChangeText?: ((text: string) => void) | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  onSecure?: (() => void) | undefined;
}

const inputTheme: any = {
  colors: {
    primary: Colors.PRIMARY,
    text: Colors.BLACK,
  },
};

const Input = (props: Props) => {
  const {type = 'text', error} = props;
  const [focus, setFocus] = React.useState(false);

  return (
    <View style={styles.inputWrapper}>
      {type === 'text' && (
        <InputText {...props} focus={focus} setFocus={setFocus} />
      )}

      {type === 'password' && (
        <InputPassword {...props} focus={focus} setFocus={setFocus} />
      )}

      {error && <Text style={styles.errorLabel}>{error.message}</Text>}
    </View>
  );
};

const InputText = (props: Props) => {
  return (
    <TextInput
      {...props}
      dense
      selectionColor={Colors.PRIMARY}
      style={styles.input}
      theme={inputTheme}
      onFocus={() => props?.setFocus(true)}
      onBlur={() => props?.setFocus(false)}
    />
  );
};

const InputPassword = (props: Props) => {
  return (
    <TextInput
      {...props}
      dense
      selectionColor={Colors.PRIMARY}
      style={styles.input}
      theme={inputTheme}
      onFocus={() => props?.setFocus(true)}
      onBlur={() => props?.setFocus(false)}
      right={
        <TextInput.Icon
          name={props?.secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
          color={props?.focus ? Colors.PRIMARY : Colors.BLACK}
          onPress={props?.onSecure}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    marginBottom: Mixins.scaleSize(14),
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: Mixins.scaleFont(14),
  },
  touchable: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  errorLabel: {
    fontSize: Mixins.scaleFont(12),
    paddingTop: Mixins.scaleSize(3),
    color: Colors.DANGER,
  },
});

export default Input;
