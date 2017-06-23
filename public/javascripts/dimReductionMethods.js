"use strict";

var dimReducMethods = (typeof exports === "undefined")?(function dimReducMethods() {}):(exports);
if(typeof global !== "undefined") { global.dimReducMethods = dimReducMethods; }

dimReducMethods.PCA = function PCA(dataset) {

    var modifiedDataset = meanSubtractionProcess(dataset);

    //console.log(dataset);
    //console.log(modifiedDataset);

    var covMatrix = calculateCovarianceMatrix(modifiedDataset);


    
    var vectorBase = numeric.transpose(getLargerEigenvectors(covMatrix, 2));
    //console.log(vectorBase);

    var dataCoordinates = numeric.dot(modifiedDataset, vectorBase);
    //console.log(dataCoordinates);
    return dataCoordinates;
    
}

dimReducMethods.MDS = function MDS(dataset) {

    var distanceMatrix = calculateDistanceMatrix(dataset);
    var P = numeric.pow(distanceMatrix);

    var identityMatrix = numeric.identity(P.length);

    //var matrixOfOnes = numeric.rep([P.length, P.length], 1);
    //var dividedMatrix = numeric.div(matrixOfOnes, P.length);

    var J = numeric.sub(identityMatrix, numeric.div(numeric.rep([P.length, P.length], 1), P.length));
    //console.log(J);
    var B = numeric.div(numeric.dot(J, numeric.dot(P,J)),-2)
    //console.log(B);

    /*var t0 = performance.now();
    var vectorBase = numeric.transpose(getLargerEigenvectors(B, 2));
    var t1 = performance.now();
    console.log("Call to getLargerEigenvectors took " + millisToMinutesAndSeconds(t1 - t0));*/

    /*var dataCoordinates = numeric.dot(dataset, vectorBase);
    console.log(dataCoordinates);
    return dataCoordinates;*/
    //console.log(distanceMatrix);

}

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function euclideanDistance(v1, v2) {
    
        var sum = 0;
        for(var i = 0; i < v1.length; i++) {
            sum = sum + Math.pow(v1[i]-v2[i], 2);
        }
        return Math.sqrt(sum);
}

function calculateDistanceMatrix(matrix) {

    var rollCallCount = matrix.length;
    var distanceMatrix = new Array(rollCallCount);
    for(var i = 0; i < rollCallCount; i++) {
        distanceMatrix[i] = new Array(rollCallCount); 
    }
    
    for(var i = 0; i < distanceMatrix.length; i++){
        for(var j = 0; j < distanceMatrix[i].length; j++) {
            distanceMatrix[i][j] = 0;
            //console.log(distanceMatrix[i][j]);
        }
    }
    //console.log(distanceMatrix);
    for(var i = 0; i < matrix.length; i++) {
        for(var j = i+1; j < matrix.length; j++) {
            var v1 = matrix[i];
            var v2 = matrix[j];
            distanceMatrix[i][j] = euclideanDistance(v1, v2);
        }
    }

    for(var i = 1; i < rollCallCount; i++) {
        for(var j = 0; j < i; j++) {
            distanceMatrix[i][j] = distanceMatrix[j][i];
        }
    }

    //console.log(distanceMatrix);
    return distanceMatrix;
}

function getLargerEigenvectors(matrix, d) {

    console.log('Before eig');
    var eigen = numeric.eig(matrix);
    console.log('After eig');
    //console.log(eigen);
    var eigenvalues = eigen.lambda.x;
    var eigenvectors = numeric.transpose(eigen.E.x);
    //console.log(eigenvectors);

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
    //console.log(largestEigenvalues);
    var selectedEigenvectors = [];
    for(var i = 0; i < d; i++) {
        //console.log(numeric.norm2(eigenvectors[largestEigenvalues[i].idx]));
        selectedEigenvectors.push(eigenvectors[largestEigenvalues[i].idx]);
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
    //console.log(covarianceMatrix);
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
    //console.log(covarianceMatrix);

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