import { DateTime } from "luxon";

export default function(eleventyConfig) {
	eleventyConfig.addFilter("publicationGroups", publications => {
		const collator = new Intl.Collator("en", { sensitivity: "base" });
		const surname = paper => paper.firstAuthorLastName || paper.authors[0].trim().split(/\s+/).at(-1);
		const byAuthor = (a, b) => collator.compare(surname(a), surname(b))
			|| collator.compare(a.authors[0], b.authors[0])
			|| collator.compare(a.title, b.title);
		const preprints = publications.filter(paper => paper.conference === "Preprint")
			.sort((a, b) => b.year - a.year || byAuthor(a, b));
		const published = publications.filter(paper => paper.conference !== "Preprint");
		const years = [...new Set(published.map(paper => paper.year))].sort((a, b) => b - a);
		return [
			...(preprints.length ? [{ title: "Preprints", papers: preprints }] : []),
			...years.map(year => ({
				title: String(year),
				papers: published.filter(paper => paper.year === year).sort(byAuthor)
			}))
		];
	});

	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat('yyyy-LL-dd');
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if(!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if( n < 0 ) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", target => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
	});

};
