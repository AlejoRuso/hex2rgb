import React, { useState, useCallback } from 'react';
import { hexToRgb, getContrastColor } from '../../utils/colorUtils';
import './ColorConverter.css';

const ColorConverter: React.FC = () => {
  const [hexColor, setHexColor] = useState<string>('#');
  const [colorResult, setColorResult] = useState<{ rgb: string; isValid: boolean }>({
    rgb: '',
    isValid: true
  });

  const handleHexChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexColor(value);

    // Проверяем, что введено 7 символов (включая #)
    if (value.length === 7) {
      const result = hexToRgb(value);
      setColorResult(result);
    } else {
      // Сбрасываем результат, если не полная строка
      setColorResult({ rgb: '', isValid: true });
    }
  }, []);

  const getDisplayColor = () => {
    if (hexColor.length !== 7) {
      return '#ffffff'; // Белый фон по умолчанию
    }
    return colorResult.isValid ? hexColor : '#ff0000'; // Красный для ошибки
  };

  const getDisplayText = () => {
    if (hexColor.length !== 7) {
      return 'Введите HEX цвет';
    }
    return colorResult.isValid ? colorResult.rgb : 'Ошибка!';
  };

  const getTextColor = () => {
    if (hexColor.length !== 7) {
      return '#000000'; // Черный для подсказки
    }
    
    if (!colorResult.isValid) {
      return '#ffffff'; // Белый для сообщения об ошибке
    }
    
    // Для валидных цветов определяем контрастный цвет автоматически
    return getContrastColor(hexColor);
  };

  return (
    <div className="color-container">
      <div className="color-converter">
        <input
          type="text"
          value={hexColor}
          onChange={handleHexChange}
          placeholder="#000000"
          className="color-input"
          maxLength={7}
        />
        <div 
          className="color-box"
          style={{ 
            backgroundColor: getDisplayColor(),
            color: getTextColor()
          }}
        >
          {getDisplayText()}
        </div>
      </div>
    </div>
  );
};

export default ColorConverter;