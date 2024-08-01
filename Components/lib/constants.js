import Toast from "react-native-toast-message";

const colors =
    [
        ["#EDE574", "#E1F5C4"],
        ["#603813", "#b29f94"],
        ["#314755", "#26a0da"],
        ["#2b5876", "#4e4376"],
        ["#cc2b5e", "#753a88"],
        ["#ec008c", "#fc6767"],
        ["#1488CC", "#2B32B2"],
        ["#ffe259", "#ffa751"],
    ]


const placeholderText = `
  Wow, such empty space.
  Keep typing, maybe?
  Or not. Whatever.
`;

const errorText = `
  HEY I'M EMPTY!!
`;
// const errorText = `
//   DRAFTS IS EMPTY!!
// `;

const showToast = (type, Text1, Text2, duration = 4000) => {
    Toast.show({
        type: type,
        text1: Text1,
        text2: Text2,
        position: "bottom",
        bottomOffset: 100,
        visibilityTime: duration
    });
};


export {
    colors,
    placeholderText,
    errorText,
    showToast
}