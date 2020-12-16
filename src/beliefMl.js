import ml5 from 'ml5';

const colors = [
  {
    sentence: 'I like turtles',
    belief: 'yes',
  },
  {
    sentence: 'I like turtles',
    belief: 'yes',
  },
  {
    sentence: 'I like turtles',
    belief: 'yes',
  },
  {
    sentence: 'I like turtles',
    belief: 'yes',
  },
  {
    sentence: 'I like turtles',
    belief: 'yes',
  },
  {
    sentence: 'I like turtles',
    belief: 'yes',
  },
  {
    sentence: 'Monkeys',
    belief: 'no',
  },
  {
    sentence: 'bananas!',
    belief: 'no',
  },
  {
    sentence: 'tomato sauce, huh?',
    belief: 'no',
  },
];

const setup = () => {
  let options = {
    inputs: ['sentence'],
    outputs: ['belief'],
    task: 'classification',
    debug: 'true',
  };

  const model = ml5.neuralNetwork(options);
  return model;
};

const add = (model) => {
  if (!colors) return;
  colors.forEach(({ belief, ...colors }) => {
    let inputs = { ...colors };
    let output = { belief };

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

  console.log('MODEL', model);

  // Step 2: initialize your neural network
  add(model);

  // Step 3: normalize data and train the model
  model.normalizeData();

  // Step 4: train the model
  model.train({ epochs: 150 }, whileTraining, () => {
    // Step 5: use the trained model
    // Step 6: make a classification
    const tester = { sentence: 'I like turtles' };
    //sentence Step 7: define a function to handle the results of your classification
    model.classify(tester, (error, data) => {
      console.log('Results:', data);
    });
  });
};

export default runMl;
