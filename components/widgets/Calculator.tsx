import React, { useState } from 'react';
import './Widgets.css';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const safeEval = (expr: string): number => {
    // Remove any characters that aren't numbers, operators, or decimals
    const sanitized = expr.replace(/[^0-9+\-*/.() ]/g, '');
    // Use Function instead of eval for better security
    return new Function(`return ${sanitized}`)();
  };

  const handleNumber = (num: string) => {
    if (num === '.' && display.includes('.')) return;
    setDisplay(display === '0' && num !== '.' ? num : display + num);
    setEquation(equation + num);
  };

  const handleOperator = (op: string) => {
    setEquation(equation + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = safeEval(equation);
      const formattedResult =
        Number.isInteger(result) || equation.includes('.')
          ? result.toString()
          : result.toFixed(8).replace(/\.?0+$/, '');
      setDisplay(formattedResult);
      setEquation(formattedResult);
    } catch {
      setDisplay('Error');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  return (
    <div className="widget calculator">
      <div className="calc-display">{display}</div>
      <div className="calc-buttons">
        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button onClick={() => handleOperator('*')}>×</button>
        <button onClick={clear}>C</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button onClick={() => handleNumber('0')}>0</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => handleOperator('/')}>/</button>
      </div>
    </div>
  );
};

export default Calculator;
