import { useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState("dark");
  const changeTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return [theme, changeTheme];
};

export default useTheme;
