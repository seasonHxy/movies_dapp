// export default function setTheme(theme = "light") {
//     // 检测是否支持css变量
//     if (!window?.CSS?.supports("background", 0)) return false;

//     // 设置主题
//     const Theme = {
//         dark: "#3f3f3f",
//         light: "#f9f9f9",
//     };

//     document.documentElement.style.background = Theme[theme];
//     document.documentElement.style.color = theme == 'dark' ? Theme['light'] : Theme['dark'];
// }


const dark = {
    '--main-color': 'darkgray',
  };
  
  const light = {
    '--main-color': 'green',
  };
  
  const themes = { dark, light };
  
  export const setTheme = (theme) => {
    console.log("theme:", theme)
    const nextTheme = themes[theme];
    Object.keys(nextTheme).forEach((key) => {
      document.documentElement.style.setProperty(key, nextTheme[key]);
    });
  };
