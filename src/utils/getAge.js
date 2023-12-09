const getAge = (birthdate) => {
  return new Date().getFullYear() - new Date(birthdate).getFullYear();
};

export default getAge;
