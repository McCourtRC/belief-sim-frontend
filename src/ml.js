import ml5 from 'ml5';

const colors = [
  {
    red: 0,
    green: 0,
    blue: 255,
    classification: 'blue-ish',
  },
  {
    red: 0,
    green: 0,
    blue: 254,
    classification: 'blue-ish',
  },
  {
    red: 0,
    green: 0,
    blue: 253,
    classification: 'blue-ish',
  },
  {
    red: 255,
    green: 0,
    blue: 0,
    classification: 'red-ish',
  },
  {
    red: 254,
    green: 0,
    blue: 0,
    classification: 'red-ish',
  },
  {
    red: 253,
    green: 0,
    blue: 0,
    classification: 'red-ish',
  },
  {
    red: 0,
    green: 253,
    blue: 0,
    classification: 'green-ish',
  },
  {
    red: 0,
    green: 254,
    blue: 0,
    classification: 'green-ish',
  },
  {
    red: 0,
    green: 255,
    blue: 0,
    classification: 'green-ish',
  },
];

const setup = () => {
  let options = {
    inputs: ['red', 'green', 'blue'],
    outputs: ['classification'],
    task: 'classification',
    debug: 'true',
  };

  const model = ml5.neuralNetwork(options);
  return model;
};

const add = (model) => {
  if (!colors) return;
  colors.forEach(({ classification, ...colors }) => {
    let inputs = { ...colors };
    let output = { classification };

    model.addData(inputs, output);
  });
};

const whileTraining = (epochs, loss) => {
  console.log('TRAINING...');
};

const runMl = () => {
  console.log('RUNNING');

  let completeTraining = false;

  // Step 1: set your neural network options
  const model = setup();

  // Step 2: initialize your neural network
  add(model);

  // Step 3: normalize data and train the model
  model.normalizeData();

  // Step 4: train the model
  model.train({ epochs: 150 }, whileTraining, () => {
    // Step 5: use the trained model
    // Step 6: make a classification
    const tester = { red: 50, green: 190, blue: 200 };
    model.classify(tester, (error, data) => {
      // Step 7: define a function to handle the results of your classification
      console.log('Results:', data);
    });
  });
};

export default runMl;
