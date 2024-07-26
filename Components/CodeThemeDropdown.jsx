import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  a11yDark,
  a11yLight,
  agate,
  androidstudio,
  anOldHope,
  arduinoLight,
  arta,
  ascetic,
  atelierCaveDark,
  atelierCaveLight,
  atelierEstuaryDark,
  atelierEstuaryLight,
  atelierForestDark,
  atelierForestLight,
  atelierHeathDark,
  atelierHeathLight,
  atelierLakesideDark,
  atelierLakesideLight,
  atelierPlateauDark,
  atelierPlateauLight,
  atelierSavannaDark,
  atelierSavannaLight,
  atelierSeasideDark,
  atelierSeasideLight,
  atelierSulphurpoolDark,
  atelierSulphurpoolLight,
  atomOneDark,
  atomOneDarkReasonable,
  atomOneLight,
  brownPaper,
  codepenEmbed,
  colorBrewer,
  darcula,
  dark,
  defaultStyle,
  docco,
  dracula,
  far,
  foundation,
  github,
  githubGist,
  gml,
  googlecode,
  gradientDark,
  grayscale,
  gruvboxDark,
  gruvboxLight,
  hopscotch,
  hybrid,
  idea,
  irBlack,
  isblEditorDark,
  isblEditorLight,
  kimbieLight,
  lightfair,
  lioshi,
  magula,
  monoBlue,
  monokai,
  monokaiSublime,
  nightOwl,
  nnfx,
  nnfxDark,
  nord,
  obsidian,
  ocean,
  paraisoDark,
  paraisoLight,
  pojoaque,
  purebasic,
  qtcreatorDark,
  qtcreatorLight,
  railscasts,
  rainbow,
  routeros,
  schoolBook,
  shadesOfPurple,
  solarizedDark,
  solarizedLight,
  srcery,
  stackoverflowDark,
  stackoverflowLight,
  sunburst,
  tomorrow,
  tomorrowNight,
  tomorrowNightBlue,
  tomorrowNightBright,
  tomorrowNightEighties,
  vs,
  vs2015,
  xcode,
  xt256,
  zenburn,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const TEXT_COLOR = "#000";

