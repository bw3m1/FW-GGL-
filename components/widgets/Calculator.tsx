import React, { useState } from 'react';
import './Widgets.css';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [lastWasOperator, setLastWasOperator] = useState(false);
  const [lastWasEquals, setLastWasEquals] = useState(false);

  const handleNumber = (num: string) => {
    if (lastWasEquals) {
      setDisplay(num);
      setEquation(num);
      setLastWasEquals(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
      setEquation(equation + num);
    }
    setLastWasOperator(false);
  };

  const handleOperator = (op: string) => {
    if (lastWasOperator) {
      setEquation(equation.slice(0, -1) + op);
    } else {
      setEquation(equation + op);
    }
    setLastWasOperator(true);
    setLastWasEquals(false);
  };

  const calculate = () => {
    if (lastWasOperator) return;

    try {
      const sanitized = equation.replace(/[^0-9+\-*/.() ]/g, '');
      const result = Function(`return ${sanitized}`)();
      const formatted =
        Number.isFinite(result)
          ? Number(result.toFixed(8)).toString()
          : 'Error';

      setDisplay(formatted);
      setEquation(formatted);
      setLastWasEquals(true);
    } catch {
      setDisplay('Error');
      setEquation('');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
    setLastWasOperator(false);
    setLastWasEquals(false);
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
