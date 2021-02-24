const yswFilterData = {
	dropdown_data: [{
		name: 'Club Car',
		year_link: '/what-year-is-my-club-car-golf-cart/',
		years: ['1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000 (January-June)','2000 (July-December)','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
		models: [{
			name: 'DS',
			years: ['1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000 (January-June)','2000 (July-December)','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013']
		},{
			name: 'Precedent',
			years: ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019']
		}]
	},{
		name: 'EZGO',
		year_link: '/what-year-is-my-ez-go-golf-cart/',
		years: ['1950','1951','1952','1953','1954','1955','1956','1957','1958','1959','1960','1961','1962','1963','1964','1965','1966','1967','1968','1969','1970','1971','1972','1973','1974','1975','1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
		models: [{
			name: 'Marathon',
			years: ['1976','1977','1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993']
		},{
			name: 'Medalist',
			years: ['1994', '1995']
		},{
			name: 'TXT',
			years: ['1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019']
		},{
			name: 'RXV',
			years: ['2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019']
		}]
	},{
		name: 'Yamaha',
		year_link: '/what-year-is-my-yamaha-golf-cart/',
		years: ['1978','1979','1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019'],
		models: [{
			name: 'G1',
			years: ['1978','1979','1980','1981','1982','1983','1984','1985','1986']
		},{
			name: 'G2',
			years: ['1985','1986','1987','1988','1989','1990','1991']
		},{
			name: 'G3',
			years: ['1986','1987']
		},{
			name: 'G5',
			years: ['1990','1991','1992','1993','1994','1995']
		},{
			name: 'G8',
			years: ['1990','1991','1992','1993','1994','1995']
		},{
			name: 'G9',
			years: ['1991','1992','1993','1994','1995']
		},{
			name: 'G11',
			years: ['1993','1994','1995','1996','1997','1998','1999','2000']
		},{
			name: 'G14',
			years: ['1995','1996']
		},{
			name: 'G16',
			years: ['1996','1997','1998','1999','2000']
		},{
			name: 'G19',
			years: ['1996','1997','1998','1999','2000','2001','2002']
		},{
			name: 'G20',
			years: ['2000','2001','2002']
		},{
			name: 'G21',
			years: ['2001','2002','2003','2004']
		},{
			name: 'G22',
			years: ['2003','2004']
		},{
			name: 'Drive',
			years: ['2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017']
		},{
			name: 'Drive2',
			years: ['2017','2018','2019']
		}]
	}],
	redirects: [{ 
		option: 'Club Car',
		url: '/club-car/?list_all=year'
	},{ 
		option: 'Club Car_DS',
		url: '/club-car/?list_all=year'
	},{ 
		option: 'Club Car_Precedent',
		url: '/club-car/?list_all=year'
	},{
		option: 'EZGO',
		url: '/ezgo/?list_all=year'
	},{
		option: 'EZGO_Marathon',
		url: '/ezgo/?list_all=year'
	},{
		option: 'EZGO_Medalist',
		url: '/ezgo/?list_all=year'
	},{
		option: 'EZGO_TXT',
		url: '/ezgo/?list_all=year'
	},{
		option: 'EZGO_RXV',
		url: '/ezgo/?list_all=year'
	},{
		option: 'Yamaha',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G1',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G2',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G3',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G5',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G8',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G9',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G11',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G14',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G16',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G19',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G20',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G21',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_G22',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_Drive',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Yamaha_Drive2',
		url: '/yamaha/?list_all=year'
	},{
		option: 'Other',
		url: '/golf-cart-accessories/?list_all=year'
	},{
		option: 'Help',
		url: '/golf-cart-accessories/?list_all=year'
	}]
}
export { yswFilterData };
