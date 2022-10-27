
// 表格时间格式化
export function formatDate (cellValue) {
  if (cellValue === null || cellValue === "") { return ""; }
  let date = new Date(cellValue);
  let year = date.getFullYear();
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  );
}

// 时间格式化，东八区
export function formatDateByTZ (cellValue) {
  let time1 = new Date(cellValue).getTime();
  let time = new Date(time1);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return (
    y +
    "-" +
    repair0(m) +
    "-" +
    repair0(d) +
    " " +
    repair0(h) +
    ":" +
    repair0(mm) +
    ":" +
    repair0(s)
  );
}
function repair0 (m) {
  return m < 10 ? "0" + m : m;
}

export function getQueryObject (url) {
  url = url === null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}
export function byteLength (str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) { s++; }
    else if (code > 0x7ff && code <= 0xffff) { s += 2; }
  }
  return s;
}
export function cleanArray (actual) {
  const newArray = [];
  for (let contract of actual) {
    if (contract) {
      newArray.push(contract);
    }
  }
  return newArray;
}


export function param (json) {
  if (!json) { return ""; }
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) { return ""; }
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    }),
  ).join("&");
}

export function param2Obj (url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    "{\"" +
    decodeURIComponent(search)
      .replace(/"/g, "\\\"")
      .replace(/&/g, "\",\"")
      .replace(/=/g, "\":\"")
      .replace(/\+/g, " ") +
    "\"}",
  );
}


export function html2Text (val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge (target, source) {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}
export function toggleClass (element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}
export function getTime () {
  return new Date(new Date().toDateString());
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) { context = args = null; }
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) { timeout = setTimeout(later, wait); }
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}


export function deepClone (source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

export function uniqueArr (arr) {
  return Array.from(new Set(arr));
}


export function createUniqueString () {
  const timestamp = +new Date() + "";
  const randomNum = parseInt((1 + Math.random()) * 65536) + "";
  return (+(randomNum + timestamp)).toString(32);
}

export function hasClass (ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}


export function addClass (ele, cls) {
  if (!hasClass(ele, cls)) { ele.className += " " + cls; }
}

export function removeClass (ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

export function makeMap (str, expectsLowerCase) {
  const map = Object.create(null);
  const list = str.split(",");
  for (let contract of list) {
    if (contract) {
      map[contract] = true;
    }
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}

export const exportDefault = "export default ";

export const beautifierConf = {
  html: {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "-1",
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "separate",
    brace_style: "end-expand",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: "110",
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
  js: {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "-1",
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "normal",
    brace_style: "end-expand",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: "110",
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
};

// 首字母大小
export function titleCase (str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase());
}

// 下划转驼峰
export function camelCase (str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase());
}

export function isNumberStr (str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}

// 生成随机数，解决图片缓存问题
export function fullOpen (n = 1, m = 100) {
  let result = Math.random() * (m - n) + n;
  while (result === n) {
    result = Math.random() * (m - n) + n;
  }
  return result;
}

// 根据对象数组中某一属性删除该项
export function removeByValue (arr, attr, value) {
  let index = 0;
  for (let i in arr) {
    if (arr[i][attr] === value) {
      index = i;
      arr.splice(index, 1);
      break;
    }
  }
}
// 数组传字符串，字符串转数组
export function array2String (formdata, changeArr) {
  let tempObj = {};

  for (const key in formdata) {
    if (Object.hasOwnProperty.call(formdata, key)) {
      if (changeArr.includes(key) && Array.isArray(formdata[key])) {
        tempObj[key] = formdata[key].join(",");
      } else if (
        changeArr.includes(key) &&
        toString.call(formdata[key]) === "[object String]"
      ) {
        tempObj[key] = formdata[key].split(",");
      } else {
        tempObj[key] = formdata[key];
      }
    }
  }

  return tempObj;
}