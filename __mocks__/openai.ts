const mOpenAI = {
  chat: {
    completions: {
      create: jest.fn(),
    },
  },
};

export default jest.fn().mockImplementation(() => mOpenAI);
