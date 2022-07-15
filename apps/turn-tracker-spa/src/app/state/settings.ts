import { useCookies } from 'react-cookie';
import { useState } from 'react';

type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export class Settings {
  successColor: Color = '#54DE75';
  failureColor: Color = '#DE050F';
}

export default function useSettings() {
  const [cookies, setCookies] = useCookies(['settings']);
  const [settings, setSettingsInternal] = useState(cookies.settings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setCookies('settings', newSettings);
    setSettingsInternal(newSettings);
  };

  return { ...settings, setSettings: updateSettings };
}
