

export const countriesMap = {
	france: {
		name: 'France',
		description:
			'For diversity and range, no other wine-producing country is the equal of France. Our lots are taken from all of the most fabled wine regions of France, and there’s a bonus as well for lovers of great spirits.',
		regions: [
			{
				id: 'burgundy',
				name: 'Burgundy',
				description:
					'This is paradise on earth for Chardonnay and Pinot Noir, with terroirs which have been studied and cultivated for nearly 2,000 years. Our lots include bottles from some of the region’s most celebrated small producers.',
			},
			{
				id: 'bordeaux',
				name: 'Bordeaux',
				description:
					'The blended reds of Bordeaux – known in Britain as claret – are among the most celebrated wines anywhere. We have some of the most famous names, as well as the most famous white produced in the region.',
			},
			{
				id: 'champagne',
				name: 'Champagne',
				description:
					'Terroir, history and 300 years of expertise have coalesced to produce the world’s greatest region for sparkling wine. Our lots are not everyday fizz. They are the best of the best - and in some cases impossible to buy elsewhere.',
			},
			{
				id: 'rhone',
				name: 'Rhône',
				description:
					"The Rhône is France's (and the world's) finest region for Syrah, often blended with Grenache and Mourvèdre, and for the white variety Viognier. We have two producers here, both of exceptional quality.",
			},
			{
				id: 'cognac',
				name: 'Cognac',
				description:
					'From relatively humble grape varieties, Cognac crafts the greatest brandies on earth – and some of the finest spirits of any type. The secret lies in distilling expertise and in a deep understanding of the ageing process.',
			},
			{
				id: 'paris',
				name: 'Paris',
				description:
					'The city that invented fine dining showcases a venue of ultimate luxury, and with wines that do it full justice.',
				experience: true,
			},
		],
	},
	italy: {
		name: 'Italy',
		description:
			'Italy is the world’s largest wine producer, but its very greatest bottles are produced in relatively small quantities. In addition to featuring some of the country’s greatest names, these lots include some exceedingly rare large formats.',
		regions: [
			{
				id: 'piemonte',
				name: 'Piemonte',
				description:
					'This north-western corner of Italy produces some of the world’s most sought-after wines, made primarily from Nebbiolo, Barbera, and Dolcetto. The selection here showcases some of the region’s very greatest producers.',
			},
			{
				id: 'tuscany',
				name: 'Tuscany',
				description:
					'Tuscany may be famous for Chianti, but some of its most celebrated bottles come from other DOC’s. And some of the greatest innovations in Italian wine have taken place here – as our lots attest.',
			},
		],
	},
	germany: {
		name: 'Germany',
		description:
			'Germany is the place where Riesling’s uniquely aromatic qualities are most fully expressed in all their glorious diversity. Our two producers here are among the finest in the country.',
		regions: [
			{
				id: 'mosel',
				name: 'Mosel-Saar-Ruwer',
				description:
					'This steeply sloped river valley contains vineyards that create ideal growing conditions for Riesling. Even dry Kabinett wines can be outstanding, but the region shines in its sweet iterations of Riesling.',
			},
			{
				id: 'rheingau',
				name: 'Rheingau',
				description:
					'The Rheingau has made wine since Roman times. While it accounts for a small percentage of Germany’s production, it is home to a number of good wineries. Our Rheingau lot comes from the greatest of them all.',
			},
		],
	},
	portugal: {
		name: 'Portugal',
		description:
			'Portuguese wine-making is so old it pre-dates the Romans. Today the country’s wine styles are varied, owing to diverse climatic and geographical conditions, but one region dominates the perception of the country among wine lovers.',
		regions: [
			{
				id: 'douro',
				name: 'Douro Valley',
				description:
					'The Douro valley was the first region to get an official demarcation as a wine producing region, long before Bordeaux. Port is its most famous product, but its table wines can be just as serious and covetable.',
			},
			{
				id: 'taylors',
				name: 'Taylor’s Port',
				description:
					'Taylor port description',
					experience: true
			},
		],
	},
	spain: {
		name: 'Spain',
		description:
			'Third largest producer in the world, Spain turns out a tremendous variety of wine styles. For many people, however, the country is defined above all by its finest reds, many of them capable of ageing for decades.',
		regions: [
			{
				id: 'rioja',
				name: 'Rioja',
				description:
					'The first region to get a DOC, Spain’s highest rating for quality, RIoja is divided into three areas, of which the finest are Rioja Alavesa and Rioja Alta. We have an example from both.',
			},
		],
	},
	england: {
		name: 'England',
		description:
			'England’s entry into the field of fine wine is no flash in the pan. Sparkling wine is particularly well suited to southern England, which now performs well against its more famous counterpart across the Channel.',
		regions: [
			{
				id: 'kent',
				name: 'Kent',
				description:
					'With its climate similar to that of Champagne, it is no surprise that the Garden of England has tremendous potential as a source of world-class sparklers. We are offering one of the best.',
			},
			{
				id: 'london',
				name: 'London',
				description:
					'The centre of the international wine trade, and one of the world’s destination coming cities, London will be the scene for a unique and dazzling evening of food and wine.',
				experience: true,
			},
		],
	},
	chile: {
		name: 'Chile',
		description:
			'Chilean wine-making goes back to the 16th century and European grape varieties were introduced in the 19th. But its emergence as a producer of fine wine dates back to the 1980s – and continues apace today.',
		regions: [
			/*{
				id: 'aconcagua-valley',
				name: 'Aconcagua Valley',
				description:
					'Irrigated with melting snow water from the Andes to the east, the western areas of the Aconcagua are one of Chile’s prime areas for red wines of world-class distinction. The cooler western valley is better for whites.',
			},*/
			{
				id: 'cachapoal',
				name: 'Cachapoal Valley',
				description:
					'The Cachapoal Valley, part of the larger Rapel Valley region, has a vast number of microclimates. It makes outstanding wines both red and white, but in general it is red that dominates here and offers the most promise.',
			},
			{
				id: 'maipo',
				name: 'Maipo Valley',
				description:
					'The long-established Maipo is extensive and varied, with vineyards ranging from the foothills of the Andes to the Pacific coast. Maipo is best known for its reds, with Cabernet Sauvignon performing particularly well.',
			},
			{
				id: 'colchagua',
				name: 'Colchagua Valley',
				description:
					'Part of the southern end of the Rapel valley, Colchagua has been growing vines for over 150 years. Reds have always been the emphasis, and westerly microclimates are much cooler than those in the east.',
			},
		],
	},
	argentina: {
		name: 'Argentina',
		description:
			'Wine has been made here since the 16th century, but the explosion in quality is much more recent. Today, according to Tim Atkin MW, “Argentina is producing the most exciting wines in its history“.',
		regions: [
			{
				id: 'mendoza',
				name: 'Mendoza',
				description:
					'Mendoza is the country’s largest wine area, and a rich variety of sub-regions – including some extreme high-altitude sites – makes it one of the most promising in South America.',
			},
		],
	},
	australia: {
		name: 'Australia',
		description:
			'Fine wine has been made in Australia since the 19th century, but in recent decades standards have risen even further. Today the country is a world leader in quality, as well as quantity.',
		regions: [
			{
				id: 'victoria',
				name: 'Victoria',
				description:
					'Victoria has been a major viticultural centre since the 19th century and today has more producers than any other growing state. Producers based here may use fruit from other states in making their wines.',
			},
			{
				id: 'tasmania',
				name: 'Tasmania',
				description:
					'Tasmania has a long history of brewing and distilling, activities – on both large and small scales – made easier by the island’s pure water. Today there are over 50 distilleries, some of them producing world-class spirits.',
			},
		],
	},
	south_africa: {
		name: 'South Africa',
		description:
			'South African wine was first made in the 17th century. After remarkable improvements beginning in the 1990s, the country now has some of the greatest producers outside Europe.',
		regions: [
			{
				id: 'western-cape',
				name: 'Western Cape',
				description:
					'The Western Cape is the heart of South Africa’s wine industry, and home to its greatest producers. Many of them are represented in our auction lots.',
			},
		],
	},
	usa: {
		name: 'USA',
		description:
			'Wine is made all over the USA. But California accounts for 90 per cent of production and for many of the most sought-after names, both within the USA and internationally. ',
		regions: [
			{
				id: 'napa',
				name: 'Napa',
				description:
					'Napa Valley has the highest concentration of high-prestige producers anywhere in California. Its potential for making world-class Bordeaux-type blends has been recognised and exploited for 60 years or more',
			},
			{
				id: 'santa-cruz',
				name: 'Santa Cruz',
				description:
					'The Santa Cruz AVA covers three counties and includes an extraordinary variety of microclimates owing to the area’s mountainous terrain and maritime influences from the nearby Pacific coast.',
			},
		],
	},
	scotland: {
		name: 'Scotland',
		description:
			'Scotch whisky is one of the world’s iconic spirits, long valued all over the world for its variety and quality – especially in single malts. We have three of the best and rarest on offer here.',
		regions: [
			{
				id: 'highland',
				name: 'Highland',
				description:
					'Scotland’s largest whisky region by far, the Highlands create a remarkably diverse variety of styles and characters. Use of peat is generally fairly restrained and the stylistic range offers “something for everyone.”',
			},
			{
				id: 'speyside',
				name: 'Speyside',
				description:
					'Speyside is densely populated with distilleries, many of them in close proximity to the River Spey. Speyside whiskies tend to be relatively medium in peat, which accentuates their sweet, fruity, spicy character.',
			},
		],
	},
	singapore: {
		name: 'Singapore',
		description: 'Famed as one of the food-lover’s capitals of the world, Singapore is home to a wine merchant and a three-star restaurant offering an unforgettable evening. ',
		regions: [
			{
				id: 'singapore',
				name: 'Singapore',
				description:
					'Famed as one of the food-lover’s capitals of the world, Singapore is home to a wine merchant and a three-star restaurant offering an unforgettable evening. ',
				experience: true,
			},
		],
	},
};

