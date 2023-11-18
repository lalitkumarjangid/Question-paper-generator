const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Sample Question Store
const questionStore = [
  {
    question: "What is the capital of France?",
    subject: "Geography",
    topic: "Countries",
    difficulty: "Easy",
    marks: 5,
  },
  {
    question: "Who wrote Romeo and Juliet?",
    subject: "Literature",
    topic: "Shakespeare",
    difficulty: "Medium",
    marks: 10,
  },
  {
    question: "Solve x^2 - 4 = 0",
    subject: "Math",
    topic: "Algebra",
    difficulty: "Hard",
    marks: 15,
  },
  {
    question: "What is the largest planet in our solar system?",
    subject: "Astronomy",
    topic: "Planets",
    difficulty: "Medium",
    marks: 8,
  },
  {
    question: "In which year did World War II end?",
    subject: "History",
    topic: "World War II",
    difficulty: "Easy",
    marks: 4,
  },
  {
    question: "Differentiate y = 3x^2 + 2x with respect to x.",
    subject: "Math",
    topic: "Calculus",
    difficulty: "Hard",
    marks: 12,
  },
  {
    question: "Who is the author of 'To Kill a Mockingbird'?",
    subject: "Literature",
    topic: "American Literature",
    difficulty: "Medium",
    marks: 10,
  },
  {
    question: "Which element has the chemical symbol 'Na'?",
    subject: "Chemistry",
    topic: "Elements",
    difficulty: "Easy",
    marks: 5,
  },
  // Add more questions as needed
];

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(bodyParser.json());

// Endpoint to generate a question paper
app.post("/generate-paper", (req, res) => {
  console.log("Request received:", req.body);

  try {
    const { totalMarks, difficultyDistribution } = req.body;
    const paper = generateQuestionPaper(
      questionStore,
      totalMarks,
      difficultyDistribution
    );
    console.log("Generated Paper:", paper);
    res.json({ success: true, paper });
  } catch (error) {
    console.error("Error generating paper:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

// Function to generate a question paper
function generateQuestionPaper(questions, totalMarks, difficultyDistribution) {
  const easyCount = Math.floor(
    (totalMarks * difficultyDistribution.Easy) / 100
  );
  const mediumCount = Math.floor(
    (totalMarks * difficultyDistribution.Medium) / 100
  );
  const hardCount = Math.floor(
    (totalMarks * difficultyDistribution.Hard) / 100
  );

  const easyQuestions = getRandomQuestions(questions, "Easy", easyCount);
  const mediumQuestions = getRandomQuestions(questions, "Medium", mediumCount);
  const hardQuestions = getRandomQuestions(questions, "Hard", hardCount);

  return easyQuestions.concat(mediumQuestions, hardQuestions);
}

// Helper function to get random questions
function getRandomQuestions(questions, difficulty, count) {
  const filteredQuestions = questions.filter(
    (q) => q.difficulty === difficulty
  );

  // Shuffle the filtered questions array
  const shuffledQuestions = shuffleArray(filteredQuestions);

  // Return the specified number of random questions
  return shuffledQuestions.slice(0, count);
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