export default function CodeThemeDropdown({
  theme,
  setTheme,
  Color = ["#08e"],
  placeholder,
  setPlaceholder,
}) {
  const [isFocus, setIsFocus] = useState(false);

  const themeValues = [
    { label: "A11y Dark", value: a11yDark },
    { label: "A11y Light", value: a11yLight },
    { label: "Agate", value: agate },
    { label: "An Old Hope", value: anOldHope },
    { label: "Android studio", value: androidstudio },
    { label: "Arduino Light", value: arduinoLight },
    { label: "Arta", value: arta },
    { label: "Ascetic", value: ascetic },
    { label: "Atelier CaveDark", value: atelierCaveDark },
    { label: "Atelier CaveLight", value: atelierCaveLight },
    { label: "Atelier Estuary Dark", value: atelierEstuaryDark },
    { label: "Atelier Estuary Light", value: atelierEstuaryLight },
    { label: "Atelier Forest Dark", value: atelierForestDark },
    { label: "Atelier Forest Light", value: atelierForestLight },
    { label: "Atelier Heath Dark", value: atelierHeathDark },
    { label: "Atelier Heath Light", value: atelierHeathLight },
    { label: "Atelier Lakeside Dark", value: atelierLakesideDark },
    { label: "Atelier Lakeside Light", value: atelierLakesideLight },
    { label: "Atelier Plateau Dark", value: atelierPlateauDark },
    { label: "Atelier Plateau Light", value: atelierPlateauLight },
    { label: "Atelier Savanna Dark", value: atelierSavannaDark },
    { label: "Atelier Savanna Light", value: atelierSavannaLight },
    { label: "Atelier Seaside Dark", value: atelierSeasideDark },
    { label: "Atelier Seaside Light", value: atelierSeasideLight },
    { label: "Atelier Sulphurpool Dark", value: atelierSulphurpoolDark },
    { label: "Atelier Sulphurpool Light", value: atelierSulphurpoolLight },
    { label: "AtomOne Dark Reasonable", value: atomOneDarkReasonable },
    { label: "AtomOne Light", value: atomOneLight },
    { label: "Atom One Dark", value: atomOneDark },
    { label: "Brown Paper", value: brownPaper },
    { label: "Codepen Embed", value: codepenEmbed },
    { label: "Color Brewer", value: colorBrewer },
    { label: "Darcula", value: darcula },
    { label: "ark", value: dark },
    { label: "Default Style", value: defaultStyle },
    { label: "Docco", value: docco },
    { label: "Dracula", value: dracula },
    { label: "Far", value: far },
    { label: "Foundation", value: foundation },
    { label: "Github Gist", value: githubGist },
    { label: "Github", value: github },
    { label: "Gml", value: gml },
    { label: "Google code", value: googlecode },
    { label: "Gradient Dark", value: gradientDark },
    { label: "Gray scale", value: grayscale },
    { label: "Gruv box Dark", value: gruvboxDark },
    { label: "Gruv box Light", value: gruvboxLight },
    { label: "Hop scotch", value: hopscotch },
    { label: "Hybrid", value: hybrid },
    { label: "Idea", value: idea },
    { label: "Ir Black", value: irBlack },
    { label: "Isbl Editor Dark", value: isblEditorDark },
    { label: "Isbl Editor Light", value: isblEditorLight },
    { label: "Kimbie Light", value: kimbieLight },
    { label: "Light fair", value: lightfair },
    { label: "Lioshi", value: lioshi },
    { label: "Magula", value: magula },
    { label: "Mono Blue", value: monoBlue },
    { label: "Monokai Sublime", value: monokaiSublime },
    { label: "Monokai", value: monokai },
    { label: "Night Owl", value: nightOwl },
    { label: "Nnfx Dark", value: nnfxDark },
    { label: "Nnfx", value: nnfx },
    { label: "Nord", value: nord },
    { label: "Obsidian", value: obsidian },
    { label: "Ocean", value: ocean },
    { label: "Paraiso Dark", value: paraisoDark },
    { label: "Paraiso Light", value: paraisoLight },
    { label: "Pojoaque", value: pojoaque },
    { label: "purebasic", value: purebasic },
    { label: "Qt creatorDark", value: qtcreatorDark },
    { label: "Qt creatorLight", value: qtcreatorLight },
    { label: "Railscasts", value: railscasts },
    { label: "Rainbow", value: rainbow },
    { label: "Routeros", value: routeros },
    { label: "School Book", value: schoolBook },
    { label: "Shades Of Purple", value: shadesOfPurple },
    { label: "Solarized Dark", value: solarizedDark },
    { label: "Solarized Light", value: solarizedLight },
    { label: "Srcery", value: srcery },
    { label: "Stackoverflow Dark", value: stackoverflowDark },
    { label: "Stackoverflow Light", value: stackoverflowLight },
    { label: "Sunburst", value: sunburst },
    { label: "TomorrowNight", value: tomorrowNight },
    { label: "TomorrowNight Blue", value: tomorrowNightBlue },
    { label: "TomorrowNight Bright", value: tomorrowNightBright },
    { label: "TomorrowNight Eighties", value: tomorrowNightEighties },
    { label: "Tomorrow", value: tomorrow },
    { label: "vs", value: vs },
    { label: "vs2015", value: vs2015 },
    { label: "xcode", value: xcode },
    { label: "xt256", value: xt256 },
    { label: "zenburn", value: zenburn },
  ];

  return (
    <View>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: Color[0] }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        itemTextStyle={styles.iconContainer}
        data={themeValues}
        activeColor={Color[0]}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : "..."}
        searchPlaceholder="Select Theme..."
        value={theme}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setTheme(item.value);
          setPlaceholder(item.label);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? TEXT_COLOR : Color[0]}
            name="Safety"
            size={20}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 170,
    padding: 10,
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 35,
  },
  containerStyle: {
    // backgroundColor: "#000",
    borderRadius: 10,
  },
  iconContainer: {
    // color: "#fff",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 10,
    paddingHorizontal: 8,
    width: 330,
    marginVertical: 20,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    // color: TEXT_COLOR,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    color: "#fff",
  },
});
