const router = require('express').Router();
const { Quiz } = require('../../../models');

//get all quizzes
router.get('/', async (req, res) => {
  try {
      const quiz = await Quiz.findAll();

      res.status(200).json(quiz);
  } catch (err) {
      res.status(500).json(err);
  }
});

//post quiz
router.post('/', async (req, res) => {
    try {
      const newQuiz = await Quiz.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      console.log(newQuiz)
      res.status(200).json(newQuiz);
    } catch (err) {
      console.log(err)
      console.log(req.session.user_id)
      res.status(400).json(err);
    }
});

//update quiz
router.put('/:id', async (req, res) => {
    try {
        const updateQuiz = await Quiz.update(
          {
            quiz_name: req.body.quiz_name
          },
          {
            where: {
              id: req.params.id
            }
          }  
        );
    
        res.status(200).json(updateQuiz);
      } catch (err) {
        res.status(400).json(err);
      }
});

//delete quiz
router.delete('/:id', async (req, res) => {
    try {
      const quizData = await Quiz.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!quizData) {
        res.status(404).json({ message: 'No Quiz found with this id!' });
        return;
      }
  
      res.status(200).json(quizData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;