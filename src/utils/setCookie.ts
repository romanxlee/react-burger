interface SetCookieProps {
  expires?: number | Date | string;
  [key: string]: number | Date | string | boolean | undefined;
}

export function setCookie(
  name: string,
  value: string,
  props: SetCookieProps = {},
) {
  let exp = props.expires;
  if (exp && typeof exp == "number") {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}
