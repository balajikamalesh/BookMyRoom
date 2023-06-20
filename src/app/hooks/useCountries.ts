import countries from "world-countries";

const formattedCountries = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const useCountries = () => {
  const getAll = () => formattedCountries;
  console.log(formattedCountries);

  const getByValue = (value: string) => {
    return formattedCountries.find((item) => item.label == value);
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;