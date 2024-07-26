import React, { useEffect, useRef } from "react";
import { TextInput, StyleSheet, View, Keyboard } from "react-native";
export const CustomTextInput = ({
  style,
  value,
  onChangeText,
  maxLength,
  placeholder,
  lineLength,
  autoFocus = false,
}) => {
  const typingTimeoutRef = useRef(null);
  const inputRef = useRef(null);

  const handleTextChange = (input) => {
    onChangeText(input);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      let formattedText = "";
      const lines = input.split("\n");

      lines.forEach((line) => {
        while (line.length > lineLength) {
          const breakpoint = line.lastIndexOf(" ", lineLength);
          if (breakpoint === -1) {
            // If no space found, break at the lineLength
            formattedText += line.substring(0, lineLength) + "\n";
            line = line.substring(lineLength);
          } else {
            // Break at the last space before the lineLength
            formattedText += line.substring(0, breakpoint) + "\n";
            line = line.substring(breakpoint + 1);
          }
        }
        formattedText += line + "\n";
      });

      formattedText = formattedText.trimEnd();
      onChangeText(formattedText);
    }, 1000); // Adjust delay as needed
  };
  const handleAutoClick = () => {
    inputRef.current?.focus(); // Focus the input field to show keyboard
  };

  useEffect(() => {
    if (autoFocus) {
      handleAutoClick();
    } 
  }, [autoFocus]);

  return (
    <TextInput
      style={style}
      multiline={true}
      numberOfLines={10}
      onChangeText={handleTextChange}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      ref={inputRef}
    />
  );
};
