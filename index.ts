import express from 'express';
import { calculator } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());
app.get('/home', (__req, res) => {
    res.send('Welcome');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    const bmi = calculator('Your category is', height, weight);
    const response = {
        weight: weight,
        height: height,
        bmi: bmi
    };
    if (!height || !weight) {
        res.status(400).send('Height or weight was not provided or they were not numbers!');
        throw new Error('malformatted parameters');
    }
    res.json(response);
});

app.get('/exercises', (__req, res) => {
    const data =
    {
        "daily_exercises": [1, 0, 2, 0, 3, 0, 2.5],
        "target": 2.5
      };
    res.json(data);
}
);

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !Array.isArray(daily_exercises) || typeof target !== 'number') {
        return res.status(400).json({ error: 'parameters missing' });
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const result = calculateExercises(target, daily_exercises);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while calculating exercises' });
    }
    return res.send('nopes');
});


const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});