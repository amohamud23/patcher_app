export const colors = {
  green: "#317376",
  secondary: "#FCF0E3",
  yellow: "#F3C23E",
  red: "#DF7171",
  lightgrey: "#D3D3D3",
  grey: "#DEDBDB",
  darkGrey: "#292929",
};

export const fontSize = {
  title: 30,
  subTitle: 20,
  input: 17,
};

export const darkTheme = {
  background: "#242526",
  color: colors.secondary,
  cardBackground: {
    backgroundColor: colors.darkGrey,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
};

export const lightTheme = {
  background: "white",
  color: colors.green,
  cardBackground: {
    backgroundColor: "white",
    shadowColor: colors.green,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
};
