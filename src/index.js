document.addEventListener("DOMContentLoaded", function(e) {
    const BASE_URL = "http://localhost:3000/quotes/"
    const GET_URL = "http://localhost:3000/quotes?_embed=likes"
    const LIKE_URL ="http://localhost:3000/likes/"

    function getQuotes() {
        const ul = document.querySelector("#quote-list")
        ul.innerHTML = ""
        fetch(GET_URL)
        .then(res => res.json())
        .then(quotes => quotes.forEach(quote => renderQuote(quote, ul)))
    }

    function renderQuote(quote, ul) {
        const quoteLi = document.createElement("li")
        quoteLi.dataset.id = quote.id
        quoteLi.classList.add("quote-card")

        quoteLi.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
        <button class='btn-danger'>Delete</button>
        <button class='btn-warning'>Edit</button>
        </blockquote>
        <br>
        <br>
        `
        ul.append(quoteLi)
    }

    function submitHandler() {
        document.addEventListener("submit", function(event) {
            let submit = document.querySelector(`button[type="submit"]`)
            
            if (event.target === submit.parentElement) {
                event.preventDefault()
                const form = event.target
                const newQuote = form[0].value
                const newAuthor = form[1].value

                postQuote(form, newQuote, newAuthor)
            } else {
                event.preventDefault()
                const form = event.target
                
                
                updateQuote(form)
            }


        })
    }


    function postQuote(form, newQuote, newAuthor) {
        console.log(newQuote, newAuthor)

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                quote: newQuote,
                author: newAuthor,
            })
        }

        fetch(BASE_URL, options)
        .then(res => {
            form.reset()
            getQuotes()
        })

    }

    function deleteQuote(quoteCard) {
        const options = {
            method: "DELETE"
        }
        
        fetch(BASE_URL + quoteCard.dataset.id, options)
        .then(res => {
            getQuotes()
        })
    }

    function clickHandler() {
        document.addEventListener("click", function(event) {
            if (event.target.innerText === "Delete") {
                const delButton = event.target
                const quoteCard = delButton.closest("li")
                
                deleteQuote(quoteCard)

            } else if (event.target.matches(".btn-success")) {
                const likeButton = event.target
                const quoteCard = likeButton.closest("li")

                likeQuote(quoteCard)

            } else if(event.target.matches(".btn-warning")) {
                const editButton = event.target
                const quoteCard = editButton.closest("li")

                renderForm(quoteCard)
            }
        })
    }


    function likeQuote(quoteCard) {
        console.log(quoteCard.dataset.id)

        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                quoteId: parseInt(quoteCard.dataset.id),
                createdAt: Math.round((new Date()).getTime() / 1000)
            })
        }

        fetch(LIKE_URL, options)
        .then(res => {
            getQuotes()
        })
    }


    function renderForm(quoteCard) {
        const newForm = document.createElement("form")
        newForm.dataset.id = quoteCard.dataset.id
        const quote = quoteCard.querySelector("p").innerText
        const author = quoteCard.querySelector("footer").innerText
        

        newForm.innerHTML = `
        <label for="quote">Quote:</label><br>
        <input type="text" id="quote" name="quote" value="${quote}"><br>
        <label for="author">Last name:</label><br>
        <input type="text" id="author" name="author" value="${author}">
        <input type="submit" value="Submit">
        `
        quoteCard.append(newForm)
    }


    function updateQuote(form) {
        const updatedQuote = form.querySelector(`input[name="quote"]`).value
        const updatedAuthor = form.querySelector(`input[name="author"]`).value

        options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                quote: updatedQuote,
                author: updatedAuthor
            })
        }

        fetch(BASE_URL + form.dataset.id, options)
        .then( res => {
            form.reset()
            getQuotes()
        })


    }



clickHandler()
submitHandler()
getQuotes()
})