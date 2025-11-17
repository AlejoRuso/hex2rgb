import type { ColorResult } from '../types/color';

export const hexToRgb = (hex: string): ColorResult => {
  // Проверяем, что строка начинается с # и имеет правильную длину
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    return { rgb: '', isValid: false };
  }

  // Убираем # и разбиваем на составляющие
  const hexColor = hex.substring(1);
  const bigint = parseInt(hexColor, 16);
  
  // Извлекаем RGB компоненты
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return {
    rgb: `rgb(${r}, ${g}, ${b})`,
    isValid: true
  };
};

// Функция для определения яркости цвета и выбора контрастного текста
export const getContrastColor = (hexColor: string): string => {
  if (!/^#[0-9A-F]{6}$/i.test(hexColor)) {
    return '#000000'; // По умолчанию черный для невалидных цветов
  }

  // Конвертируем HEX в RGB
  const hex = hexColor.substring(1);
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Формула для расчета относительной яркости (WCAG)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Возвращаем белый текст для темных цветов, черный - для светлых
  return luminance > 0.5 ? '#000000' : '#ffffff';
};