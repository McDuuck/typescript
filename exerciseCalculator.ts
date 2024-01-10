interface Data {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface Exercises {
    day: number[],
    target: number
}

const exerciseArguments = (args: string[]): Exercises => {
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          target: Number(args[2]),
          day: args.slice(3).map(Number)
        };
    } else {
        throw new Error('Provided values were not numbers!');
      }
};

export const calculateExercises = (target: number, days: number[]) => {
    let trainingDays = 0;

    days.forEach(day => {
        if (day > 0) {
            trainingDays++;
        }
    });

    const sum = days.reduce((a, b) => a + b, 0);
    const avg = sum / days.length;
    const rating = Math.round(avg);
    const success = avg >= rating;

    const final = () => {
        if (avg < 1)
            return ('Did you even try?');
        if (avg >= 1 && avg < 2)
            return ('There was an attempt');
        if (avg >= 2 && avg < 3)
            return (`we're getting there`);
        if (avg >= 3)
            return ('WonnerWinner');
        return ('Invalid rating');
    };

    const data: Data = {
        periodLength: days.length,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: final(),
        target: target,
        average: avg
    };

    return data;
};
try {
    const { target, day } = exerciseArguments(process.argv);
    calculateExercises(target, day);
}   catch (error: unknown) {
    let errorMessage = 'Something broke';
    if (error instanceof Error) {
        errorMessage += ' Error ' + error.message;
    }
    console.log(errorMessage);
}
