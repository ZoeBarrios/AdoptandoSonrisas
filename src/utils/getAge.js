import { TIME } from "./languajes";

const getAge = (birthdate, language) => {
  const today = new Date();
  const dob = new Date(birthdate);
  const diffTime = Math.abs(today - dob);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let age;

  if (diffDays >= 365) {
    const years = Math.floor(diffDays / 365);
    age = `${years} ${
      years === 1 ? TIME[language].YEAR : TIME[language].YEARS
    }`;
  } else if (diffDays >= 30) {
    const months = Math.floor(diffDays / 30);
    age = `${months} ${
      months === 1 ? TIME[language].MONTH : TIME[language].MONTHS
    }`;
  } else {
    age = `${diffDays} ${
      diffDays === 1 ? TIME[language].DAY : TIME[language].DAYS
    }`;
  }

  return age;
};

export default getAge;
