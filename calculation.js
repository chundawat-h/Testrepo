function generateMatrixInputs() {
    let rows = document.getElementById('rows').value;
    let columns = document.getElementById('columns').value;
    let matrixInputs = document.getElementById('matrixInputs');

    matrixInputs.innerHTML = '';
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.id = `matrix-${i}-${j}`;
            input.placeholder = `Element [${i + 1},${j + 1}]`;
            matrixInputs.appendChild(input);
        }
        matrixInputs.appendChild(document.createElement('br'));
    }

    document.querySelector('button[onclick="generateMatrixInputs()"]').style.display = 'none';
    document.querySelector('button[onclick="calculateLDU()"]').style.display = 'block';
}

function getMatrixFromInputs(rows, columns) {
    let matrix = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push(parseFloat(document.getElementById(`matrix-${i}-${j}`).value));
        }
        matrix.push(row);
    }
    return matrix;
}

function formatMatrix(matrix) {
    return matrix.map(row => row.join(' ')).join('\n');
}

function lduFactorization(matrix) {
    const n = matrix.length;
    let L = Array.from({ length: n }, (_, i) => Array(n).fill(0));
    let D = Array(n).fill(0);
    let U = Array.from({ length: n }, (_, i) => Array(n).fill(0));
    let steps = [];

    for (let i = 0; i < n; i++) {
        D[i] = matrix[i][i];
        steps.push(`Step ${i + 1}: Calculate D[${i}] = ${matrix[i][i]}`);
        for (let j = 0; j <= i; j++) {
            L[i][j] = matrix[i][j] / D[j];
            steps.push(`L[${i}][${j}] = ${matrix[i][j]} / ${D[j]} = ${L[i][j]}`);
        }
        for (let j = i; j < n; j++) {
            U[i][j] = matrix[i][j];
            steps.push(`U[${i}][${j}] = ${matrix[i][j]}`);
        }
        steps.push(`L Matrix:\n${formatMatrix(L)}`);
        steps.push(`D Vector:\n${D.join(' ')}`);
        steps.push(`U Matrix:\n${formatMatrix(U)}`);
    }

    return { L, D, U, steps };
}

function calculateLDU() {
    let rows = parseInt(document.getElementById('rows').value);
    let columns = parseInt(document.getElementById('columns').value);
    let matrix = getMatrixFromInputs(rows, columns);

    let { L, D, U, steps } = lduFactorization(matrix);

    let result = `L:\n${formatMatrix(L)}\n\nD:\n${D.join(' ')}\n\nU:\n${formatMatrix(U)}`;
    document.getElementById('result').innerText = result;

    let stepsOutput = steps.join('\n\n');
    document.getElementById('steps').innerText = stepsOutput;
}
