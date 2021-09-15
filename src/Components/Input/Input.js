import { TextField } from 'rn-material-ui-textfield';
import { Platform, View } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import * as Constant from '../../constants/constants';
import * as Font from '../../constants/fonts';

const textblue = '#000'
const consttextcolor = '#ccc';
const borderheight = 0.8

export default class extends Component {
  static propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    disabled: PropTypes.bool,
    onChangeText: PropTypes.func,
    onFocus: PropTypes.func,
    setRef: PropTypes.func,
    returnKeyType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    required: PropTypes.bool,
    blurOnSubmit: PropTypes.bool,
    autoCapitalize: PropTypes.string
  };

  static defaultProps = {
    label: '',
    placeholder: '',
    value: '',
    error: '',
    disabled: false,
    onChangeText: null,
    onFocus: null,
    setRef: null,
    returnKeyType: 'done',
    secureTextEntry: false,
    required: false,
    blurOnSubmit: true
    // showtooltip: false
  };

  constructor(props) {
    super(props);

    this.state = {
      type: 'inactive',
      // showtooltip: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChangeText(value) {
    this.props.onChangeText && this.props.onChangeText(value);
  }

  onFocus() {
    this.props.onFocus && this.props.onFocus();
    this.setState({
      type: 'active',
      // showtooltip: true,
    });
  }

  onBlur() {
    this.props.onBlur && this.props.onBlur();
    this.setState({
      type: 'inactive',
      // showtooltip: false,
    });
  }

  // onToggleTollTip() {
  //   this.setState({
  //     showtooltip: false,
  //   });
  // }

  onSubmitEditing = () => this.props.onSubmitEditing && this.props.onSubmitEditing();

  getemailcolor(label, value) {
    if (label === 'Email Address' || label === 'Confirm Email') {
      if (value != '') {
        return textblue
      } else {
        return consttextcolor
      }
    } else {
      if (value != '') {
        return textblue
      } else {
        return consttextcolor
      }
    }
  }

  render() {
    const {
      setRef,
      label,
      placeholder,
      value,
      returnKeyType,
      // error,
      disabled,
      secureTextEntry,
      required,
      labelTextStyle,
      textColor,
      titleTextStyle,
      editable,
      autoCapitalize,
      accessibilityLabel,
      blurOnSubmit
      // longErrorText,
      // tooltip
    } = this.props;
    let mykeyboard = 'default'
  
    return (
      <View>
        <TextField
          isRequired
          // keyboardAppearance="dark"
          ref={(ref) => {
            setRef && setRef(ref);
          }}
          label={required ? `${label} *` : label}
          placeholder={placeholder}
          value={value}
          // accessibilityLabel={accessibilityLabel}
          testID={accessibilityLabel}
          // error={error}
          editable={editable}
          disabled={disabled}
          secureTextEntry={secureTextEntry}


          // disable pass check start
          renderRightAccessory={null}
          autoCorrect={false}
          autoCapitalize={autoCapitalize || "none"}
          autoCompleteType="off"
          spellCheck={false}
          textContentType="oneTimeCode"
          // disable pass check end
          keyboardType={mykeyboard}


          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onSubmitEditing={this.onSubmitEditing}
          containerStyle={style.textField}
          placeholderTextColor={textColor || consttextcolor}
          textColor={textColor || consttextcolor}
          baseColor={textColor || this.getemailcolor(label, value)}
          // errorColor={Colors.red}
          labelTextStyle={labelTextStyle || style[`${this.state.type}Label`]}
          titleTextStyle={titleTextStyle || style.title}
          tintColor={'#000'}
          style={style.title}
          fontSize={15}
          labelFontSize={15}
          returnKeyType={returnKeyType}
          blurOnSubmit={blurOnSubmit}
          helpersNumberOfLines={2}
          lineWidth={1}
          activeLineWidth={1}
          // lineType={"dotted"}
        />
        {/* <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={style.inputborderright} />
        </View> */}
        {/* {this.state.showtooltip || tooltip!='' && <Tooltip tooltip={tooltip} onToggleTollTip={this.onToggleTollTip.bind(this)} />} */}
      </View>
    );
  }
}



const style = StyleSheet.create({
  textField: {
    width: '100%',
  },
  inactiveLabel: {
    color: '#000'
    // fontFamily: 
  },
  activeLabel: {
    color: '#000'
    // fontFamily: base.font.medium
  },
  title: {
    fontFamily: Font.POPPINSSEMIBOLD,
    // fontWeight: '700',
    color: '#000'
  },
  errorText: {
    // fontFamily: base.font.light,
    color: 'red',
    fontSize: 10
  },
  inputborderleft: {
    height: borderheight,
    width: '10%',
    backgroundColor: textblue
  },
  inputborderright: {
    height: borderheight,
    width: '100%',
    // backgroundColor: '#404040',
    borderRadius: 1, 
    borderWidth: 1, 
    borderColor: '#808080', 
    borderStyle: 'dotted' 
  },
})
