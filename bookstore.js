

module.exports = function(services) {
	var ref = services.ref; 
	var console = services.console;


	function handleBookQuery (snapshot, query) {
		
		if(snapshot) {
			val = snapshot.val(); 
			var result = [];
			if(val) {
				for(var book in val) {
					if(val.hasOwnProperty(book) && query(val[book])) {
						var obj = val[book];
						obj.id = book;
						result.push(obj);
					}
				} 
			}
			return result; 
		}
		return []; 
	}


	return {
		addOrUpdate: function(book, query, success) {
			var booksRef = ref.child('books'); 
			booksRef.on('value',
					(snapshot) => {
						var results = handleBookQuery(snapshot, query); 
						
					},
					(error) => console.log(error)); 
		},
		pushBook: function(book, success) {
			var booksRef = ref.child('books'); 
			var newBookRef = booksRef.push(); 
			newBookRef.set(book, success); 
		},
		findBook: function(query, callback, errorCallback) {
			var booksRef = ref.child('books'); 
			booksRef.on("value", 
						(snapshot) => callback(handleBookQuery(snapshot, query)), 
						(error) => errorCallback(error));
		},
		getAllTags: function(success, error) {
			var tagRef = ref.child('tags');
			tagRef.on('value',
					(snapshot) => success(snapshot.val()), 
					(err) => error(err));
		},
		updateBook: function(oldBook, newBook) {
			var booksRef = ref.child('books');
			var id = oldBook.id;
			var delta = {};

			delta[id] = newBook 
			booksRef.update(delta);
		},
		deleteBook: function(delMe) {
		
		}
	
	};
}; 
	    


