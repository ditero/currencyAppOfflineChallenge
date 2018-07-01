
					 // initialization IndexedDb 
                     const idbAsync = idb.open('currencyConverter', 1, (updateOffline) => {
					    switch (updateOffline.oldVersion) {
					        case 0:
					            updateOffline.createObjectStore('countries', {
					                keyPath: 'currencyId'
					            });
					        case 1:
					            let countriesStore = updateOffline.transaction.objectStore('countries');
					            countriesStore.createIndex('country', 'currencyName');
					            countriesStore.createIndex('country-code', 'currencyId');
					        case 2:
					            updateOffline.createObjectStore('conversionRates', {
					                keyPath: 'query'
					            });
					            let ratesStore = updateOffline.transaction.objectStore('conversionRates');
					            ratesStore.createIndex('rates', 'query');
					    }
					});


					document.addEventListener('DOMContentLoaded', () => {
					    fetch('https://free.currencyconverterapi.com/api/v5/countries')
					        .then(res => res.json())
					        .then(res => {
					            Object.values(res.results).forEach(country => {
					                idbAsync.then(db => {
					                    const countries = db.transaction('countries', 'readwrite').objectStore('countries');
					                    countries.put(country);
					                })
					            });
					            idbAsync.then(db => {
					                const countries = db.transaction('countries', 'readwrite').objectStore('countries');
					                const countriesIndex = countries.index('country');
					                countriesIndex.getAll().then(currencies => {
					                })
					            })
					        }).catch(() => {
					            idbAsync.then(db => {
					                const countries = db.transaction('countries').objectStore('countries');
					                const countriesIndex = countries.index('country');
					                countriesIndex.getAll().then(currencies => {
					                })

					            });
					        });
					});