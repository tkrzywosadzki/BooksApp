{
    'use strict';

    const select = {
        templateOf: {
            book: '#template-book',
        },
        containerOf: {
            bookList: '.books-list',
            bookImage: '.book__image',
            filtersForm: '.filters',
        },
    };

    // const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML);
    // const booksList = document.querySelector(select.containerOf.bookList);
    // const form = document.querySelector(select.containerOf.filtersForm);


    // const favoriteBooks = [];
    // const filters = [];
    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    }

    class BooksList {
        constructor() {
            const thisBooksList = this;
            thisBooksList.favoriteBooks = [];
            thisBooksList.filters = [];

            thisBooksList.initData();
            thisBooksList.getElements();
            thisBooksList.render();
            thisBooksList.initActions();
        }

        initData() {
            this.data = dataSource.books;
        }

        getElements() {
            const thisBooksList = this;

            thisBooksList.dom = {};
            thisBooksList.dom.booksList = document.querySelector(select.containerOf.bookList);
            thisBooksList.dom.form = document.querySelector(select.containerOf.filtersForm);
        }

        render() {
            const thisBooksList = this;
            for(let book of thisBooksList.data){
                book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
                book.ratingWidth = book.rating * 10;
                const generatedHTML = templates.bookTemplate(book);
                const generatedDOM = utils.createDOMFromHTML(generatedHTML);
                thisBooksList.dom.booksList.appendChild(generatedDOM);

            }
        }

        initActions(){
            const thisBooksList = this;

            const bookImages = document.querySelectorAll(select.containerOf.bookImage);

            for(let bookImage of bookImages) {
                bookImage.addEventListener('dblclick', function(event){
                    event.preventDefault();
                    const bookId = bookImage.getAttribute('data-id');
                    if(!thisBooksList.favoriteBooks.includes(bookId)){
                        bookImage.classList.add('favorite');
                        thisBooksList.favoriteBooks.push(bookId);
                        //console.log('book added');
                    } else {
                        bookImage.classList.remove('favorite');
                        const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookId);
                        thisBooksList.favoriteBooks.splice(indexOfBook, 1);
                    }
                });
            }
            thisBooksList.dom.form.addEventListener('click', function(event){
                if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
                    console.log(event.target.value);
                }
                if(event.target.checked){
                    thisBooksList.filters.push(event.target.value);
                } else {
                    const indexOfFilter = thisBooksList.filters.indexOf(event.target.value);
                    thisBooksList.filters.splice(indexOfFilter, 1);
                }
                console.log(thisBooksList.filters);
                thisBooksList.filterBooks();
            });
        }

        filterBooks() {
            const thisBooksList = this;

            for(let book of thisBooksList.data){
                let shouldBeHidden = false;
                for(let filter of thisBooksList.filters){
                    if(!book.details[filter]){
                        shouldBeHidden = true;
                        break;
                    }
                }
                const filteredBook = thisBooksList.dom.booksList.querySelector('.book__image[data-id="' + book.id + '"]');
                if(shouldBeHidden){
                    filteredBook.classList.add('hidden');
                } else {
                    filteredBook.classList.remove('hidden');
                }
            }
        }

        determineRatingBgc(rating) {
            const thisBooksList = this;

            if(rating < 6){
                return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            } else if(rating > 6 && rating <=8){
                return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            } else if(rating > 8 && rating <=9){
                return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            } else if(rating > 9){
                return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
            }
        }
        

    }
    

    // function render() {
    //     for(let book of dataSource.books) {
    //         const ratingBgc = determineRatingBgc(book.rating);
    //         const ratingWidth = book.rating * 10;
    //         book.ratingBgc = ratingBgc;
    //         book.ratingWidth = ratingWidth;
    //         console.log(ratingWidth);
    //         const generatedHTML = bookTemplate(book);
    //         const generatedDOM = utils.createDOMFromHTML(generatedHTML)
    //         booksList.appendChild(generatedDOM);
            
    //     }
    // }

    // function initAction() {
    //     const bookImages = booksList.querySelectorAll(select.containerOf.bookImage);

    //     for(let bookImage of bookImages) {
    //         bookImage.addEventListener('dblclick', function (event){
    //             event.preventDefault();
    //             const bookId = bookImage.getAttribute('data-id');
    //             if(!favoriteBooks.includes(bookId)){
    //                 bookImage.classList.add('favorite');
    //                 favoriteBooks.push(bookId);
    //                 //console.log('book added');
    //             } else {
    //                 bookImage.classList.remove('favorite');
    //                 const indexOfBook = favoriteBooks.indexOf(bookId);
    //                 favoriteBooks.splice(indexOfBook, 1);
    //             }
    //         });
    //     }

    //     form.addEventListener('click', function(event){
    //         if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
    //             console.log(event.target.value);
    //         }
    //         if(event.target.checked){
    //             filters.push(event.target.value);
    //         } else {
    //             const indexOfFilter = filters.indexOf(event.target.value);
    //             filters.splice(indexOfFilter, 1);
    //         }
    //         console.log(filters);
    //         filterBooks();
    //     });
    // }

    // function filterBooks() {
    //     for(let book of dataSource.books){
    //         let shouldBeHidden = false;
    //         for(let filter of filters){
    //             if(!book.details[filter]){
    //                 shouldBeHidden = true;
    //                 break;
    //             }
    //         }
    //         const filteredBook = booksList.querySelector('.book__image[data-id="' + book.id + '"]');
    //         if(shouldBeHidden){
    //             filteredBook.classList.add('hidden');
    //         } else {
    //             filteredBook.classList.remove('hidden');
    //         }
    //     }
    // }

    // function determineRatingBgc(rating) {

    //     if(rating < 6){
    //         return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    //     } else if(rating > 6 && rating <=8){
    //         return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    //     } else if(rating > 8 && rating <=9){
    //         return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    //     } else if(rating > 9){
    //         return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    //     }

    // }



    // render();
    // initAction();

    const app = new BooksList();

    console.log(app);

}