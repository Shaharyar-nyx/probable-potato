import { countries, CountryData, Iso3Code  } from "./countries";



const countries_to_search = countries as unknown as CountryData[];

function isEqual(str1: string, str2: string) {
	return str1.toUpperCase() === str2.toUpperCase();
}

function findFlagUrlByPredicate(countries: CountryData[], predicate: (c: CountryData) => boolean) {
	const country = countries.find(predicate);

	return country ? country.flag : "";
}

export function findFlagUrlByCountryName(countryName: string) {
	return findFlagUrlByPredicate(
		countries_to_search,
		({ name, altSpellings }) =>
			(isEqual(name, countryName) || altSpellings?.some((altSpelling) => isEqual(altSpelling, countryName))) ??
			false
	);
}

export function findFlagUrlByNationality(nationality: string) {
	return findFlagUrlByPredicate(countries_to_search, ({ demonym }) => isEqual(demonym, nationality));
}

export function findFlagUrlByIso2Code(iso2Code: string) {
	return findFlagUrlByPredicate(countries_to_search, ({ iso2 }) => isEqual(iso2, iso2Code));
}

export function findFlagUrlByIso3Code(iso3Code: string) {
	return findFlagUrlByPredicate(countries_to_search, ({ iso3 }) => isEqual(iso3, iso3Code));
}

export function getMapFlagUrlByIso3Code() {
	return countries.reduce((acc, { iso3, flag }) => {
		acc[iso3] = flag;
		return acc;
	}, {} as Record<Iso3Code, string>);
}
