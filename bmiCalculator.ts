interface Values {
    value1: number,
    value2: number
}

const parseArguments = (args: string[]): Values => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

export const calculator = (printText: string, a: number, b:number) => {
    const height = a;
    const weight = b;
    const bmi = (weight / ((height * height) / 10000));
    let result = '';
    if(bmi < 30 && bmi > 25)
        result = 'Overweight (Pre-obese)';
    else if (bmi < 25 && bmi > 18.5)
        result = 'Normal range';
    else if (bmi < 18.5 && bmi > 17)
        result = 'Underweight (Mild thinness)';
    else
        result = `Bmi is: ${bmi}`;
    console.log(printText, result);
    return `${printText} ${result}`;
};
try {
    const { value1, value2 } = parseArguments(process.argv);
    calculator(`Your category is:`, value1, value2);
} catch (error: unknown) {
    let errorMessage = 'Something broke';
    if (error instanceof Error) {
        errorMessage += ' Error ' + error.message;
    }
    console.log(errorMessage);
}
