import ml5 from 'ml5';

export default async function () {
  const wordVectors = await ml5.word2vec('data/wordvecs-1000x300.json').ready;
  return wordVectors;
}
