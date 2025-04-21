const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let input = '';
let result = '';

const updateDisplay = () => {
  display.innerHTML = `
    <div class="operation">
      <p>${input}</p>
      <p>-----------</p>
      <p>${result !== '' ? result : ''}</p>
    </div>
  `;
};

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (value.toLowerCase() === 'c') {
      input = '';
      result = '';
      updateDisplay();
      return;
    }

    if (value.toLowerCase() === 'del') {
      input = input.slice(0, -1);
      updateDisplay();
      return;
    }

    if (value === '=') {
      try {
        const expression = input
          .replace(/x/g, '*') // replace 'x' with '*'
          .replace(/%/g, '%'); // leave modulus as is (optional)
          // console.log(expression);
        result = eval(expression);
      } catch {
        result = 'Error';
      }
      updateDisplay();
      return;
    }

    // Allow only numbers, operators, and dot
    if (/^[0-9+\-x*/%.]$/.test(value)) {
      input += value;
    }

    updateDisplay();
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  // Handle Clear (C or c)
  if (key.toLowerCase() === 'c') {
    input = '';
    result = '';
    updateDisplay();
    return;
  }

  // Handle Delete (Backspace)
  if (key === 'Backspace') {
    input = input.slice(0, -1);
    updateDisplay();
    return;
  }

  // Handle Enter or =
  if (key === 'Enter' || key === '=') {
    try {
      const expression = input
        .replace(/x/g, '*')
        .replace(/%/g, '%');
      result = eval(expression);
    } catch {
      result = 'Error';
    }
    updateDisplay();
    return;
  }

  // Allow numbers and operators
  if (/^[0-9+\-x*/%.]$/.test(key)) {
    input += key;
    updateDisplay();
  }
});

