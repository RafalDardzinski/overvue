const extractStyleValue = (style, stylesString) => {
  if (stylesString && stylesString.includes(style)) {
    const styleValString = stylesString.split(`${style}: `)[1];
    return styleValString.split(';')[0];
  }
};

export default extractStyleValue;