export const groups = {
	important: [
		{
			name: 'Rolls-Royce',
			image: '/images/groups/important/Rolls-Royce.jpg'
		},
		{
			name: 'Macallan',
			image: '/images/groups/important/Macallan.jpg'
		}
	],
	high: [
		{
			name: 'SGC SP Charity',
			image: '/images/groups/high/SGC_SP_Charity.jpg'
		},
		{
			name: 'Octavian Golden Vines Awards',
			image: '/images/groups/high/Octavian_Golden_Vines_Awards.jpg'
		},
		{
			name: 'Anzeige SchlossJohannisberg Goldlack',
			image: '/images/groups/high/Anzeige-SchlossJohannisberg-Goldlack.jpg'
		}
	],
	medium: [
		{
			name: 'Baron Wines',
			image: '/images/groups/medium/Baron_Wines.jpg'
		},
		{
			name: 'Gucci',
			image: '/images/groups/medium/Gucci.jpg'
		},
		{
			name: 'VistaJet',
			image: '/images/groups/medium/VistaJet.jpg'
		},
		{
			name: 'Fieldfisher',
			image: '/images/groups/medium/Fieldfisher.jpg'
		},
		{
			name: 'Justerini & Brooks',
			image: '/images/groups/medium/Justerini&Brooks.jpg'
		},
		{
			name: 'Lay & Wheeler',
			image: '/images/groups/medium/Lay&Wheeler.jpg'
		},
		{
			name: 'Verny Paris',
			image: '/images/groups/medium/Verny_Paris.jpg'
		},
		{
			name: 'FourCorners',
			image: '/images/groups/medium/FourCorners.jpg'
		},
		{
			name: 'Taylor\'s',
			image: '/images/groups/medium/Taylors.jpg'
		},
		{
			name: 'WineBourse',
			image: '/images/groups/medium/WineBourse.jpg'
		},
		{
			name: 'Oeno',
			image: '/images/groups/medium/Oeno.jpg'
		},
	],
	low: [
		{
			name: 'CorneyBarrow.jpg',
			image: '/images/groups/low/CorneyBarrow.jpg'
		},
		{
			name: 'Grant_MacDonald',
			image: '/images/groups/low/Grant_MacDonald.jpg'
		},
		{
			name: 'San Pelligrino',
			image: '/images/groups/low/San_Pelligrino.jpg'
		},
		{
			name: 'The Connaught',
			image: '/images/groups/low/The_Connaught.jpg'
		},
		{
			name: 'Tonnellerie Cavin',
			image: '/images/groups/low/TonnellerieCavin.jpg'
		},
		{
			name: 'Virgin Atlantic Wine',
			image: '/images/groups/low/VA_Wine.jpg'
		},
	]
}