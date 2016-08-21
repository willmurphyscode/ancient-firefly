function strCompare(strA, strB) {
    return strA.toLowerCase() === strB.toLowerCase();
            // TODO handle substrings, initials, etc.
}

function filter(query, book) {
    if(!book) {return false;} 
    if(!query) {return true;}

    var matches = [];

    if(query.tags) {
        var tagMatch = false; 
        for(var i = 0; i < query.tags.length; i++) {
               var match = book && book.tags && book.tags
               .map(t => t.toLowerCase())
               .some(t => t == query.tags[i].toLowerCase()); 
            if(match) { tagMatch = true; }
        }
        matches.push(tagMatch); 
    }

    if(query.author) {
        var authorMatch = strCompare(query.author, book.author);

        matches.push(authorMatch);  
    }

    if(query.title) {
        var titleMatch = strCompare(query.title, book.title);
        matches.push(titleMatch); 
    }


    if(query.startYear) {
        //TODO 

    }

    return matches.every(el => el); 
}

module.exports = {
    // return a function that filters a book that has 
    


    makeQuery : function(author, title, tags, startYear, endYear) {
        var query = {
            author : author, title: title, tags: tags, startYear: startYear, endYear: endYear
        };
        return function(book) {
            return filter(query, book); 
        }
    }
}