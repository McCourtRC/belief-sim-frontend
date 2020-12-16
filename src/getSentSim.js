import * as tf from '@tensorflow/tfjs';
// import { vectors } from '../public/data/wordvecs1000.json';

const endpoint = 'http://localhost:3000/data/wordvecs70000';

export const getSentVec = async (sent) => {
  const res = await fetch(endpoint);
  const { vectors } = await res.json();

  // Create sentence vector
  // Split sentence into words
  const words = sent.toLowerCase().split(' ');

  // Get the word vectors
  const wordVecs = [];
  words.forEach((w) => {
    wordVecs.push(vectors[w]);
  });

  // Convert to tensor to perform math
  const sentTens = tf.tensor(wordVecs);

  // Average the word component vectors
  const sentMean = tf.mean(sentTens, 0, false);
  return sentMean;
};

const getSentSim = (sent) => {};

export default getSentSim;
