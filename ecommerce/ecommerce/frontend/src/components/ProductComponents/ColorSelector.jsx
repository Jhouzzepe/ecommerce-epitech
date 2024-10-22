import React from 'react';

// Dictionnaire pour mapper les hexacodes à des noms de couleurs
const colorMap = {
  '#304434': 'Vert Foncé',
  '#000000': 'Noir',
  '#FFFFFF': 'Blanc',
};

const ColorSelector = ({ selectedColor, onColorClick }) => {
  const colors = ['#304434', '#000000', '#FFFFFF'];

  return (
    <div>
      <label className="text-gray-700 text-sm">Couleur :</label>
      <div className="flex items-center mt-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorClick(color)}
            style={{ backgroundColor: color }}
            className={`w-6 h-6 rounded-full mr-2 focus:outline-none ${selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-500' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
