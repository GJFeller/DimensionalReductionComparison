"use strict";

var dimReducMethods = (typeof exports === "undefined")?(function dimReducMethods() {}):(exports);
if(typeof global !== "undefined") { global.dimReducMethods = dimReducMethods; }

dimReducMethods.PCA = function PCA(dataset) {

    var modifiedDataset = meanSubtractionProcess(dataset);

    console.log(dataset);
    console.log(modifiedDataset);

    var covMatrix = calculateCovarianceMatrix(modifiedDataset);
    var eigen = numeric.eig(covMatrix);

    console.log(eigen);
    var eigenvalues = eigen.lambda.x;
    var eigenvectors = numeric.transpose(eigen.E.x);
    console.log(eigenvectors);
    var vectorBase = numeric.transpose(getLargerEigenvectors(eigenvalues, eigenvectors, 2));
    console.log(vectorBase);

    var dataCoordinates = numeric.dot(modifiedDataset, vectorBase);
    console.log(dataCoordinates);
    return dataCoordinates;
    
}

function getLargerEigenvectors(eigenvalues, eigenvectorMatrix, d) {

    var largestEigenvalues = new Array(d);
    for(var i = 0; i < d; i++) {
        largestEigenvalues[i] = {'lambda': eigenvalues[i], 'idx': i};
    }
    largestEigenvalues.sort(function(a, b) {
          return b.lambda - a.lambda;
    });
    for(var i = d; i < eigenvalues.length; i++) {
        largestEigenvalues.push({'lambda': eigenvalues[i], 'idx': i});
        largestEigenvalues.sort(function(a, b) {
          return b.lambda - a.lambda;
        });
        largestEigenvalues.pop();
    }
    console.log(largestEigenvalues);
    var selectedEigenvectors = [];
    for(var i = 0; i < d; i++) {
        console.log(numeric.norm2(eigenvectorMatrix[largestEigenvalues[i].idx]));
        selectedEigenvectors.push(eigenvectorMatrix[largestEigenvalues[i].idx]);
    }
    return selectedEigenvectors;

}

function calculateCovariance(m, i, j, covDim) {
    var cov = 0;
    for(var k = 0; k < covDim; k++) {
        cov = cov + m[k][i] * m[k][j];
    }
    return cov / (covDim - 1);
}

function calculateCovarianceMatrix(matrix) {

    var rollCallCount = matrix[0].length;
    //var deputyCount = modifiedDataset.length;

    var covarianceMatrix = new Array(rollCallCount);
    for(var i = 0; i < rollCallCount; i++) {
        covarianceMatrix[i] = new Array(rollCallCount).fill(0); 
    }

    for(var i = 0; i < rollCallCount; i++) {
        for(var j = i; j < rollCallCount; j++) {
            covarianceMatrix[i][j] = calculateCovariance(matrix, i, j, rollCallCount);
        }
    }

    for(var i = 1; i < rollCallCount; i++) {
        for(var j = 0; j < i; j++) {
            covarianceMatrix[i][j] = covarianceMatrix[j][i];
        }
    }
    console.log(covarianceMatrix);

    return covarianceMatrix;

}

function meanSubtractionProcess(dataset) {
    var modifiedDataset = _.cloneDeep(dataset);
    var rollCallCount = modifiedDataset[0].length;
    var deputyCount = modifiedDataset.length;
    for(var j = 0; j < rollCallCount; j++) {
        var sum = 0;
        for(var i = 0; i < deputyCount; i++) {
            sum = sum + dataset[i][j];
        }
        var mean = sum / deputyCount;
        for(var i = 0; i < deputyCount; i++) {
            modifiedDataset[i][j] = modifiedDataset[i][j] - mean;
        }
    }
    return modifiedDataset;
}