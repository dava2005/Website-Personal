document.addEventListener("DOMContentLoaded", function() {
    initializeMatrixInputs();
});

function initializeMatrixInputs() {
    const matrixA = document.getElementById("matrixA");
    const matrixB = document.getElementById("matrixB");
    
    for (let i = 0; i < 3; i++) {
        let rowA = matrixA.insertRow();
        let rowB = matrixB.insertRow();
        for (let j = 0; j < 3; j++) {
            let cellA = rowA.insertCell();
            let cellB = rowB.insertCell();
            cellA.innerHTML = `<input type="number" id="A${i}${j}" />`;
            cellB.innerHTML = `<input type="number" id="B${i}${j}" />`;
        }
    }
}

function getMatrixValues(matrixId) {
    let matrix = [];
    for (let i = 0; i < 3; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push(parseFloat(document.getElementById(`${matrixId}${i}${j}`).value) || 0);
        }
        matrix.push(row);
    }
    return matrix;
}

function displayResult(result) {
    const resultContent = document.getElementById("resultContent");
    if (Array.isArray(result)) {
        let html = "<table>";
        result.forEach(row => {
            html += "<tr>";
            row.forEach(value => {
                html += `<td>${value}</td>`;
            });
            html += "</tr>";
        });
        html += "</table>";
        resultContent.innerHTML = html;
    } else {
        resultContent.textContent = result;
    }
}

function addMatrices() {
    const A = getMatrixValues("A");
    const B = getMatrixValues("B");
    let result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
    displayResult(result);
}

function subtractMatrices() {
    const A = getMatrixValues("A");
    const B = getMatrixValues("B");
    let result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
    displayResult(result);
}

function multiplyMatrices() {
    const A = getMatrixValues("A");
    const B = getMatrixValues("B");
    let result = Array.from({ length: 3 }, () => Array(3).fill(0));
    
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    displayResult(result);
}

function determinantMatrix(matrixId) {
    const M = getMatrixValues(matrixId);
    let determinant = 
        M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) -
        M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) +
        M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
    displayResult(`Determinant: ${determinant}`);
}
